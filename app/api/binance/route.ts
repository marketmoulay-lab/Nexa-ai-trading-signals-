  const hh = Math.max(...sl.map((c) => c.h));
  const ll = Math.min(...sl.map((c) => c.l));
  return ((hh - candles[candles.length - 1].c) / (hh - ll)) * -100;
};

// Ichimoku Cloud
const calcIchimoku = (candles: Candle[]): IchimokuResult => {
  const n = candles.length;
  const midpoint = (p: number) => {
    const sl = candles.slice(n - p);
    return (
      (Math.max(...sl.map((c) => c.h)) +
        Math.min(...sl.map((c) => c.l))) / 2
    );
  };
  const kijun = midpoint(26);
  const price = candles[n - 1].c;
  const aboveCloud = price > Math.max(tenkan, kijun);
  const belowCloud = price < Math.min(tenkan, kijun);
  return {
    tenkan, kijun, aboveCloud, belowCloud,
    bias: aboveCloud ? "BULLISH" : belowCloud ? "BEARISH" : "NEUTRAL",
  };
};

// ═══════════════════════════════════════════════════════
//  SMC DETECTION
// ═══════════════════════════════════════════════════════

const findSwings = (
  candles: Candle[], lb = 5
): { highs: SwingPoint[]; lows: SwingPoint[] } => {
  const highs: SwingPoint[] = [];
  const lows: SwingPoint[] = [];
  for (let i = lb; i < candles.length - lb; i++) {
    const win = candles.slice(i - lb, i + lb + 1);
    if (candles[i].h === Math.max(...win.map((c) => c.h)))
      highs.push({ i, p: candles[i].h });
    if (candles[i].l === Math.min(...win.map((c) => c.l)))
      lows.push({ i, p: candles[i].l });
  }
  return { highs: highs.slice(-6), lows: lows.slice(-6) };
};

const msAnalysis = (candles: Candle[]): MSResult => {
  const { highs, lows } = findSwings(candles);
  if (highs.length < 2 || lows.length < 2)
    return { trend: "RANGING", bias: 0 };
  const hDiff = highs[highs.length - 1].p - highs[highs.length - 2].p;
  const lDiff = lows[lows.length - 1].p - lows[lows.length - 2].p;
  if (hDiff > 0 && lDiff > 0) return { trend: "BULLISH", bias: hDiff + lDiff };
  if (hDiff < 0 && lDiff < 0) return { trend: "BEARISH", bias: hDiff + lDiff };
  return { trend: "RANGING", bias: 0 };
};

const detectBOS = (candles: Candle[]) => {
  const { highs, lows } = findSwings(candles.slice(0, -2));
  const last = candles[candles.length - 1];
  if (highs.length && last.c > highs[highs.length - 1].p)
    return { type: "BULLISH", level: highs[highs.length - 1].p, idx: highs[highs.length - 1].i };
  if (lows.length && last.c < lows[lows.length - 1].p)
    return { type: "BEARISH", level: lows[lows.length - 1].p, idx: lows[lows.length - 1].i };
  return null;
};

const detectCHoCH = (candles: Candle[]): string | null => {
  const half = Math.floor(candles.length / 2);
  const t1 = msAnalysis(candles.slice(0, half)).trend;
  const t2 = msAnalysis(candles.slice(half)).trend;
  if (t1 === "BULLISH" && t2 === "BEARISH") return "BEARISH";
  if (t1 === "BEARISH" && t2 === "BULLISH") return "BULLISH";
  return null;
};

const findOBs = (candles: Candle[]): OrderBlock[] => {
  const n = candles.length;
  const obs: OrderBlock[] = [];
  const avgBody =
    candles.slice(-30).reduce(
      (a, c) => a + Math.abs(c.c - c.o), 0
    ) / 30;

  for (let i = n - 50; i < n - 5; i++) {
    const c = candles[i];
    const after = candles.slice(i + 1, i + 8);
    const bullMove = after.reduce(
      (a, x) => a + Math.max(x.c - x.o, 0), 0
    );
    const bearMove = after.reduce(
      (a, x) => a + Math.max(x.o - x.c, 0), 0
    );

    if (c.c < c.o && bullMove > avgBody * 2) {
      const mitigated = candles
        .slice(i + 1)
        .some((x) => x.l <= c.h && x.h >= c.l);
      obs.push({
        type: "BULLISH", h: c.h, l: c.l,
        mid: (c.h + c.l) / 2,
        strength: bullMove / avgBody,
        mitigated, vol: c.v,
      });
    }
    if (c.c > c.o && bearMove > avgBody * 2) {
      const mitigated = candles
        .slice(i + 1)
        .some((x) => x.l <= c.h && x.h >= c.l);
      obs.push({
        type: "BEARISH", h: c.h, l: c.l,
        mid: (c.h + c.l) / 2,
        strength: bearMove / avgBody,
        mitigated, vol: c.v,
      });
    }
  }
  return obs
    .filter((o) => !o.mitigated)
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 4);
};

