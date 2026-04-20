import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════
//  CONFIGURATION
// ═══════════════════════════════════════════════════════
const PAIRS = [
  { s: "BTCUSDT",  n: "Bitcoin",   t: "BTC",  c: "#f7931a", cat: "MAJOR" },
  { s: "ETHUSDT",  n: "Ethereum",  t: "ETH",  c: "#627eea", cat: "MAJOR" },
  { s: "SOLUSDT",  n: "Solana",    t: "SOL",  c: "#9945ff", cat: "ALT"   },
  { s: "BNBUSDT",  n: "BNB",       t: "BNB",  c: "#f0b90b", cat: "MAJOR" },
  { s: "XRPUSDT",  n: "XRP",       t: "XRP",  c: "#00aae4", cat: "ALT"   },
  { s: "ADAUSDT",  n: "Cardano",   t: "ADA",  c: "#3cc8c8", cat: "ALT"   },
  { s: "DOGEUSDT", n: "Dogecoin",  t: "DOGE", c: "#c2a633", cat: "MEME"  },
  { s: "AVAXUSDT", n: "Avalanche", t: "AVAX", c: "#e84142", cat: "ALT"   },
  { s: "LINKUSDT", n: "Chainlink", t: "LINK", c: "#2a5ada", cat: "ALT"   },
  { s: "MATICUSDT",n: "Polygon",   t: "MATIC",c: "#8247e5", cat: "ALT"   },
];

// ═══════════════════════════════════════════════════════
//  MATH / DSP UTILITIES
// ═══════════════════════════════════════════════════════
const pc = (arr) => arr.map((c) => ({...c}));

const ema = (data, p) => {
  const k = 2 / (p + 1);
  let v = data[0];
  return data.map(d => (v = d * k + v * (1 - k)));
};

const sma = (data, p) =>
  data.map((_, i) => i < p - 1 ? null : data.slice(i - p + 1, i + 1).reduce((a, b) => a + b, 0) / p);

const stdDev = (data) => {
  const m = data.reduce((a, b) => a + b, 0) / data.length;
  return Math.sqrt(data.reduce((a, b) => a + (b - m) ** 2, 0) / data.length);
};

// Wilder RSI (true formula)
const wilderRSI = (closes, p = 14) => {
  if (closes.length < p + 1) return 50;
  let ag = 0, al = 0;
  for (let i = 1; i <= p; i++) {
    const d = closes[i] - closes[i - 1];
    d > 0 ? (ag += d) : (al -= d);
  }
  ag /= p; al /= p;
  for (let i = p + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    ag = (ag * (p - 1) + Math.max(d, 0)) / p;
    al = (al * (p - 1) + Math.max(-d, 0)) / p;
  }
  return al === 0 ? 100 : 100 - 100 / (1 + ag / al);
};

// True MACD
const calcMACD = (closes, fast = 12, slow = 26, sig = 9) => {
  const e12 = ema(closes, fast);
  const e26 = ema(closes, slow);
  const macdLine = e12.map((v, i) => v - e26[i]);
  const signalLine = ema(macdLine, sig);
  const hist = macdLine.map((v, i) => v - signalLine[i]);
  const n = closes.length - 1;
  return { macd: macdLine[n], signal: signalLine[n], hist: hist[n], histPrev: hist[n-1], trend: hist[n] > hist[n-1] ? "UP" : "DOWN" };
};

// Bollinger Bands + %B + Bandwidth
const calcBB = (closes, p = 20, mult = 2) => {
  const sl = closes.slice(-p);
  const mid = sl.reduce((a, b) => a + b, 0) / p;
  const sd = stdDev(sl);
  const upper = mid + mult * sd;
  const lower = mid - mult * sd;
  const price = closes[closes.length - 1];
  const pctB = (price - lower) / (upper - lower);
  const bw = (upper - lower) / mid;
  return { upper, mid, lower, pctB, bw };
};

// ATR with Wilder smoothing
const calcATR = (candles, p = 14) => {
  const trs = candles.map((c, i) => {
    if (i === 0) return c.h - c.l;
    const prev = candles[i - 1];
    return Math.max(c.h - c.l, Math.abs(c.h - prev.c), Math.abs(c.l - prev.c));
  });
  let atr = trs.slice(0, p).reduce((a, b) => a + b, 0) / p;
  for (let i = p; i < trs.length; i++) atr = (atr * (p - 1) + trs[i]) / p;
  return atr;
};

// Stochastic RSI
const stochRSI = (closes, rsiP = 14, stochP = 14) => {
  const rsiVals = [];
  for (let i = rsiP; i < closes.length; i++) rsiVals.push(wilderRSI(closes.slice(0, i + 1), rsiP));
  if (rsiVals.length < stochP) return { k: 50, d: 50 };
  const slice = rsiVals.slice(-stochP);
  const minR = Math.min(...slice), maxR = Math.max(...slice);
  const k = maxR === minR ? 50 : ((rsiVals[rsiVals.length - 1] - minR) / (maxR - minR)) * 100;
  const d = rsiVals.slice(-3).reduce((a, b) => a + b, 0) / 3;
  return { k, d };
};

// Williams %R
const williamsR = (candles, p = 14) => {
  const sl = candles.slice(-p);
  const hh = Math.max(...sl.map(c => c.h));
  const ll = Math.min(...sl.map(c => c.l));
  return ((hh - candles[candles.length - 1].c) / (hh - ll)) * -100;
};

// Volume Profile (simplified)
const volProfile = (candles, bins = 10) => {
  const allH = candles.map(c => c.h), allL = candles.map(c => c.l);
  const min = Math.min(...allL), max = Math.max(...allH);
  const binSize = (max - min) / bins;
  const profile = Array.from({ length: bins }, (_, i) => ({ price: min + (i + 0.5) * binSize, vol: 0 }));
  candles.forEach(c => {
    const mid = (c.h + c.l) / 2;
    const idx = Math.min(Math.floor((mid - min) / binSize), bins - 1);
    profile[idx].vol += c.v;
  });
  const maxV = Math.max(...profile.map(p => p.vol));
  return profile.map(p => ({ ...p, pct: p.vol / maxV }));
};

// ═══════════════════════════════════════════════════════
//  SMC DETECTION ENGINE
// ═══════════════════════════════════════════════════════
const parseCandles = (raw) => raw.map(c => ({ t: c[0], o: +c[1], h: +c[2], l: +c[3], c: +c[4], v: +c[5] }));

const findSwings = (candles, lb = 5) => {
  const highs = [], lows = [];
  for (let i = lb; i < candles.length - lb; i++) {
    const win = candles.slice(i - lb, i + lb + 1);
    if (candles[i].h === Math.max(...win.map(c => c.h))) highs.push({ i, p: candles[i].h });
    if (candles[i].l === Math.min(...win.map(c => c.l))) lows.push({ i, p: candles[i].l });
  }
  return { highs: highs.slice(-6), lows: lows.slice(-6) };
};

