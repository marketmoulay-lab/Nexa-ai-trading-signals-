// 🔥 NEXA AI ULTIMATE (AI + Supabase + Telegram)

import { createClient } from "@supabase/supabase-js";

// =======================
// 🔌 SUPABASE
// =======================
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// =======================
// ⚙️ TELEGRAM
// =======================
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

// =======================
// 🧠 AI WEIGHTS
// =======================
let weights = {
  rsi: 2,
  macd: 1,
  change: 1,
  volume: 2,
  liquidity: 2,
  structure: 2,
  zone: 1
};

// =======================
// 📊 INDICATORS
// =======================
function rsi(closes: number[], p = 14): number {
  if (closes.length < p + 1) return 50;

  let g = 0, l = 0;
  for (let i = 1; i <= p; i++) {
    const d = closes[i] - closes[i - 1];
    if (d > 0) g += d;
    else l -= d;
  }

  g /= p;
  l /= p;

  if (l === 0) return 100;
  return 100 - 100 / (1 + g / l);
}

function ema(data: number[], p: number) {
  const k = 2 / (p + 1);
  let e = data[0];

  for (let i = 1; i < data.length; i++) {
    e = data[i] * k + e * (1 - k);
  }

  return e;
}

function macd(closes: number[]) {
  return ema(closes, 12) - ema(closes, 26);
}

// =======================
// 🐋 SMART MONEY
// =======================
function liquiditySweep(closes: number[]) {
  const last = closes[closes.length - 1];
  const high = Math.max(...closes.slice(-20));
  const low = Math.min(...closes.slice(-20));

  if (last > high) return "SWEEP_HIGH";
  if (last < low) return "SWEEP_LOW";
  return "NONE";
}

function bos(closes: number[]) {
  const last = closes[closes.length - 1];
  const prev = closes[closes.length - 5];

  if (last > prev) return "BULLISH_BOS";
  if (last < prev) return "BEARISH_BOS";
  return "RANGE";
}

function zone(closes: number[]) {
  const avg =
    closes.slice(-20).reduce((a, b) => a + b, 0) / 20;

  const last = closes[closes.length - 1];

  if (last < avg) return "DEMAND_ZONE";
  if (last > avg) return "SUPPLY_ZONE";
  return "NEUTRAL";
}

// =======================
// 🤖 AI ENGINE
// =======================
function aiScore(data: any) {
  let score = 0;

  if (data.rsi < 30) score += weights.rsi;
  if (data.rsi > 70) score -= weights.rsi;

  score += data.macd > 0 ? weights.macd : -weights.macd;
  score += data.change > 0 ? weights.change : -weights.change;

  if (data.volume > 1e9) score += weights.volume;

  if (data.liq === "SWEEP_LOW") score += weights.liquidity;
  if (data.liq === "SWEEP_HIGH") score -= weights.liquidity;

  if (data.bos === "BULLISH_BOS") score += weights.structure;
  if (data.bos === "BEARISH_BOS") score -= weights.structure;

  if (data.zone === "DEMAND_ZONE") score += weights.zone;
  if (data.zone === "SUPPLY_ZONE") score -= weights.zone;

  return score;
}

function decision(score: number) {
  if (score >= 6) return "🚀 STRONG BUY";
  if (score >= 3) return "BUY";
  if (score <= -6) return "🔻 STRONG SELL";
  if (score <= -3) return "SELL";
  return "HOLD";
}

// =======================
// 📡 DATA
// =======================
async function getCloses(symbol: string) {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=100`
  );
  const data = await res.json();
  return data.map((k: any) => parseFloat(k[4]));
}

async function getCG(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
  );
  const data = await res.json();
  return data[0];
}

// =======================
// 📲 TELEGRAM
// =======================
async function sendTelegram(msg: string) {
  if (!TELEGRAM_BOT_TOKEN) return;

  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: msg
      })
    }
  );
}

// =======================
// 🧠 TRAIN AI
// =======================
async function trainAI() {
  const { data } = await supabase
    .from("signals")
    .select("*")
    .not("result", "is", null)
    .limit(50);

  if (!data) return;

  data.forEach((t) => {
    if (t.result === "WIN") {
      weights.rsi += 0.05;
    }
    if (t.result === "LOSS") {
      weights.rsi -= 0.05;
    }
  });
}

// =======================
// 🚀 MAIN
// =======================
export async function GET() {
  try {
    await trainAI();

    const coins = [
      { s: "BTCUSDT", id: "bitcoin" },
      { s: "ETHUSDT", id: "ethereum" }
    ];

    const results = await Promise.all(
      coins.map(async (c) => {
        const [closes, cg] = await Promise.all([
          getCloses(c.s),
          getCG(c.id)
        ]);

        const r = rsi(closes);
        const m = macd(closes);

        const liq = liquiditySweep(closes);
        const b = bos(closes);
        const z = zone(closes);

        const score = aiScore({
          rsi: r,
          macd: m,
          change: cg.price_change_percentage_24h,
          volume: cg.total_volume,
          liq,
          bos: b,
          zone: z
        });

        const sig = decision(score);

        // 💾 SAVE
        await supabase.from("signals").insert({
          pair: c.s,
          rsi: r,
          macd: m,
          change: cg.price_change_percentage_24h,
          volume: cg.total_volume,
          signal: sig,
          result: null
        });

        return {
          pair: c.s,
          price: cg.current_price,
          signal: sig,
          score
        };
      })
    );

    // 📲 TELEGRAM
    await sendTelegram(
      results.map(r => `${r.pair} → ${r.signal}`).join("\n")
    );

    return Response.json({ signals: results });

  } catch (e) {
    return Response.json({ error: "ERROR" }, { status: 500 });
  }
}