const findFVGs = (candles: Candle[]): FVG[] => {
  const fvgs: FVG[] = [];
  for (let i = candles.length - 30; i < candles.length - 2; i++) {
    const [p, , nx] = candles.slice(i, i + 3);
    if (nx.l > p.h)
      fvgs.push({
        type: "BULLISH", top: nx.l, bot: p.h,
        mid: (nx.l + p.h) / 2, size: nx.l - p.h,
      });
    if (nx.h < p.l)
      fvgs.push({
        type: "BEARISH", top: p.l, bot: nx.h,
        mid: (p.l + nx.h) / 2, size: p.l - nx.h,
      });
  }
  return fvgs.sort((a, b) => b.size - a.size).slice(0, 3);
};

const detectLiquidity = (candles: Candle[]): LiquidityResult => {
  const { highs, lows } = findSwings(candles.slice(0, -3), 3);
  const last = candles[candles.length - 1];
  const result: LiquidityResult = { bsl: [], ssl: [], swept: [] };

  highs.forEach((h) => {
    if (last.h > h.p && last.c < h.p)
      result.swept.push({ type: "BSL", level: h.p });
    else result.bsl.push(h.p);
  });
  lows.forEach((l) => {
    if (last.l < l.p && last.c > l.p)
      result.swept.push({ type: "SSL", level: l.p });
    else result.ssl.push(l.p);
  });
  return result;
};

const detectPremDisc = (candles: Candle[]): string => {
  const { highs, lows } = findSwings(candles, 5);
  if (!highs.length || !lows.length) return "EQUILIBRIUM";
  const rangeH = Math.max(...highs.map((h) => h.p));
  const rangeL = Math.min(...lows.map((l) => l.p));
  const eq = (rangeH + rangeL) / 2;
  const price = candles[candles.length - 1].c;
  if (price > eq * 1.005) return "PREMIUM";
  if (price < eq * 0.995) return "DISCOUNT";
  return "EQUILIBRIUM";
};

const detectInstCandle = (candles: Candle[]): boolean => {
  const n = candles.length;
  const last = candles[n - 1];
  const avg =
    candles.slice(n - 20, n - 1).reduce(
      (a, c) => a + (c.h - c.l), 0
    ) / 19;
  const bodyRatio =
    Math.abs(last.c - last.o) / ((last.h - last.l) || 1);
  return (last.h - last.l) > avg * 2.5 && bodyRatio > 0.7;
};

