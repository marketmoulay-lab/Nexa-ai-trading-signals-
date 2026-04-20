import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple&order=market_cap_desc",
      { headers: { "Accept": "application/json" }, cache: "no-store" }
    );
    const coins = await res.json();

    const signals = coins.map((coin: any) => {
      const price = coin.current_price;
      const change = coin.price_change_percentage_24h ?? 0;
      const high = coin.high_24h ?? price;
      const low = coin.low_24h ?? price;
      const atr = (high - low) * 0.3;
      const direction: "BUY" | "SELL" = change >= 0 ? "BUY" : "SELL";
      return {
        symbol: coin.symbol.toUpperCase() + "/USDT",
        rawSymbol: coin.id,
        direction,
        entry: price,
        sl: direction === "BUY" ? +(price - atr).toFixed(4) : +(price + atr).toFixed(4),
        tp1: direction === "BUY" ? +(price + atr).toFixed(4) : +(price - atr).toFixed(4),
        tp2: direction === "BUY" ? +(price + atr * 2).toFixed(4) : +(price - atr * 2).toFixed(4),
        change24h: change,
        status: "Active",
        timestamp: new Date().toISOString(),
      };
    });

    return NextResponse.json({ success: true, signals });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
