import { NextResponse } from "next/server";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"];

export async function GET() {
  try {
    const results = await Promise.all(
      SYMBOLS.map(async (symbol) => {
        const [tickerRes, klinesRes] = await Promise.all([
          fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`),
          fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=2`),
        ]);
        const ticker = await tickerRes.json();
        const klines = await klinesRes.json();
        const lastCandle = klines[klines.length - 1];
        const direction = parseFloat(lastCandle[4]) >= parseFloat(lastCandle[1]) ? "BUY" : "SELL";
        const price = parseFloat(ticker.lastPrice);
        const atr = (parseFloat(ticker.highPrice) - parseFloat(ticker.lowPrice)) * 0.3;
        return {
          symbol: symbol.replace("USDT", "/USDT"),
          rawSymbol: symbol,
          direction,
          entry: price,
          sl: direction === "BUY" ? +(price - atr).toFixed(4) : +(price + atr).toFixed(4),
          tp1: direction === "BUY" ? +(price + atr).toFixed(4) : +(price - atr).toFixed(4),
          tp2: direction === "BUY" ? +(price + atr * 2).toFixed(4) : +(price - atr * 2).toFixed(4),
          change24h: parseFloat(ticker.priceChangePercent),
          status: "Active",
          timestamp: new Date().toISOString(),
        };
      })
    );
    return NextResponse.json({ success: true, signals: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