const detectEngulf = (candles: Candle[]): string | null => {
  const n = candles.length;
  const [prev, last] = candles.slice(n - 2);
  const bull =
    prev.c < prev.o &&
    last.c > last.o &&
    last.o < prev.c &&
    last.c > prev.o;
  const bear =
    prev.c > prev.o &&
    last.c < last.o &&
    last.o > prev.c &&
    last.c < prev.o;
  if (bull) return "BULLISH";
  if (bear) return "BEARISH";
  return null;
// تأكد من إضافة هذا التحقق قبل العملية الحسابية
if (!candles || candles.length < 2) {
  console.error("Not enough data to calculate signals");
  return new Response(JSON.stringify({ error: "Insufficient data" }), { status: 400 });
}

// العملية الحسابية المحمية
const hh = Math.max(...candles.map(c => c.h));
const ll = Math.min(...candles.map(c => c.l));
const lastCandle = candles[candles.length - 1];

// حساب آمن لتجنب القسمة على صفر أو أخطاء البيانات الفارغة
const signalValue = (hh !== ll) 
  ? ((hh - lastCandle.c) / (hh - ll)) * 100 
  : 0;

return signalValue;

// ═══════════════════════════════════════════════════════
//  SCORING ENGINE (160pt max)
// ═══════════════════════════════════════════════════════
const scoreAll = (data: {
  ms: MSResult; bos: any; choch: string | null;
  obs: OrderBlock[]; fvgs: FVG[]; liq: LiquidityResult;
  rsi: number; macd: MACDResult; bb: BBResult;
  stoch: StochResult; willR: number; ichimoku: IchimokuResult;
  volDelta: VolDelta; instCandle: boolean;
  engulf: string | null; premDisc: string;
}): ScoringResult => {
  let bull = 0, bear = 0;
  const { ms, bos, choch, obs, fvgs, liq, rsi, macd, bb,
    stoch, willR, ichimoku, volDelta, instCandle, engulf, premDisc } = data;

  // Structure (55pts)
  if (ms.trend === "BULLISH") bull += 25;
  else if (ms.trend === "BEARISH") bear += 25;
  if (bos?.type === "BULLISH") bull += 18;
  else if (bos?.type === "BEARISH") bear += 18;
  if (choch === "BULLISH") bull += 12;
  else if (choch === "BEARISH") bear += 12;

  // Price Action (35pts)
  obs.filter((o) => o.type === "BULLISH")
    .forEach((o) => { bull += Math.min(o.strength * 3, 10); });
  obs.filter((o) => o.type === "BEARISH")
    .forEach((o) => { bear += Math.min(o.strength * 3, 10); });
  fvgs.filter((f) => f.type === "BULLISH").forEach(() => { bull += 7; });
  fvgs.filter((f) => f.type === "BEARISH").forEach(() => { bear += 7; });
  if (engulf === "BULLISH") bull += 8;
  else if (engulf === "BEARISH") bear += 8;

  // Liquidity (25pts)
  liq.swept.forEach((s) => {
    if (s.type === "SSL") bull += 25;
    else bear += 25;
  });

  // Indicators (50pts)
  if (rsi < 30) bull += 15;
  else if (rsi > 70) bear += 15;
  else if (rsi < 45) bull += 5;
  else if (rsi > 55) bear += 5;

  if (macd.hist > 0 && macd.trend === "UP") bull += 12;
  else if (macd.hist < 0 && macd.trend === "DOWN") bear += 12;

  if (stoch.k < 20 && stoch.k > stoch.d) bull += 10;
  else if (stoch.k > 80 && stoch.k < stoch.d) bear += 10;

  if (willR < -80) bull += 8;
  else if (willR > -20) bear += 8;

  if (bb.pctB < 0.1) bull += 5;
  else if (bb.pctB > 0.9) bear += 5;

  // Cloud (15pts)
  if (ichimoku.bias === "BULLISH") bull += 15;
  else if (ichimoku.bias === "BEARISH") bear += 15;

  // Context (15pts)
  if (premDisc === "DISCOUNT") bull += 10;
  else if (premDisc === "PREMIUM") bear += 10;
  if (instCandle) { bull > bear ? (bull += 5) : (bear += 5); }
  if (volDelta.ratio > 1.5) bull += 5;
  else if (volDelta.ratio < 0.6) bear += 5;

  let direction: "BUY" | "SELL" | "NEUTRAL" = "NEUTRAL";
  if (bull > bear + 20) direction = "BUY";
  else if (bear > bull + 20) direction = "SELL";

  const raw = direction === "BUY" ? bull
    : direction === "SELL" ? bear
    : Math.max(bull, bear);
  const pct = Math.min(99, Math.round((raw / 160) * 100));
  const strength: "STRONG" | "MEDIUM" | "WEAK" =
    pct >= 75 ? "STRONG" : pct >= 52 ? "MEDIUM" : "WEAK";

  return { direction, bull, bear, raw, pct, strength };
};

// ═══════════════════════════════════════════════════════
//  FULL ANALYSIS PER SYMBOL
// ═══════════════════════════════════════════════════════
async function analyze(symbol: string): Promise<SignalResult> {
  const [w1, d1, h4, h1, m15] = await Promise.all([
    fetchCandles(symbol, "1w", 52),
    fetchCandles(symbol, "1d", 90),
    fetchCandles(symbol, "4h", 200),
    fetchCandles(symbol, "1h", 200),
    fetchCandles(symbol, "15m", 150),
  ]);

  const closes = h1.map((c) => c.c);
  const price = closes[closes.length - 1];
  const open24 = h1[h1.length - 25]?.c || price;
  const change24 = ((price - open24) / open24) * 100;
  const high24 = Math.max(...h1.slice(-24).map((c) => c.h));
  const low24 = Math.min(...h1.slice(-24).map((c) => c.l));
  const vol24 = h1.slice(-24).reduce((a, c) => a + c.v, 0);

  // Indicators
  const rsi = wilderRSI(closes);
  const rsiD = wilderRSI(d1.map((c) => c.c));
  const macd = calcMACD(closes);
  const bb = calcBB(closes);
  const atr = calcATR(h1);
  const stoch = stochRSI(closes);
  const willR = williamsR(h1);
  const ichimoku = calcIchimoku(h1);

  // Volume delta
  const volDelta: VolDelta = (() => {
    const rc = h1.slice(-30);
    const buy = rc.filter((c) => c.c > c.o).reduce((a, c) => a + c.v, 0);
    const sell = rc.filter((c) => c.c < c.o).reduce((a, c) => a + c.v, 0);
    return { buy, sell, ratio: buy / (sell || 1), delta: buy - sell };
  })();

  // SMC
  const weeklyMS = msAnalysis(w1);
  const dailyMS = msAnalysis(d1);
  const ms = msAnalysis(h4);
  const bos = detectBOS(h1);
  const choch = detectCHoCH(h1);
  const obs = findOBs(h1);
  const fvgs = findFVGs(m15);
  const liq = detectLiquidity(h4);
  const premDisc = detectPremDisc(h4);
  const instCandle = detectInstCandle(h1);
  const engulf = detectEngulf(h1);

  // Score
  const scoring = scoreAll({
    ms, bos, choch, obs, fvgs, liq,
    rsi, macd, bb, stoch, willR, ichimoku,
    volDelta, instCandle, engulf, premDisc,
  });

  const { direction, strength, pct } = scoring;
  const atrMult =
    strength === "STRONG" ? 1.1 :
    strength === "MEDIUM" ? 1.4 : 1.8;

  const sl =
    direction === "BUY"
      ? +(price - atr * atrMult).toFixed(5)
      : +(price + atr * atrMult).toFixed(5);
  const slPct = (Math.abs(price - sl) / price * 100).toFixed(2);
  const tp1 =
    direction === "BUY"
      ? +(price + atr * 1.2).toFixed(5)
      : +(price - atr * 1.2).toFixed(5);
  const tp2 =
    direction === "BUY"
      ? +(price + atr * 2.5).toFixed(5)
      : +(price - atr * 2.5).toFixed(5);
  const tp3 =
    direction === "BUY"
      ? +(price + atr * 4).toFixed(5)
      : +(price - atr * 4).toFixed(5);
  const tp4 =
    direction === "BUY"
      ? +(price + atr * 6.5).toFixed(5)
      : +(price - atr * 6.5).toFixed(5);
  const rr2 = (Math.abs(tp2 - price) / Math.abs(price - sl)).toFixed(1);
  const rr3 = (Math.abs(tp3 - price) / Math.abs(price - sl)).toFixed(1);

  const tfAgree = [weeklyMS.trend, dailyMS.trend, ms.trend].filter(
    (t) => t === (direction === "BUY" ? "BULLISH" : "BEARISH")
  ).length;
  const confidence = Math.min(98, Math.round(pct * 0.7 + tfAgree * 10));
  const spark = h1.slice(-40).map((c) => c.c);

  return {
    symbol, price, change24: +change24.toFixed(2),
    high24, low24, vol24,
    atr: +atr.toFixed(5),
    rsi: +rsi.toFixed(1), rsiD: +rsiD.toFixed(1),
    macd, bb, stoch,
    willR: +willR.toFixed(1),
    ichimoku, volDelta,
    weeklyMS, dailyMS, ms,
    bos, choch, obs, fvgs, liq,
    premDisc, instCandle, engulf,
    scoring, direction, strength, pct,
    sl, slPct, tp1, tp2, tp3, tp4,
    rr2, rr3, confidence, tfAgree,
    spark,
    timestamp: new Date().toISOString(),
  };
}

// ═══════════════════════════════════════════════════════
//  PAIRS
// ═══════════════════════════════════════════════════════
const PAIRS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT",
  "XRPUSDT", "ADAUSDT", "DOGEUSDT", "AVAXUSDT",
  "LINKUSDT", "MATICUSDT",
];

// ═══════════════════════════════════════════════════════
//  API HANDLER
// ═══════════════════════════════════════════════════════
export async function GET() {
  try {
    const results = await Promise.allSettled(
      PAIRS.map((symbol) => analyze(symbol))
    );

    const signals = results
      .filter(
        (r): r is PromiseFulfilledResult<SignalResult> =>
          r.status === "fulfilled"
      )
      .map((r) => r.value)
      .sort((a, b) => b.pct - a.pct);

    return NextResponse.json({
      success: true,
      signals,
      meta: {
        total: signals.length,
        buy: signals.filter((s) => s.direction === "BUY").length,
        sell: signals.filter((s) => s.direction === "SELL").length,
        strong: signals.filter(
          (s) => s.strength === "STRONG" && s.direction !== "NEUTRAL"
        ).length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
