import { NextResponse } from "next/server";

// ===== أنواع البيانات =====
interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface SMCAnalysis {
  symbol: string;
  direction: "BUY" | "SELL" | "NEUTRAL";
  strength: "STRONG" | "MEDIUM" | "WEAK";
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3: number;
  rr: string;
  concepts: {
    orderBlock: OrderBlock | null;
    fairValueGap: FVG | null;
    marketStructure: string;
    liquidity: Liquidity | null;
    bos: boolean;
    choch: boolean;
    imbalance: boolean;
  };
  score: number;
  timestamp: string;
}

interface OrderBlock {
  type: "BULLISH" | "BEARISH";
  high: number;
  low: number;
  index: number;
  strength: number;
}

interface FVG {
  type: "BULLISH" | "BEARISH";
  top: number;
  bottom: number;
  size: number;
}

interface Liquidity {
  type: "BSL" | "SSL";
  level: number;
  swept: boolean;
}

// ===== جلب البيانات من Binance =====
const getCandles = async (
  symbol: string,
  interval: string,
  limit = 200
): Promise<Candle[]> => {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.map((c: any) => ({
    time: c[0],
    open: parseFloat(c[1]),
    high: parseFloat(c[2]),
    low: parseFloat(c[3]),
    close: parseFloat(c[4]),
    volume: parseFloat(c[5]),
  }));
};

// ===== 1. Market Structure =====
const analyzeMarketStructure = (candles: Candle[]) => {
  const highs = candles.map(c => c.high);
  const lows = candles.map(c => c.low);
  const len = candles.length;

  const hh = highs[len-1] > highs[len-10]; // Higher High
  const hl = lows[len-1] > lows[len-10];   // Higher Low
  const lh = highs[len-1] < highs[len-10]; // Lower High
  const ll = lows[len-1] < lows[len-10];   // Lower Low

  if (hh && hl) return "BULLISH";
  if (lh && ll) return "BEARISH";
  return "RANGING";
};

// ===== 2. Break of Structure (BOS) =====
const detectBOS = (candles: Candle[]): boolean => {
  const len = candles.length;
  const prevHigh = Math.max(...candles.slice(len-20, len-5).map(c => c.high));
  const prevLow = Math.min(...candles.slice(len-20, len-5).map(c => c.low));
  const lastClose = candles[len-1].close;

  return lastClose > prevHigh || lastClose < prevLow;
};

// ===== 3. Change of Character (CHoCH) =====
const detectCHoCH = (candles: Candle[]): boolean => {
  const len = candles.length;
  const recentHighs = candles.slice(len-10).map(c => c.high);
  const recentLows = candles.slice(len-10).map(c => c.low);

  const wasUptrend =
    recentHighs[5] > recentHighs[0] && recentLows[5] > recentLows[0];
  const nowDowntrend =
    recentHighs[9] < recentHighs[5] && recentLows[9] < recentLows[5];

  const wasDowntrend =
    recentHighs[5] < recentHighs[0] && recentLows[5] < recentLows[0];
  const nowUptrend =
    recentHighs[9] > recentHighs[5] && recentLows[9] > recentLows[5];

  return (wasUptrend && nowDowntrend) || (wasDowntrend && nowUptrend);
};

