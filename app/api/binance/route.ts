import { NextResponse } from "next/server";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"];

export async function GET() {
  try {
    const results = await Promise.all(
      SYMBOLS.map(async (symbol) => {
        const tickerRes = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
        );
        const ticker = await tickerRes.json();
        const price = parseFloat(ticker.lastPrice);
        const high = parseFloat(ticker.highPrice);
        const low = parseFloat(ticker.lowPrice);
        const change = parseFloat(ticker.priceChangePercent);
        const atr = (high - low) * 0.3;
        const direction: "BUY" | "SELL" = change >= 0 ? "BUY" : "SELL";
        return {
          symbol: symbol.replace("USDT", "/USDT"),
          rawSymbol: symbol,
          direction,
          entry: price,
          sl: direction === "BUY" ? +(price - atr).toFixed(4) : +(price + atr).toFixed(4),
          tp1: direction === "BUY" ? +(price + atr).toFixed(4) : +(price - atr).toFixed(4),
          tp2: direction === "BUY" ? +(price + atr * 2).toFixed(4) : +(price - atr * 2).toFixed(4),
          change24h: change,
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