const msAnalysis = (candles) => {
  const { highs, lows } = findSwings(candles);
  if (highs.length < 2 || lows.length < 2) return { trend: "RANGING", bias: 0 };
  const hDiff = highs[highs.length-1].p - highs[highs.length-2].p;
  const lDiff = lows[lows.length-1].p - lows[lows.length-2].p;
  if (hDiff > 0 && lDiff > 0) return { trend: "BULLISH", bias: (hDiff + lDiff) / 2 };
  if (hDiff < 0 && lDiff < 0) return { trend: "BEARISH", bias: (hDiff + lDiff) / 2 };
  return { trend: "RANGING", bias: 0 };
};

const detectBOS = (candles) => {
  const { highs, lows } = findSwings(candles.slice(0, -2));
  const last = candles[candles.length - 1];
  if (highs.length && last.c > highs[highs.length-1].p)
    return { type: "BULLISH", level: highs[highs.length-1].p, idx: highs[highs.length-1].i };
  if (lows.length && last.c < lows[lows.length-1].p)
    return { type: "BEARISH", level: lows[lows.length-1].p, idx: lows[lows.length-1].i };
  return null;
};

const detectCHoCH = (candles) => {
  const half = Math.floor(candles.length / 2);
  const t1 = msAnalysis(candles.slice(0, half)).trend;
  const t2 = msAnalysis(candles.slice(half)).trend;
  if (t1 === "BULLISH" && t2 === "BEARISH") return "BEARISH";
  if (t1 === "BEARISH" && t2 === "BULLISH") return "BULLISH";
  return null;
};

const findOBs = (candles) => {
  const n = candles.length, obs = [];
  const avgBody = candles.slice(-30).reduce((a, c) => a + Math.abs(c.c - c.o), 0) / 30;
  for (let i = n - 50; i < n - 5; i++) {
    const c = candles[i];
    const after = candles.slice(i + 1, i + 8);
    const bullMove = after.reduce((a, x) => a + Math.max(x.c - x.o, 0), 0);
    const bearMove = after.reduce((a, x) => a + Math.max(x.o - x.c, 0), 0);
    if (c.c < c.o && bullMove > avgBody * 2) {
      const mitigated = candles.slice(i + 1).some(x => x.l <= c.h && x.h >= c.l);
      obs.push({ type: "BULLISH", h: c.h, l: c.l, o: c.o, cl: c.c, mid: (c.h + c.l) / 2, i, strength: bullMove / avgBody, mitigated, vol: c.v });
    }
    if (c.c > c.o && bearMove > avgBody * 2) {
      const mitigated = candles.slice(i + 1).some(x => x.l <= c.h && x.h >= c.l);
      obs.push({ type: "BEARISH", h: c.h, l: c.l, o: c.o, cl: c.c, mid: (c.h + c.l) / 2, i, strength: bearMove / avgBody, mitigated, vol: c.v });
    }
  }
  return obs.filter(o => !o.mitigated).sort((a, b) => b.strength - a.strength).slice(0, 4);
};

const findFVGs = (candles) => {
  const fvgs = [];
  for (let i = candles.length - 30; i < candles.length - 2; i++) {
    const [p, , nx] = candles.slice(i, i + 3);
    if (nx.l > p.h) fvgs.push({ type: "BULLISH", top: nx.l, bot: p.h, mid: (nx.l + p.h) / 2, size: nx.l - p.h, i, filled: false });
    if (nx.h < p.l) fvgs.push({ type: "BEARISH", top: p.l, bot: nx.h, mid: (p.l + nx.h) / 2, size: p.l - nx.h, i, filled: false });
  }
  return fvgs.sort((a, b) => b.size - a.size).slice(0, 3);
};

const detectLiquidity = (candles) => {
  const { highs, lows } = findSwings(candles.slice(0, -3), 3);
  const last = candles[candles.length - 1];
  const result = { bsl: [], ssl: [], swept: [] };
  highs.forEach(h => {
    if (last.h > h.p && last.c < h.p) result.swept.push({ type: "BSL", level: h.p });
    else result.bsl.push(h.p);
  });
  lows.forEach(l => {
    if (last.l < l.p && last.c > l.p) result.swept.push({ type: "SSL", level: l.p });
    else result.ssl.push(l.p);
  });
  return result;
};

const detectPremDisc = (candles) => {
  const { highs, lows } = findSwings(candles, 5);
  if (!highs.length || !lows.length) return "EQUILIBRIUM";
  const rangeH = Math.max(...highs.map(h => h.p));
  const rangeL = Math.min(...lows.map(l => l.p));
  const eq = (rangeH + rangeL) / 2;
  const price = candles[candles.length - 1].c;
  if (price > eq * 1.005) return "PREMIUM";
  if (price < eq * 0.995) return "DISCOUNT";
  return "EQUILIBRIUM";
};

const detectInstitutionalCandle = (candles) => {
  const n = candles.length;
  const last = candles[n - 1];
  const avg = candles.slice(n - 20, n - 1).reduce((a, c) => a + (c.h - c.l), 0) / 19;
  const bodyRatio = Math.abs(last.c - last.o) / (last.h - last.l);
  return (last.h - last.l) > avg * 2.5 && bodyRatio > 0.7;
};

const detectEngulfing = (candles) => {
  const n = candles.length;
  const [prev, last] = candles.slice(n - 2);
  const bullEngulf = prev.c < prev.o && last.c > last.o && last.o < prev.c && last.c > prev.o;
  const bearEngulf = prev.c > prev.o && last.c < last.o && last.o > prev.c && last.c < prev.o;
  if (bullEngulf) return "BULLISH";
  if (bearEngulf) return "BEARISH";
  return null;
};

// Ichimoku Cloud
const calcIchimoku = (candles) => {
  const n = candles.length;
  const tenkan = (p) => {
    const sl = candles.slice(n - p);
    return (Math.max(...sl.map(c => c.h)) + Math.min(...sl.map(c => c.l))) / 2;
  };
  const t = tenkan(9), k = tenkan(26);
  const price = candles[n - 1].c;
  const aboveCloud = price > Math.max(t, k);
  const belowCloud = price < Math.min(t, k);
  return { tenkan: t, kijun: k, aboveCloud, belowCloud, bias: aboveCloud ? "BULLISH" : belowCloud ? "BEARISH" : "NEUTRAL" };
};