// ===== 4. Order Blocks =====
const findOrderBlocks = (candles: Candle[]): OrderBlock | null => {
  const len = candles.length;
  let strongestOB: OrderBlock | null = null;
  let maxStrength = 0;

  for (let i = len - 30; i < len - 5; i++) {
    const candle = candles[i];
    const nextCandles = candles.slice(i + 1, i + 6);

    // Bullish OB: شمعة هابطة قبل حركة صاعدة قوية
    const isBearishCandle = candle.close < candle.open;
    const strongBullishMove = nextCandles.some(
      c => c.close > candle.high * 1.002
    );

    if (isBearishCandle && strongBullishMove) {
      const strength = nextCandles.reduce(
        (acc, c) => acc + (c.close - c.open), 0
      );
      if (strength > maxStrength) {
        maxStrength = strength;
        strongestOB = {
          type: "BULLISH",
          high: candle.high,
          low: candle.low,
          index: i,
          strength,
        };
      }
    }

    // Bearish OB: شمعة صاعدة قبل حركة هابطة قوية
    const isBullishCandle = candle.close > candle.open;
    const strongBearishMove = nextCandles.some(
      c => c.close < candle.low * 0.998
    );

    if (isBullishCandle && strongBearishMove) {
      const strength = nextCandles.reduce(
        (acc, c) => acc + (c.open - c.close), 0
      );
      if (strength > maxStrength) {
        maxStrength = strength;
        strongestOB = {
          type: "BEARISH",
          high: candle.high,
          low: candle.low,
          index: i,
          strength,
        };
      }
    }
  }

  return strongestOB;
};

// ===== 5. Fair Value Gap (FVG) =====
const findFVG = (candles: Candle[]): FVG | null => {
  const len = candles.length;

  for (let i = len - 20; i < len - 2; i++) {
    const prev = candles[i];
    const curr = candles[i + 1];
    const next = candles[i + 2];

    // Bullish FVG
    if (next.low > prev.high) {
      return {
        type: "BULLISH",
        top: next.low,
        bottom: prev.high,
        size: next.low - prev.high,
      };
    }

    // Bearish FVG
    if (next.high < prev.low) {
      return {
        type: "BEARISH",
        top: prev.low,
        bottom: next.high,
        size: prev.low - next.high,
      };
    }
  }

  return null;
};

// ===== 6. Liquidity Sweep =====
const detectLiquidity = (candles: Candle[]): Liquidity | null => {
  const len = candles.length;
  const lookback = candles.slice(len - 50, len - 5);

  // Buy Side Liquidity (BSL) - قمم سابقة
  const swingHighs = lookback
    .filter((_, i) =>
      i > 0 &&
      i < lookback.length - 1 &&
      lookback[i].high > lookback[i-1].high &&
      lookback[i].high > lookback[i+1].high
    )
    .map(c => c.high);

  // Sell Side Liquidity (SSL) - قيعان سابقة
  const swingLows = lookback
    .filter((_, i) =>
      i > 0 &&
      i < lookback.length - 1 &&
      lookback[i].low < lookback[i-1].low &&
      lookback[i].low < lookback[i+1].low
    )
    .map(c => c.low);

  const lastCandle = candles[len - 1];

  // اختراق BSL
  if (swingHighs.length > 0) {
    const nearestBSL = Math.min(...swingHighs);
    if (lastCandle.high > nearestBSL && lastCandle.close < nearestBSL) {
      return { type: "BSL", level: nearestBSL, swept: true };
    }
  }

  // اختراق SSL
  if (swingLows.length > 0) {
    const nearestSSL = Math.max(...swingLows);
    if (lastCandle.low < nearestSSL && lastCandle.close > nearestSSL) {
      return { type: "SSL", level: nearestSSL, swept: true };
    }
  }

  return null;
};

// ===== 7. Imbalance =====
const detectImbalance = (candles: Candle[]): boolean => {
  const len = candles.length;
  const lastThree = candles.slice(len - 3);
  const bodySize = Math.abs(lastThree[1].close - lastThree[1].open);
  const avgBody = candles.slice(len - 20)
    .reduce((acc, c) => acc + Math.abs(c.close - c.open), 0) / 20;

  return bodySize > avgBody * 2.5;
};

// ===== 8. ATR للـ SL/TP =====
const calculateATR = (candles: Candle[], period = 14): number => {
  const trs = candles.slice(-period).map(c => c.high - c.low);
  return trs.reduce((a, b) => a + b, 0) / period;
};