// ═══════════════════════════════════════════════════════
//  SCORING ENGINE (200pt max)
// ═══════════════════════════════════════════════════════
const scoreAll = (data) => {
  const { ms, bos, choch, obs, fvgs, liq, rsi, macd, bb, stoch, willR, ichimoku, volDelta, instCandle, engulf, premDisc } = data;
  let bull = 0, bear = 0;

  // Structure (55pts)
  if (ms.trend === "BULLISH") bull += 25; else if (ms.trend === "BEARISH") bear += 25;
  if (bos?.type === "BULLISH") bull += 18; else if (bos?.type === "BEARISH") bear += 18;
  if (choch === "BULLISH") bull += 12; else if (choch === "BEARISH") bear += 12;

  // Price Action (40pts)
  obs.filter(o => o.type === "BULLISH").forEach(o => bull += Math.min(o.strength * 3, 10));
  obs.filter(o => o.type === "BEARISH").forEach(o => bear += Math.min(o.strength * 3, 10));
  fvgs.filter(f => f.type === "BULLISH").forEach(() => bull += 7);
  fvgs.filter(f => f.type === "BEARISH").forEach(() => bear += 7);
  if (engulf === "BULLISH") bull += 8; else if (engulf === "BEARISH") bear += 8;

  // Liquidity (25pts)
  liq.swept.forEach(s => { if (s.type === "SSL") bull += 25; else bear += 25; });

  // Indicators (50pts)
  if (rsi < 30) bull += 15; else if (rsi > 70) bear += 15;
  else if (rsi < 45) bull += 5; else if (rsi > 55) bear += 5;

  if (macd.hist > 0 && macd.trend === "UP") bull += 12;
  else if (macd.hist < 0 && macd.trend === "DOWN") bear += 12;

  if (stoch.k < 20 && stoch.k > stoch.d) bull += 10;
  else if (stoch.k > 80 && stoch.k < stoch.d) bear += 10;

  if (willR < -80) bull += 8; else if (willR > -20) bear += 8;

  if (bb.pctB < 0.1) bull += 5; else if (bb.pctB > 0.9) bear += 5;

  // Cloud (15pts)
  if (ichimoku.bias === "BULLISH") bull += 15; else if (ichimoku.bias === "BEARISH") bear += 15;

  // Context (15pts)
  if (premDisc === "DISCOUNT") bull += 10; else if (premDisc === "PREMIUM") bear += 10;
  if (instCandle) { bull > bear ? bull += 5 : bear += 5; }
  if (volDelta.ratio > 1.5) bull += 5; else if (volDelta.ratio < 0.6) bear += 5;

  let direction = "NEUTRAL";
  if (bull > bear + 20) direction = "BUY";
  else if (bear > bull + 20) direction = "SELL";

  const raw = direction === "BUY" ? bull : direction === "SELL" ? bear : Math.max(bull, bear);
  const pct = Math.min(99, Math.round((raw / 160) * 100));
  const strength = pct >= 75 ? "STRONG" : pct >= 52 ? "MEDIUM" : "WEAK";
  return { direction, bull, bear, raw, pct, strength };
};

// ═══════════════════════════════════════════════════════
//  MAIN ANALYSIS
// ═══════════════════════════════════════════════════════
async function analyze(symbol) {
  const get = async (iv, lim) => {
    const r = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${iv}&limit=${lim}`);
    return parseCandles(await r.json());
  };

  const [w1, d1, h4, h1, m15] = await Promise.all([
    get("1w", 52), get("1d", 90), get("4h", 200), get("1h", 200), get("15m", 150)
  ]);

  const closes = h1.map(c => c.c);
  const price = closes[closes.length - 1];
  const open24 = h1[h1.length - 25]?.c || price;
  const change24 = ((price - open24) / open24) * 100;
  const high24 = Math.max(...h1.slice(-24).map(c => c.h));
  const low24 = Math.min(...h1.slice(-24).map(c => c.l));
  const vol24 = h1.slice(-24).reduce((a, c) => a + c.v, 0);

  // Weekly & Daily bias
  const weeklyMS = msAnalysis(w1);
  const dailyMS = msAnalysis(d1);

  // Core indicators
  const rsi = wilderRSI(closes);
  const rsiD = wilderRSI(d1.map(c => c.c));
  const macd = calcMACD(closes);
  const bb = calcBB(closes);
  const bbD = calcBB(d1.map(c => c.c));
  const atr = calcATR(h1);
  const stoch = stochRSI(closes);
  const willR = williamsR(h1);
  const ichimoku = calcIchimoku(h1);

  // Volume
  const volDelta = (() => {
    const rc = h1.slice(-30);
    const buy = rc.filter(c => c.c > c.o).reduce((a, c) => a + c.v, 0);
    const sell = rc.filter(c => c.c < c.o).reduce((a, c) => a + c.v, 0);
    return { buy, sell, ratio: buy / (sell || 1), delta: buy - sell };
  })();

  // SMC
  const ms = msAnalysis(h4);
  const bos = detectBOS(h1);
  const choch = detectCHoCH(h1);
  const obs = findOBs(h1);
  const fvgs = findFVGs(m15);
  const liq = detectLiquidity(h4);
  const premDisc = detectPremDisc(h4);
  const instCandle = detectInstitutionalCandle(h1);
  const engulf = detectEngulfing(h1);
  const vp = volProfile(h4.slice(-50));

  // Score
  const scoring = scoreAll({ ms, bos, choch, obs, fvgs, liq, rsi, macd, bb, stoch, willR, ichimoku, volDelta, instCandle, engulf, premDisc });

  // Trade params
  const { direction, strength, pct } = scoring;
  const atrMult = strength === "STRONG" ? 1.1 : strength === "MEDIUM" ? 1.4 : 1.8;
  const sl = direction === "BUY" ? +(price - atr * atrMult).toFixed(5) : +(price + atr * atrMult).toFixed(5);
  const slPct = (Math.abs(price - sl) / price * 100).toFixed(2);
  const tp1 = direction === "BUY" ? +(price + atr * 1.2).toFixed(5) : +(price - atr * 1.2).toFixed(5);
  const tp2 = direction === "BUY" ? +(price + atr * 2.5).toFixed(5) : +(price - atr * 2.5).toFixed(5);
  const tp3 = direction === "BUY" ? +(price + atr * 4).toFixed(5) : +(price - atr * 4).toFixed(5);
  const tp4 = direction === "BUY" ? +(price + atr * 6.5).toFixed(5) : +(price - atr * 6.5).toFixed(5);
  const rr2 = (Math.abs(tp2 - price) / Math.abs(price - sl)).toFixed(1);
  const rr3 = (Math.abs(tp3 - price) / Math.abs(price - sl)).toFixed(1);

  // Confidence model
  const tfAgree = [weeklyMS.trend, dailyMS.trend, ms.trend].filter(t => t === (scoring.direction === "BUY" ? "BULLISH" : "BEARISH")).length;
  const confidence = Math.min(98, Math.round(pct * 0.7 + tfAgree * 10));

  const spark = h1.slice(-40).map(c => c.c);
  const spark15 = m15.slice(-30).map(c => c.c);

  return {
    symbol, price, change24: +change24.toFixed(2), high24, low24, vol24,
    atr: +atr.toFixed(5), rsi: +rsi.toFixed(1), rsiD: +rsiD.toFixed(1),
    macd, bb, bbD, stoch, willR: +willR.toFixed(1), ichimoku,
    volDelta, weeklyMS, dailyMS, ms, bos, choch, obs, fvgs, liq,
    premDisc, instCandle, engulf, vp, scoring, direction: scoring.direction,
    strength: scoring.strength, pct: scoring.pct,
    sl, slPct, tp1, tp2, tp3, tp4, rr2, rr3,
    confidence, tfAgree, spark, spark15,
    ts: Date.now(),
  };
}

// ═══════════════════════════════════════════════════════
//  CANVAS COMPONENTS
// ═══════════════════════════════════════════════════════
function Sparkline({ data, color, w = 80, h = 28, fill = true }) {
  const ref = useRef();
  useEffect(() => {
    if (!data?.length || !ref.current) return;
    const c = ref.current, ctx = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    c.width = w * dpr; c.height = h * dpr;
    c.style.width = w + "px"; c.style.height = h + "px";
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
    const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - mn) / rng) * h * 0.9 - h * 0.05]);
    if (fill) {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, color + "45"); g.addColorStop(1, "transparent");
      ctx.beginPath(); pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
      ctx.fillStyle = g; ctx.fill();
    }
    ctx.beginPath(); pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
    ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.lineJoin = "round"; ctx.stroke();
    // Last dot
    const [lx, ly] = pts[pts.length - 1];
    ctx.beginPath(); ctx.arc(lx, ly, 2, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
  }, [data, color, w, h]);
  return <canvas ref={ref} style={{ display: "block" }} />;
}

function CandleCanvas({ candles, obs, fvgs, liq, w = 320, h = 110 }) {
  const ref = useRef();
  useEffect(() => {
    if (!candles?.length || !ref.current) return;
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const sl = candles.slice(-35);
    const mn = Math.min(...sl.map(c => c.l)) * 0.9994;
    const mx = Math.max(...sl.map(c => c.h)) * 1.0006;
    const rng = mx - mn;
    const toY = v => h - ((v - mn) / rng) * h * 0.95 - h * 0.025;
    const cw = (w / sl.length) * 0.65;

    // FVG zones
    fvgs?.forEach(f => {
      ctx.fillStyle = f.type === "BULLISH" ? "rgba(0,220,160,0.09)" : "rgba(255,60,90,0.09)";
      ctx.fillRect(0, toY(f.top), w, toY(f.bot) - toY(f.top));
      ctx.strokeStyle = f.type === "BULLISH" ? "rgba(0,220,160,0.25)" : "rgba(255,60,90,0.25)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(0, toY(f.top), w, toY(f.bot) - toY(f.top));
    });

    // OB zones
    obs?.slice(0, 2).forEach(o => {
      ctx.fillStyle = o.type === "BULLISH" ? "rgba(0,220,160,0.13)" : "rgba(255,60,90,0.13)";
      ctx.fillRect(0, toY(o.h), w, toY(o.l) - toY(o.h));
      ctx.strokeStyle = o.type === "BULLISH" ? "#00dca0" : "#ff3c5a";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(0, toY(o.mid)); ctx.lineTo(w, toY(o.mid)); ctx.stroke();
      ctx.setLineDash([]);
    });

    // Liquidity levels
    liq?.bsl?.forEach(level => {
      ctx.strokeStyle = "rgba(255,200,0,0.3)"; ctx.lineWidth = 0.8; ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(0, toY(level)); ctx.lineTo(w, toY(level)); ctx.stroke();
      ctx.setLineDash([]);
    });
    liq?.ssl?.forEach(level => {
      ctx.strokeStyle = "rgba(100,180,255,0.3)"; ctx.lineWidth = 0.8; ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(0, toY(level)); ctx.lineTo(w, toY(level)); ctx.stroke();
      ctx.setLineDash([]);
    });

    // Candles
    sl.forEach((c, i) => {
      const x = (i / sl.length) * w + cw * 0.3;
      const isUp = c.c >= c.o;
      const col = isUp ? "#00dca0" : "#ff3c5a";
      ctx.strokeStyle = col + "cc"; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(x + cw / 2, toY(c.h)); ctx.lineTo(x + cw / 2, toY(c.l)); ctx.stroke();
      const top = toY(Math.max(c.o, c.c));
      const bh = Math.max(1.5, Math.abs(toY(c.o) - toY(c.c)));
      ctx.fillStyle = isUp ? col : col + "dd";
      ctx.fillRect(x, top, cw, bh);
    });

    // Current price line
    const cp = sl[sl.length - 1].c;
    ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 0.5; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(0, toY(cp)); ctx.lineTo(w, toY(cp)); ctx.stroke();
    ctx.setLineDash([]);
  }, [candles, obs, fvgs, liq, w, h]);
  return <canvas ref={ref} style={{ borderRadius: 8, display: "block" }} />;
}

function VolumeProfileBar({ vp }) {
  if (!vp?.length) return null;
  const maxV = Math.max(...vp.map(b => b.vol));
  return (
    <div style={{ display: "flex", flexDirection: "column-reverse", gap: 1, height: 110 }}>
      {vp.map((b, i) => (
        <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 3 }}>
          <div style={{ height: "60%", width: `${b.pct * 40}px`, minWidth: 2, background: b.pct > 0.7 ? "#ffd700" : "rgba(255,255,255,0.2)", borderRadius: 1, transition: "width 0.5s" }} />
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  GAUGE COMPONENT
// ═══════════════════════════════════════════════════════
function Gauge({ value, min = 0, max = 100, label, color }) {
  const pct = (value - min) / (max - min);
  const angle = -140 + pct * 280;
  const rad = angle * Math.PI / 180;
  const cx = 40, cy = 38, r = 28;
  const nx = cx + r * Math.cos(rad), ny = cy + r * Math.sin(rad);
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={80} height={56} viewBox="0 0 80 56">
        <path d={`M ${cx - r * Math.cos(40 * Math.PI / 180)} ${cy + r * Math.sin(40 * Math.PI / 180)} A ${r} ${r} 0 1 1 ${cx + r * Math.cos(40 * Math.PI / 180)} ${cy + r * Math.sin(40 * Math.PI / 180)}`}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={5} strokeLinecap="round" />
        <path d={`M ${cx - r * Math.cos(40 * Math.PI / 180)} ${cy + r * Math.sin(40 * Math.PI / 180)} A ${r} ${r} 0 1 1 ${nx} ${ny}`}
          fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        <text x={cx} y={cy + 2} textAnchor="middle" fill={color} fontSize={11} fontWeight="800" fontFamily="monospace">{Math.round(value)}</text>
      </svg>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: -6, letterSpacing: 0.5 }}>{label}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  SIGNAL CARD
// ═══════════════════════════════════════════════════════
function Card({ sig, meta, idx }) {
  const [tab, setTab] = useState("smc");
  const [open, setOpen] = useState(false);

  const isBuy = sig.direction === "BUY";
  const isSell = sig.direction === "SELL";
  const col = isBuy ? "#00dca0" : isSell ? "#ff3c5a" : "#666";
  const colDim = col + "22";
  const isNeutral = sig.direction === "NEUTRAL";

  const fmt = (v) => {
    if (!v && v !== 0) return "–";
    if (v > 999999) return (v / 1e6).toFixed(2) + "M";
    if (v > 9999) return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (v > 100) return v.toFixed(2);
    if (v > 1) return v.toFixed(4);
    return v.toFixed(6);
  };

  const tfColors = ["#666", "#888", "#00dca0"];
  const tfLabels = ["1W", "1D", "4H"];
  const tfTrends = [sig.weeklyMS?.trend, sig.dailyMS?.trend, sig.ms?.trend];

  const TABS = ["smc", "levels", "chart", "indicators", "multi-tf"];

  return (
    <div style={{
      borderRadius: 18,
      overflow: "hidden",
      background: "linear-gradient(145deg, rgba(13,15,24,0.97) 0%, rgba(9,11,19,0.99) 100%)",
      border: `1px solid ${open ? col + "35" : "rgba(255,255,255,0.055)"}`,
      boxShadow: open ? `0 12px 48px ${col}12` : "none",
      transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
    }}>
      {/* ACCENT LINE */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${col} 0%, ${meta.c}80 50%, transparent 100%)` }} />

      {/* HEADER ROW */}
      <div onClick={() => setOpen(!open)} style={{ padding: "13px 15px 11px", cursor: "pointer", display: "flex", gap: 11, alignItems: "center" }}>

        {/* Coin badge */}
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${meta.c}12`, border: `1px solid ${meta.c}28`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: meta.c, fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{meta.t}</span>
          <span style={{ fontSize: 7, color: meta.c + "77", letterSpacing: 0.3 }}>{meta.cat}</span>
        </div>

        {/* Name + direction */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 0.3 }}>{meta.n}</span>
            {!isNeutral && (
              <span style={{ fontSize: 9, fontWeight: 800, color: col, background: colDim, border: `1px solid ${col}35`, borderRadius: 5, padding: "1px 6px", letterSpacing: 1 }}>
                {sig.direction}
              </span>
            )}
            <span style={{ fontSize: 8, color: sig.strength === "STRONG" ? "#ffd700" : sig.strength === "MEDIUM" ? "#ff9f0a" : "#555", fontWeight: 700 }}>
              {sig.strength === "STRONG" ? "◆◆◆" : sig.strength === "MEDIUM" ? "◆◆◇" : "◆◇◇"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontFamily: "'Fira Code', monospace" }}>${fmt(sig.price)}</span>
            <span style={{ fontSize: 10, color: sig.change24 >= 0 ? "#00dca0" : "#ff3c5a", fontWeight: 700 }}>
              {sig.change24 >= 0 ? "▲" : "▼"}{Math.abs(sig.change24)}%
            </span>
            <span style={{ fontSize: 9, color: sig.premDisc === "DISCOUNT" ? "#00dca0" : sig.premDisc === "PREMIUM" ? "#ff3c5a" : "#888", background: "rgba(255,255,255,0.04)", padding: "1px 5px", borderRadius: 4 }}>
              {sig.premDisc}
            </span>
          </div>
        </div>

        {/* Score + spark */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
          <div style={{ position: "relative", width: 46, height: 46 }}>
            <svg width={46} height={46} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={23} cy={23} r={19} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
              <circle cx={23} cy={23} r={19} fill="none" stroke={col} strokeWidth={4}
                strokeDasharray={`${(sig.pct / 100) * 2 * Math.PI * 19} ${2 * Math.PI * 19}`}
                strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px ${col}88)`, transition: "stroke-dasharray 1s" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: col, fontFamily: "monospace" }}>{sig.pct}</span>
            </div>
          </div>
          <Sparkline data={sig.spark} color={col} w={60} h={18} fill={false} />
        </div>
      </div>

      {/* CONCEPTS STRIP */}
      <div style={{ paddingInline: 15, paddingBottom: 10, display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { k: "BOS", on: !!sig.bos, c: sig.bos?.type === "BULLISH" ? "#00dca0" : "#ff3c5a" },
          { k: "CHoCH", on: !!sig.choch, c: sig.choch === "BULLISH" ? "#00dca0" : "#ff3c5a" },
          { k: `OB×${sig.obs.length}`, on: sig.obs.length > 0, c: "#a78bfa" },
          { k: `FVG×${sig.fvgs.length}`, on: sig.fvgs.length > 0, c: "#38bdf8" },
          { k: `LIQ×${sig.liq.swept.length}`, on: sig.liq.swept.length > 0, c: "#fb923c" },
          { k: "ENGULF", on: !!sig.engulf, c: sig.engulf === "BULLISH" ? "#00dca0" : "#ff3c5a" },
          { k: "INST", on: sig.instCandle, c: "#ffd700" },
          { k: sig.ichimoku.bias, on: sig.ichimoku.bias !== "NEUTRAL", c: sig.ichimoku.bias === "BULLISH" ? "#00dca0" : "#ff3c5a" },
        ].map(t => (
          <span key={t.k} style={{
            fontSize: 8.5, fontWeight: 700, letterSpacing: 0.4, padding: "2px 7px", borderRadius: 20,
            background: t.on ? `${t.c}14` : "rgba(255,255,255,0.025)",
            color: t.on ? t.c : "rgba(255,255,255,0.15)",
            border: `1px solid ${t.on ? t.c + "38" : "transparent"}`,
          }}>{t.k}</span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 8.5, color: "rgba(255,255,255,0.2)" }}>
          {sig.confidence}% conf · RSI {sig.rsi}
        </span>
      </div>

      {/* EXPANDED */}
      {open && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.045)" }}>
          {/* TAB BAR */}
          <div style={{ display: "flex", background: "rgba(0,0,0,0.25)", overflowX: "auto" }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "9px 4px", border: "none", cursor: "pointer",
                fontSize: 9, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", whiteSpace: "nowrap",
                background: tab === t ? "rgba(255,255,255,0.05)" : "transparent",
                color: tab === t ? col : "rgba(255,255,255,0.28)",
                borderBottom: `2px solid ${tab === t ? col : "transparent"}`,
                transition: "all 0.2s", fontFamily: "inherit",
              }}>{t}</button>
            ))}
          </div>

          <div style={{ padding: 14 }}>

            {/* SMC TAB */}
            {tab === "smc" && (
              <div>
                {/* Bull/Bear meter */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, marginBottom: 5 }}>
                    <span style={{ color: "#00dca0", fontWeight: 700 }}>◀ BULL {sig.scoring.bull}pts</span>
                    <span style={{ color: "#888", fontSize: 8 }}>
                      {sig.scoring.bull > sig.scoring.bear ? `+${sig.scoring.bull - sig.scoring.bear} bull edge` : sig.scoring.bear > sig.scoring.bull ? `+${sig.scoring.bear - sig.scoring.bull} bear edge` : "neutral"}
                    </span>
                    <span style={{ color: "#ff3c5a", fontWeight: 700 }}>BEAR {sig.scoring.bear}pts ▶</span>
                  </div>
                  <div style={{ height: 7, borderRadius: 4, background: "#ff3c5a22", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(sig.scoring.bull / (sig.scoring.bull + sig.scoring.bear)) * 100}%`, background: "linear-gradient(90deg, #00dca0, #00dca088)", borderRadius: 4, transition: "width 0.9s cubic-bezier(.4,0,.2,1)" }} />
                  </div>
                </div>

                {/* SMC grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                  {[
                    { l: "4H Structure", v: sig.ms.trend, c: sig.ms.trend === "BULLISH" ? "#00dca0" : sig.ms.trend === "BEARISH" ? "#ff3c5a" : "#888" },
                    { l: "BOS", v: sig.bos ? `${sig.bos.type.slice(0, 4)} @ $${fmt(sig.bos.level)}` : "None", c: sig.bos ? col : "#444" },
                    { l: "CHoCH", v: sig.choch || "None", c: sig.choch ? "#ffd700" : "#444" },
                    { l: "Premium/Discount", v: sig.premDisc, c: sig.premDisc === "DISCOUNT" ? "#00dca0" : sig.premDisc === "PREMIUM" ? "#ff3c5a" : "#888" },
                    { l: "Liq. Swept", v: sig.liq.swept.length > 0 ? sig.liq.swept.map(s => s.type).join(", ") : "None", c: sig.liq.swept.length ? "#fb923c" : "#444" },
                    { l: "Engulfing", v: sig.engulf || "None", c: sig.engulf === "BULLISH" ? "#00dca0" : sig.engulf === "BEARISH" ? "#ff3c5a" : "#444" },
                    { l: "Inst. Candle", v: sig.instCandle ? "Detected" : "None", c: sig.instCandle ? "#ffd700" : "#444" },
                    { l: "Cloud Bias", v: sig.ichimoku.bias, c: sig.ichimoku.bias === "BULLISH" ? "#00dca0" : sig.ichimoku.bias === "BEARISH" ? "#ff3c5a" : "#888" },
                  ].map(item => (
                    <div key={item.l} style={{ background: "rgba(255,255,255,0.025)", borderRadius: 9, padding: "9px 11px" }}>
                      <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.28)", letterSpacing: 0.3, marginBottom: 3 }}>{item.l}</div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: item.c, fontFamily: "'Fira Code', monospace", wordBreak: "break-all" }}>{item.v}</div>
                    </div>
                  ))}
                </div>

                {/* Order Blocks list */}
                {sig.obs.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 6 }}>ORDER BLOCKS</div>
                    {sig.obs.slice(0, 3).map((ob, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "7px 10px", background: ob.type === "BULLISH" ? "rgba(0,220,160,0.06)" : "rgba(255,60,90,0.06)", borderRadius: 8, marginBottom: 5 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, color: ob.type === "BULLISH" ? "#00dca0" : "#ff3c5a", width: 30 }}>
                          {ob.type === "BULLISH" ? "▲" : "▼"} OB
                        </span>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", fontFamily: "'Fira Code', monospace", flex: 1 }}>
                          ${fmt(ob.l)} – ${fmt(ob.h)}
                        </span>
                        <div style={{ display: "flex", gap: 1 }}>
                          {Array.from({ length: Math.min(5, Math.round(ob.strength)) }).map((_, j) => (
                            <div key={j} style={{ width: 3, height: 10, background: ob.type === "BULLISH" ? "#00dca0" : "#ff3c5a", borderRadius: 1, opacity: 0.7 }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* LEVELS TAB */}
            {tab === "levels" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {[
                    { l: "🎯 Entry Zone", v: sig.price, c: "#fff", bg: "rgba(255,255,255,0.04)", sub: `ATR: ${sig.atr}` },
                    { l: "🛑 Stop Loss", v: sig.sl, c: "#ff3c5a", bg: "rgba(255,60,90,0.06)", sub: `-${sig.slPct}%` },
                    { l: "✅ TP1  ·  1.2R", v: sig.tp1, c: "#00dca0", bg: "rgba(0,220,160,0.04)", sub: "25% position" },
                    { l: "✅ TP2  ·  "+sig.rr2+"R", v: sig.tp2, c: "#00dca0", bg: "rgba(0,220,160,0.06)", sub: "35% position" },
                    { l: "🚀 TP3  ·  "+sig.rr3+"R", v: sig.tp3, c: "#ffd700", bg: "rgba(255,215,0,0.05)", sub: "25% position" },
                    { l: "💎 TP4  ·  MAX", v: sig.tp4, c: "#e879f9", bg: "rgba(232,121,249,0.05)", sub: "15% position" },
                  ].map(item => (
                    <div key={item.l} style={{ background: item.bg, borderRadius: 11, padding: "11px 13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{item.l}</div>
                        <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.2)" }}>{item.sub}</div>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 900, color: item.c, fontFamily: "'Fira Code', monospace" }}>${fmt(item.v)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
                  {[
                    { l: "RR (TP2)", v: `1:${sig.rr2}`, c: "#ffd700" },
                    { l: "WIN PROB", v: `${sig.confidence}%`, c: col },
                    { l: "TF ALIGN", v: `${sig.tfAgree}/3`, c: sig.tfAgree === 3 ? "#00dca0" : sig.tfAgree >= 2 ? "#ff9f0a" : "#ff3c5a" },
                  ].map(item => (
                    <div key={item.l} style={{ background: "rgba(255,255,255,0.025)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", marginBottom: 4 }}>{item.l}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: item.c, fontFamily: "'Barlow Condensed', sans-serif" }}>{item.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CHART TAB */}
            {tab === "chart" && (
              <div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginBottom: 8, display: "flex", gap: 12 }}>
                  <span style={{ color: "rgba(0,220,160,0.6)" }}>▬ OB Bullish</span>
                  <span style={{ color: "rgba(255,60,90,0.6)" }}>▬ OB Bearish</span>
                  <span style={{ color: "rgba(0,220,160,0.4)" }}>░ FVG</span>
                  <span style={{ color: "rgba(255,200,0,0.4)" }}>- BSL</span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <CandleCanvas candles={sig.h1} obs={sig.obs} fvgs={sig.fvgs} liq={sig.liq} w={290} h={110} />
                  <VolumeProfileBar vp={sig.vp} />
                </div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>15M ENTRY REFINEMENT</div>
                  <Sparkline data={sig.spark15} color={col} w={320} h={40} />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  {[
                    { l: "24H High", v: `$${fmt(sig.high24)}`, c: "#00dca0" },
                    { l: "24H Low", v: `$${fmt(sig.low24)}`, c: "#ff3c5a" },
                    { l: "Vol 24H", v: fmt(sig.vol24), c: "#888" },
                  ].map(item => (
                    <div key={item.l} style={{ flex: 1, background: "rgba(255,255,255,0.025)", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", marginBottom: 3 }}>{item.l}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: item.c, fontFamily: "'Fira Code', monospace" }}>{item.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INDICATORS TAB */}
            {tab === "indicators" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {/* Gauges row */}
                <div style={{ display: "flex", justifyContent: "space-around", background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: "10px 6px" }}>
                  <Gauge value={sig.rsi} label="RSI 1H" color={sig.rsi < 30 ? "#00dca0" : sig.rsi > 70 ? "#ff3c5a" : "#888"} />
                  <Gauge value={sig.rsiD} label="RSI 1D" color={sig.rsiD < 30 ? "#00dca0" : sig.rsiD > 70 ? "#ff3c5a" : "#888"} />
                  <Gauge value={sig.stoch.k} label="StochRSI K" color={sig.stoch.k < 20 ? "#00dca0" : sig.stoch.k > 80 ? "#ff3c5a" : "#888"} />
                  <Gauge value={100 + sig.willR} label="Williams %R" color={sig.willR < -80 ? "#00dca0" : sig.willR > -20 ? "#ff3c5a" : "#888"} />
                </div>

                {/* MACD */}
                <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>MACD (12,26,9)</span>
                    <span style={{ fontSize: 9, color: sig.macd.trend === "UP" ? "#00dca0" : "#ff3c5a", background: sig.macd.trend === "UP" ? "rgba(0,220,160,0.1)" : "rgba(255,60,90,0.1)", padding: "2px 8px", borderRadius: 5 }}>
                      {sig.macd.trend === "UP" ? "▲ CROSSING UP" : "▼ CROSSING DOWN"}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                    {[
                      { l: "MACD", v: sig.macd.macd.toFixed(4), c: sig.macd.macd > 0 ? "#00dca0" : "#ff3c5a" },
                      { l: "Signal", v: sig.macd.signal.toFixed(4), c: "#888" },
                      { l: "Histogram", v: sig.macd.hist.toFixed(4), c: sig.macd.hist > 0 ? "#00dca0" : "#ff3c5a" },
                    ].map(item => (
                      <div key={item.l} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", marginBottom: 3 }}>{item.l}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: item.c, fontFamily: "'Fira Code', monospace" }}>{item.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bollinger */}
                <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: 8 }}>Bollinger Bands (20,2)</div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, marginBottom: 4 }}>
                      <span style={{ color: "#ff3c5a" }}>Lower ${fmt(sig.bb.lower)}</span>
                      <span style={{ color: "#888" }}>{(sig.bb.pctB * 100).toFixed(0)}%B</span>
                      <span style={{ color: "#ff3c5a" }}>Upper ${fmt(sig.bb.upper)}</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)", position: "relative" }}>
                      <div style={{ position: "absolute", left: `${sig.bb.pctB * 100}%`, top: -2, width: 9, height: 9, borderRadius: "50%", background: col, transform: "translateX(-50%)", boxShadow: `0 0 6px ${col}` }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.25)" }}>
                    BW: {(sig.bb.bw * 100).toFixed(2)}% · Mid: ${fmt(sig.bb.mid)}
                  </div>
                </div>

                {/* Ichimoku */}
                <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>Ichimoku Cloud</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: sig.ichimoku.bias === "BULLISH" ? "#00dca0" : sig.ichimoku.bias === "BEARISH" ? "#ff3c5a" : "#888" }}>
                      {sig.ichimoku.aboveCloud ? "ABOVE" : sig.ichimoku.belowCloud ? "BELOW" : "INSIDE"} CLOUD
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
                    {[
                      { l: "Tenkan-sen", v: `$${fmt(sig.ichimoku.tenkan)}` },
                      { l: "Kijun-sen", v: `$${fmt(sig.ichimoku.kijun)}` },
                    ].map(item => (
                      <div key={item.l}>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", marginBottom: 2 }}>{item.l}</div>
                        <div style={{ fontSize: 10, color: "#aaa", fontFamily: "'Fira Code', monospace" }}>{item.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MULTI-TF TAB */}
            {tab === "multi-tf" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                  {[
                    { tf: "1W", trend: sig.weeklyMS.trend, rsi: null, label: "Weekly Macro" },
                    { tf: "1D", trend: sig.dailyMS.trend, rsi: sig.rsiD, label: "Daily Swing" },
                    { tf: "4H", trend: sig.ms.trend, rsi: null, label: "4H Structure" },
                    { tf: "1H", trend: sig.bos ? (sig.bos.type === "BULLISH" ? "BULLISH" : "BEARISH") : sig.ms.trend, rsi: sig.rsi, label: "1H Entry TF" },
                  ].map(item => {
                    const c = item.trend === "BULLISH" ? "#00dca0" : item.trend === "BEARISH" ? "#ff3c5a" : "#666";
                    return (
                      <div key={item.tf} style={{ background: "rgba(255,255,255,0.025)", borderRadius: 10, padding: "10px 13px", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: `${c}12`, border: `1px solid ${c}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 9, fontWeight: 900, color: c }}>{item.tf}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 11, fontWeight: 800, color: c }}>{item.trend}</div>
                        </div>
                        {item.rsi && (
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", marginBottom: 1 }}>RSI</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: item.rsi < 30 ? "#00dca0" : item.rsi > 70 ? "#ff3c5a" : "#888", fontFamily: "monospace" }}>{item.rsi}</div>
                          </div>
                        )}
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                      </div>
                    );
                  })}
                </div>

                {/* Confluence */}
                <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 10 }}>TIMEFRAME CONFLUENCE</div>
                  <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                    {[sig.weeklyMS.trend, sig.dailyMS.trend, sig.ms.trend].map((t, i) => {
                      const agree = t === (sig.direction === "BUY" ? "BULLISH" : "BEARISH");
                      return (
                        <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 9, background: agree ? (isBuy ? "rgba(0,220,160,0.1)" : "rgba(255,60,90,0.1)") : "rgba(255,255,255,0.02)", border: `1px solid ${agree ? col + "30" : "rgba(255,255,255,0.04)"}` }}>
                          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>{["1W", "1D", "4H"][i]}</div>
                          <div style={{ fontSize: 16 }}>{agree ? "✓" : "✗"}</div>
                          <div style={{ fontSize: 7, color: agree ? col : "#444", marginTop: 2 }}>{t.slice(0, 4)}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: 12, textAlign: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: sig.tfAgree === 3 ? "#00dca0" : sig.tfAgree === 2 ? "#ff9f0a" : "#ff3c5a" }}>
                      {sig.tfAgree}/3 timeframes aligned
                    </span>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>
                      {sig.tfAgree === 3 ? "Maximum confluence — highest probability setup" : sig.tfAgree === 2 ? "Partial confluence — trade with caution" : "Low confluence — avoid or wait"}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  MARKET HEATMAP