// ===== التحليل الكامل =====
const analyzeSMC = async (symbol: string): Promise<SMCAnalysis> => {
  // جلب تايم فريمات متعددة
  const [h4Candles, h1Candles, m15Candles] = await Promise.all([
    getCandles(symbol, "4h", 200),
    getCandles(symbol, "1h", 200),
    getCandles(symbol, "15m", 200),
  ]);

  const price = h1Candles[h1Candles.length - 1].close;
  const atr = calculateATR(h1Candles);

  // تحليل كل المفاهيم
  const marketStructure = analyzeMarketStructure(h4Candles);
  const bos = detectBOS(h1Candles);
  const choch = detectCHoCH(h1Candles);
  const orderBlock = findOrderBlocks(h1Candles);
  const fvg = findFVG(m15Candles);
  const liquidity = detectLiquidity(h4Candles);
  const imbalance = detectImbalance(h1Candles);

  // نظام النقاط
  let score = 0;
  let bullishPoints = 0;
  let bearishPoints = 0;

  if (marketStructure === "BULLISH") bullishPoints += 30;
  if (marketStructure === "BEARISH") bearishPoints += 30;
  if (bos) score += 20;
  if (choch) score += 25;
  if (orderBlock?.type === "BULLISH") bullishPoints += 20;
  if (orderBlock?.type === "BEARISH") bearishPoints += 20;
  if (fvg?.type === "BULLISH") bullishPoints += 15;
  if (fvg?.type === "BEARISH") bearishPoints += 15;
  if (liquidity?.type === "SSL") bullishPoints += 25;
  if (liquidity?.type === "BSL") bearishPoints += 25;
  if (imbalance) score += 10;

  // تحديد الاتجاه
  let direction: "BUY" | "SELL" | "NEUTRAL" = "NEUTRAL";
  let strength: "STRONG" | "MEDIUM" | "WEAK" = "WEAK";
  let totalScore = 0;

  if (bullishPoints > bearishPoints + 20) {
    direction = "BUY";
    totalScore = bullishPoints + score;
  } else if (bearishPoints > bullishPoints + 20) {
    direction = "SELL";
    totalScore = bearishPoints + score;
  }

  if (totalScore >= 80) strength = "STRONG";
  else if (totalScore >= 50) strength = "MEDIUM";
  else strength = "WEAK";

  // حساب SL/TP
  const sl = direction === "BUY"
    ? +(price - atr * 1.5).toFixed(4)
    : +(price + atr * 1.5).toFixed(4);

  const tp1 = direction === "BUY"
    ? +(price + atr * 1.5).toFixed(4)
    : +(price - atr * 1.5).toFixed(4);

  const tp2 = direction === "BUY"
    ? +(price + atr * 3).toFixed(4)
    : +(price - atr * 3).toFixed(4);

  const tp3 = direction === "BUY"
    ? +(price + atr * 5).toFixed(4)
    : +(price - atr * 5).toFixed(4);

  const riskReward = (Math.abs(tp2 - price) / Math.abs(price - sl)).toFixed(1);

  return {
    symbol,
    direction,
    strength,
    entry: price,
    sl,
    tp1,
    tp2,
    tp3,
    rr: `1:${riskReward}`,
    concepts: {
      orderBlock,
      fairValueGap: fvg,
      marketStructure,
      liquidity,
      bos,
      choch,
      imbalance,
    },
    score: totalScore,
    timestamp: new Date().toISOString(),
  };
};

// ===== API Route =====
const PAIRS = [
  "BTCUSDT", "ETHUSDT", "BNBUSDT",
  "SOLUSDT", "XRPUSDT", "ADAUSDT",
  "DOGEUSDT", "AVAXUSDT"
];

export async function GET() {
  try {
    const analyses = await Promise.all(
      PAIRS.map(symbol => analyzeSMC(symbol))
    );

    const signals = analyses
      .filter(a => a.direction !== "NEUTRAL" && a.strength !== "WEAK")
      .sort((a, b) => b.score - a.score);

    return NextResponse.json({
      success: true,
      signals,
      total: signals.length,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