// ═══════════════════════════════════════════════════════
function Heatmap({ signals }) {
  if (!signals.length) return null;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: 1, marginBottom: 8 }}>MARKET HEATMAP</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
        {signals.map(sig => {
          const meta = PAIRS.find(p => p.s === sig.symbol);
          const col = sig.direction === "BUY" ? `rgba(0,220,160,${0.1 + sig.pct / 200})` : sig.direction === "SELL" ? `rgba(255,60,90,${0.1 + sig.pct / 200})` : "rgba(255,255,255,0.04)";
          const tc = sig.direction === "BUY" ? "#00dca0" : sig.direction === "SELL" ? "#ff3c5a" : "#555";
          return (
            <div key={sig.symbol} style={{ background: col, border: `1px solid ${tc}22`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: meta?.c, fontFamily: "'Barlow Condensed', sans-serif" }}>{meta?.t}</div>
              <div style={{ fontSize: 8, color: tc, fontWeight: 700, marginTop: 1 }}>{sig.direction === "NEUTRAL" ? "—" : sig.direction}</div>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{sig.pct}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prog, setProg] = useState({ n: 0, sym: "" });
  const [filter, setFilter] = useState("ACTIVE");
  const [sort, setSort] = useState("SCORE");
  const [view, setView] = useState("signals");
  const [lastUpdate, setLastUpdate] = useState(null);
  const timerRef = useRef(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setProg({ n: 0, sym: "" });
    const res = [];
    for (let i = 0; i < PAIRS.length; i++) {
      setProg({ n: i, sym: PAIRS[i].t });
      try { res.push(await analyze(PAIRS[i].s)); } catch {}
    }
    setSignals(res);
    setLastUpdate(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
    timerRef.current = setInterval(fetchAll, 5 * 60 * 1000);
    return () => clearInterval(timerRef.current);
  }, [fetchAll]);

  const stats = useMemo(() => ({
    buy: signals.filter(s => s.direction === "BUY").length,
    sell: signals.filter(s => s.direction === "SELL").length,
    strong: signals.filter(s => s.strength === "STRONG" && s.direction !== "NEUTRAL").length,
    avgConf: signals.length ? Math.round(signals.reduce((a, s) => a + s.confidence, 0) / signals.length) : 0,
    topPair: signals.sort ? [...signals].sort((a, b) => b.pct - a.pct)[0]?.symbol?.replace("USDT","") : "–",
  }), [signals]);

  const filtered = useMemo(() => {
    let list = [...signals];
    if (filter === "BUY") list = list.filter(s => s.direction === "BUY");
    else if (filter === "SELL") list = list.filter(s => s.direction === "SELL");
    else if (filter === "STRONG") list = list.filter(s => s.strength === "STRONG" && s.direction !== "NEUTRAL");
    else if (filter === "ACTIVE") list = list.filter(s => s.direction !== "NEUTRAL");
    if (sort === "SCORE") list.sort((a, b) => b.pct - a.pct);
    else if (sort === "RSI_OB") list.sort((a, b) => a.rsi - b.rsi);
    else if (sort === "CHANGE") list.sort((a, b) => Math.abs(b.change24) - Math.abs(a.change24));
    else if (sort === "CONFLUENCE") list.sort((a, b) => b.tfAgree - a.tfAgree);
    return list;
  }, [signals, filter, sort]);

  const pct = PAIRS.length ? Math.round((prog.n / PAIRS.length) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#080a12", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ANIMATED BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", left: "-30%", width: "90%", height: "90%", borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, rgba(0,220,160,0.025), transparent 60%)", animation: "drift 20s ease-in-out infinite alternate" }} />
        <div style={{ position: "absolute", bottom: "-40%", right: "-20%", width: "80%", height: "80%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,60,90,0.025), transparent 60%)", animation: "drift 25s ease-in-out infinite alternate-reverse" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 520, margin: "0 auto", padding: "0 13px 60px" }}>

        {/* HEADER */}
        <div style={{ padding: "22px 0 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,220,160,0.06)", border: "1px solid rgba(0,220,160,0.2)", borderRadius: 100, padding: "3px 10px 3px 7px", marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00dca0", display: "inline-block", boxShadow: "0 0 8px #00dca0", animation: "blink 1.5s infinite" }} />
                <span style={{ fontSize: 9, fontWeight: 800, color: "#00dca0", letterSpacing: 1.5 }}>LIVE · BINANCE</span>
              </div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 0.5, lineHeight: 1, background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.45) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                SMC ELITE
              </h1>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", marginTop: 2 }}>Institutional Smart Money · 5 Timeframe Analysis</div>
            </div>
            <div style={{ textAlign: "right" }}>
              {lastUpdate && <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>{lastUpdate.toLocaleTimeString()}</div>}
              <button onClick={fetchAll} disabled={loading} style={{ marginTop: 6, padding: "6px 12px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", cursor: loading ? "not-allowed" : "pointer", fontSize: 11, fontFamily: "inherit" }}>
                {loading ? "…" : "↻ Refresh"}
              </button>
            </div>
          </div>

          {/* STAT CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
            {[
              { l: "BUY", v: stats.buy, c: "#00dca0" },
              { l: "SELL", v: stats.sell, c: "#ff3c5a" },
              { l: "STRONG", v: stats.strong, c: "#ffd700" },
              { l: "CONF%", v: loading ? "–" : stats.avgConf, c: "#a78bfa" },
              { l: "TOP", v: loading ? "–" : stats.topPair, c: "#38bdf8" },
            ].map(s => (
              <div key={s.l} style={{ background: `${s.c}08`, border: `1px solid ${s.c}16`, borderRadius: 11, padding: "8px 4px", textAlign: "center" }}>
                <div style={{ fontSize: loading ? 14 : 18, fontWeight: 900, color: s.c, fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1.1 }}>{loading ? "–" : s.v}</div>
                <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.28)", letterSpacing: 0.5, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }}>
            {["ALL", "ACTIVE", "BUY", "SELL", "STRONG"].map(f => {
              const ac = f === "BUY" ? "#00dca0" : f === "SELL" ? "#ff3c5a" : f === "STRONG" ? "#ffd700" : "#fff";
              return (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: "5px 12px", borderRadius: 100, border: "none", cursor: "pointer",
                  fontSize: 9, fontWeight: 800, letterSpacing: 0.6, whiteSpace: "nowrap",
                  background: filter === f ? ac : "rgba(255,255,255,0.04)",
                  color: filter === f ? "#000" : "rgba(255,255,255,0.3)",
                  transition: "all 0.2s", fontFamily: "inherit",
                }}>{f}</button>
              );
            })}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)",
            borderRadius: 100, padding: "5px 10px", fontSize: 9, cursor: "pointer", outline: "none", fontFamily: "inherit",
          }}>
            <option value="SCORE">Score ↓</option>
            <option value="RSI_OB">RSI Oversold</option>
            <option value="CHANGE">Change ↓</option>
            <option value="CONFLUENCE">Confluence ↓</option>
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "52px 0" }}>
            <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 18px" }}>
              <svg width={90} height={90} style={{ position: "absolute", inset: 0 }}>
                <circle cx={45} cy={45} r={38} fill="none" stroke="rgba(0,220,160,0.07)" strokeWidth={5} />
                <circle cx={45} cy={45} r={38} fill="none" stroke="#00dca0" strokeWidth={5}
                  strokeDasharray="55 184" strokeLinecap="round"
                  style={{ transformOrigin: "45px 45px", animation: "spin 1.2s linear infinite", filter: "drop-shadow(0 0 6px #00dca0)" }} />
                <circle cx={45} cy={45} r={28} fill="none" stroke="rgba(255,60,90,0.1)" strokeWidth={3} />
                <circle cx={45} cy={45} r={28} fill="none" stroke="#ff3c5a" strokeWidth={3}
                  strokeDasharray="35 132" strokeLinecap="round"
                  style={{ transformOrigin: "45px 45px", animation: "spin 2s linear infinite reverse", filter: "drop-shadow(0 0 4px #ff3c5a)" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#00dca0", fontFamily: "'Barlow Condensed', sans-serif" }}>{pct}%</div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)" }}>ANALYZING</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>
              {prog.sym ? `SCANNING ${prog.sym}` : "INITIALIZING SMC ENGINE"}
            </div>
            <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.2)", marginBottom: 14 }}>
              1W · 1D · 4H · 1H · 15M · {PAIRS.length} pairs
            </div>
            <div style={{ width: 220, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, margin: "0 auto" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #00dca0, #00c490)", borderRadius: 2, transition: "width 0.4s", boxShadow: "0 0 8px #00dca060" }} />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
              {["Order Blocks", "FVG", "BOS", "CHoCH", "Liquidity", "Ichimoku", "Stochastic RSI"].map(t => (
                <span key={t} style={{ fontSize: 8, color: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)", padding: "2px 8px", borderRadius: 20 }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* SIGNALS */}
        {!loading && (
          <div>
            <Heatmap signals={signals} />
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>No signals match this filter</div>
                </div>
              ) : filtered.map((sig, i) => (
                <Card key={sig.symbol} sig={sig} meta={PAIRS.find(p => p.s === sig.symbol)} idx={i} />
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, textAlign: "center", fontSize: 9, color: "rgba(255,255,255,0.1)", lineHeight: 1.9 }}>
          1W · 1D · 4H · 1H · 15M Multi-Timeframe SMC Analysis<br />
          OB · FVG · BOS · CHoCH · Liquidity · MACD · RSI · StochRSI · Williams%R · Bollinger · Ichimoku<br />
          For educational purposes only · Not financial advice
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Fira+Code:wght@400;500;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(3%,2%)} }
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:0;height:0}
        button,select{font-family:inherit}
      `}</style>
    </div>
  );
}
