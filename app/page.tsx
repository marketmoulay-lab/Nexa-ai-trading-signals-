"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════
//  PAIR METADATA (UI only — no logic)
// ═══════════════════════════════════════════════════════
const PAIR_META: Record<string, { n: string; t: string; c: string; cat: string }> = {
  BTCUSDT:   { n: "Bitcoin",   t: "BTC",  c: "#f7931a", cat: "MAJOR" },
  ETHUSDT:   { n: "Ethereum",  t: "ETH",  c: "#627eea", cat: "MAJOR" },
  SOLUSDT:   { n: "Solana",    t: "SOL",  c: "#9945ff", cat: "ALT"   },
  BNBUSDT:   { n: "BNB",       t: "BNB",  c: "#f0b90b", cat: "MAJOR" },
  XRPUSDT:   { n: "XRP",       t: "XRP",  c: "#00aae4", cat: "ALT"   },
  ADAUSDT:   { n: "Cardano",   t: "ADA",  c: "#3cc8c8", cat: "ALT"   },
  DOGEUSDT:  { n: "Dogecoin",  t: "DOGE", c: "#c2a633", cat: "MEME"  },
  AVAXUSDT:  { n: "Avalanche", t: "AVAX", c: "#e84142", cat: "ALT"   },
  LINKUSDT:  { n: "Chainlink", t: "LINK", c: "#2a5ada", cat: "ALT"   },
  MATICUSDT: { n: "Polygon",   t: "MATIC",c: "#8247e5", cat: "ALT"   },
};

// ═══════════════════════════════════════════════════════
//  SPARKLINE CANVAS
// ═══════════════════════════════════════════════════════
function Sparkline({
  data, color, w = 80, h = 24, fill = true,
}: {
  data: number[]; color: string;
  w?: number; h?: number; fill?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!data?.length || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
    const pts = data.map((v, i) => [
      (i / (data.length - 1)) * w,
      h - ((v - mn) / rng) * h * 0.88 - h * 0.06,
    ]);
    if (fill) {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, color + "44"); g.addColorStop(1, "transparent");
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
      ctx.fillStyle = g; ctx.fill();
    }
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.strokeStyle = color; ctx.lineWidth = 1.5;
    ctx.lineJoin = "round"; ctx.stroke();
    const [lx, ly] = pts[pts.length - 1];
    ctx.beginPath(); ctx.arc(lx, ly, 2, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
  }, [data, color, w, h, fill]);
  return <canvas ref={ref} style={{ display: "block" }} />;
}

// ═══════════════════════════════════════════════════════
//  RADIAL SCORE RING
// ═══════════════════════════════════════════════════════
function ScoreRing({
  pct, direction, size = 50,
}: {
  pct: number; direction: string; size?: number;
}) {
  const r = size * 0.38, circ = 2 * Math.PI * r;
  const fill = (pct / 100) * circ;
  const cx = size / 2, cy = size / 2;
  const col =
    direction === "BUY" ? "#00dca0" :
    direction === "SELL" ? "#ff3c5a" : "#555";
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={col} strokeWidth={4}
        strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 4px ${col}99)`,
          transition: "stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)",
        }} />
      <text
        x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
        fill={col} fontSize={size * 0.22} fontWeight="800"
        fontFamily="monospace"
        style={{ transform: `rotate(90deg)`, transformOrigin: `${cx}px ${cy}px` }}>
        {pct}
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  GAUGE
// ═══════════════════════════════════════════════════════
function Gauge({
  value, label, color,
}: {
  value: number; label: string; color: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  const angle = -140 + pct * 2.8;
  const rad = (angle * Math.PI) / 180;
  const cx = 40, cy = 38, r = 28;
  const nx = cx + r * Math.cos(rad), ny = cy + r * Math.sin(rad);
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={80} height={56} viewBox="0 0 80 56">
        <path
          d={`M ${cx - r * Math.cos((40 * Math.PI) / 180)} ${cy + r * Math.sin((40 * Math.PI) / 180)} A ${r} ${r} 0 1 1 ${cx + r * Math.cos((40 * Math.PI) / 180)} ${cy + r * Math.sin((40 * Math.PI) / 180)}`}
          fill="none" stroke="rgba(255,255,255,0.07)"
          strokeWidth={5} strokeLinecap="round" />
        <path
          d={`M ${cx - r * Math.cos((40 * Math.PI) / 180)} ${cy + r * Math.sin((40 * Math.PI) / 180)} A ${r} ${r} 0 1 1 ${nx} ${ny}`}
          fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
        <text x={cx} y={cy + 2} textAnchor="middle"
          fill={color} fontSize={11} fontWeight="800" fontFamily="monospace">
          {Math.round(value)}
        </text>
      </svg>
      <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.28)", marginTop: -6, letterSpacing: 0.4 }}>
        {label}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  HEATMAP
// ═══════════════════════════════════════════════════════
function Heatmap({ signals }: { signals: any[] }) {
  if (!signals.length) return null;
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", letterSpacing: 1, marginBottom: 7 }}>
        MARKET HEATMAP
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
        {signals.map((sig) => {
          const meta = PAIR_META[sig.symbol];
          const col =
            sig.direction === "BUY" ? `rgba(0,220,160,${0.08 + sig.pct / 220})`
            : sig.direction === "SELL" ? `rgba(255,60,90,${0.08 + sig.pct / 220})`
            : "rgba(255,255,255,0.03)";
          const tc =
            sig.direction === "BUY" ? "#00dca0" :
            sig.direction === "SELL" ? "#ff3c5a" : "#444";
          return (
            <div key={sig.symbol} style={{
              background: col, border: `1px solid ${tc}22`,
              borderRadius: 9, padding: "7px 4px", textAlign: "center",
            }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: meta?.c, fontFamily: "'Barlow Condensed', sans-serif" }}>
                {meta?.t}
              </div>
              <div style={{ fontSize: 8, color: tc, fontWeight: 700, marginTop: 1 }}>
                {sig.direction === "NEUTRAL" ? "—" : sig.direction}
              </div>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", marginTop: 1 }}>
                {sig.pct}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  SIGNAL CARD
// ═══════════════════════════════════════════════════════
function SignalCard({ sig }: { sig: any }) {
  const [tab, setTab] = useState("smc");
  const [open, setOpen] = useState(false);
  const meta = PAIR_META[sig.symbol] || { n: sig.symbol, t: "?", c: "#888", cat: "" };

  const isBuy = sig.direction === "BUY";
  const isSell = sig.direction === "SELL";
  const col = isBuy ? "#00dca0" : isSell ? "#ff3c5a" : "#555";
  const colDim = col + "1e";
  const strCol =
    sig.strength === "STRONG" ? "#ffd700" :
    sig.strength === "MEDIUM" ? "#ff9f0a" : "#444";

  const fmt = (v: any): string => {
    if (v === null || v === undefined) return "–";
    const n = +v;
    if (isNaN(n)) return String(v);
    if (n > 999_999) return (n / 1e6).toFixed(2) + "M";
    if (n > 9_999) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (n > 100) return n.toFixed(2);
    if (n > 1) return n.toFixed(4);
    return n.toFixed(6);
  };

  const concepts = [
    { k: "BOS",    on: !!sig.bos,          c: sig.bos?.type === "BULLISH" ? "#00dca0" : "#ff3c5a" },
    { k: "CHoCH",  on: !!sig.choch,         c: sig.choch === "BULLISH" ? "#00dca0" : "#ff3c5a" },
    { k: `OB×${sig.obs?.length ?? 0}`, on: (sig.obs?.length ?? 0) > 0, c: "#a78bfa" },
    { k: `FVG×${sig.fvgs?.length ?? 0}`, on: (sig.fvgs?.length ?? 0) > 0, c: "#38bdf8" },
    { k: `LIQ×${sig.liq?.swept?.length ?? 0}`, on: (sig.liq?.swept?.length ?? 0) > 0, c: "#fb923c" },
    { k: "ENGULF", on: !!sig.engulf,        c: sig.engulf === "BULLISH" ? "#00dca0" : "#ff3c5a" },
    { k: "INST",   on: !!sig.instCandle,    c: "#ffd700" },
    { k: sig.ichimoku?.bias ?? "–", on: sig.ichimoku?.bias !== "NEUTRAL", c: sig.ichimoku?.bias === "BULLISH" ? "#00dca0" : "#ff3c5a" },
  ];

  const TABS = ["smc", "levels", "indicators", "multi-tf"];

  return (
    <div style={{
      borderRadius: 18, overflow: "hidden",
      background: "linear-gradient(145deg,rgba(13,15,24,.97),rgba(9,11,19,.99))",
      border: `1px solid ${open ? col + "35" : "rgba(255,255,255,0.055)"}`,
      boxShadow: open ? `0 10px 40px ${col}12` : "none",
      transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
    }}>
      {/* TOP ACCENT */}
      <div style={{ height: 2, background: `linear-gradient(90deg,${col},${meta.c}80,transparent)` }} />

      {/* HEADER */}
      <div onClick={() => setOpen(!open)} style={{
        padding: "13px 15px 10px", cursor: "pointer",
        display: "flex", gap: 11, alignItems: "center",
      }}>
        {/* Coin badge */}
        <div style={{
          width: 42, height: 42, borderRadius: 13,
          background: `${meta.c}12`, border: `1px solid ${meta.c}28`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: meta.c, fontFamily: "'Barlow Condensed',sans-serif", lineHeight: 1 }}>{meta.t}</span>
          <span style={{ fontSize: 7, color: meta.c + "66", letterSpacing: 0.2 }}>{meta.cat}</span>
        </div>

        {/* Name + badges */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif" }}>{meta.n}</span>
            {sig.direction !== "NEUTRAL" && (
              <span style={{ fontSize: 9, fontWeight: 800, color: col, background: colDim, border: `1px solid ${col}35`, borderRadius: 5, padding: "1px 6px", letterSpacing: 0.8 }}>
                {sig.direction}
              </span>
            )}
            <span style={{ fontSize: 8, color: strCol, fontWeight: 700 }}>
              {sig.strength === "STRONG" ? "◆◆◆" : sig.strength === "MEDIUM" ? "◆◆◇" : "◆◇◇"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.75)", fontFamily: "'Fira Code',monospace" }}>
              ${fmt(sig.price)}
            </span>
            <span style={{ fontSize: 10, color: sig.change24 >= 0 ? "#00dca0" : "#ff3c5a", fontWeight: 700 }}>
              {sig.change24 >= 0 ? "▲" : "▼"}{Math.abs(sig.change24)}%
            </span>
            <span style={{ fontSize: 8.5, color: sig.premDisc === "DISCOUNT" ? "#00dca0" : sig.premDisc === "PREMIUM" ? "#ff3c5a" : "#666", background: "rgba(255,255,255,.04)", padding: "1px 5px", borderRadius: 4 }}>
              {sig.premDisc}
            </span>
          </div>
        </div>

        {/* Score + spark */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <ScoreRing pct={sig.pct} direction={sig.direction} size={50} />
          <Sparkline data={sig.spark || []} color={col} w={60} h={16} fill={false} />
        </div>
      </div>

      {/* CONCEPTS STRIP */}
      <div style={{ paddingInline: 15, paddingBottom: 10, display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
        {concepts.map((t) => (
          <span key={t.k} style={{
            fontSize: 8.5, fontWeight: 700, letterSpacing: 0.4,
            padding: "2px 7px", borderRadius: 20,
            background: t.on ? `${t.c}14` : "rgba(255,255,255,.025)",
            color: t.on ? t.c : "rgba(255,255,255,.15)",
            border: `1px solid ${t.on ? t.c + "38" : "transparent"}`,
          }}>{t.k}</span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 8.5, color: "rgba(255,255,255,.18)" }}>
          {sig.confidence}% conf · RSI {sig.rsi}
        </span>
      </div>

      {/* EXPANDED */}
      {open && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
          {/* TABS */}
          <div style={{ display: "flex", background: "rgba(0,0,0,.25)", overflowX: "auto" }}>
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "9px 4px", border: "none", cursor: "pointer",
                fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                textTransform: "uppercase", whiteSpace: "nowrap",
                background: tab === t ? "rgba(255,255,255,.05)" : "transparent",
                color: tab === t ? col : "rgba(255,255,255,.28)",
                borderBottom: `2px solid ${tab === t ? col : "transparent"}`,
                transition: "all .2s", fontFamily: "inherit",
              }}>{t}</button>
            ))}
          </div>

          <div style={{ padding: 14 }}>

            {/* ── SMC TAB ── */}
            {tab === "smc" && (
              <div>
                {/* Bull/Bear bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, marginBottom: 5 }}>
                    <span style={{ color: "#00dca0", fontWeight: 700 }}>◀ BULL {sig.scoring?.bull}pts</span>
                    <span style={{ color: "#888", fontSize: 8 }}>
                      {(sig.scoring?.bull ?? 0) > (sig.scoring?.bear ?? 0)
                        ? `+${(sig.scoring?.bull ?? 0) - (sig.scoring?.bear ?? 0)} bull edge`
                        : (sig.scoring?.bear ?? 0) > (sig.scoring?.bull ?? 0)
                        ? `+${(sig.scoring?.bear ?? 0) - (sig.scoring?.bull ?? 0)} bear edge`
                        : "neutral"}
                    </span>
                    <span style={{ color: "#ff3c5a", fontWeight: 700 }}>BEAR {sig.scoring?.bear}pts ▶</span>
                  </div>
                  <div style={{ height: 7, borderRadius: 4, background: "#ff3c5a22", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${((sig.scoring?.bull ?? 0) / ((sig.scoring?.bull ?? 0) + (sig.scoring?.bear ?? 1))) * 100}%`,
                      background: "linear-gradient(90deg,#00dca0,#00dca088)",
                      borderRadius: 4, transition: "width .9s cubic-bezier(.4,0,.2,1)",
                    }} />
                  </div>
                </div>

                {/* SMC grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                  {[
                    { l: "4H Structure", v: sig.ms?.trend, c: sig.ms?.trend === "BULLISH" ? "#00dca0" : sig.ms?.trend === "BEARISH" ? "#ff3c5a" : "#888" },
                    { l: "BOS", v: sig.bos ? `${sig.bos.type?.slice(0, 4)} @ $${fmt(sig.bos.level)}` : "None", c: sig.bos ? col : "#444" },
                    { l: "CHoCH", v: sig.choch || "None", c: sig.choch ? "#ffd700" : "#444" },
                    { l: "Premium/Discount", v: sig.premDisc, c: sig.premDisc === "DISCOUNT" ? "#00dca0" : sig.premDisc === "PREMIUM" ? "#ff3c5a" : "#888" },
                    { l: "Liq. Swept", v: sig.liq?.swept?.length > 0 ? sig.liq.swept.map((s: any) => s.type).join(", ") : "None", c: sig.liq?.swept?.length ? "#fb923c" : "#444" },
                    { l: "Engulfing", v: sig.engulf || "None", c: sig.engulf === "BULLISH" ? "#00dca0" : sig.engulf === "BEARISH" ? "#ff3c5a" : "#444" },
                    { l: "Inst. Candle", v: sig.instCandle ? "Detected" : "None", c: sig.instCandle ? "#ffd700" : "#444" },
                    { l: "Cloud Bias", v: sig.ichimoku?.bias, c: sig.ichimoku?.bias === "BULLISH" ? "#00dca0" : sig.ichimoku?.bias === "BEARISH" ? "#ff3c5a" : "#888" },
                  ].map((item) => (
                    <div key={item.l} style={{ background: "rgba(255,255,255,.025)", borderRadius: 9, padding: "9px 11px" }}>
                      <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.28)", letterSpacing: 0.3, marginBottom: 3 }}>{item.l}</div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: item.c, fontFamily: "'Fira Code',monospace", wordBreak: "break-all" }}>{item.v}</div>
                    </div>
                  ))}
                </div>

                {/* OB list */}
                {(sig.obs?.length ?? 0) > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,.28)", letterSpacing: 1, marginBottom: 6 }}>ORDER BLOCKS</div>
                    {sig.obs.slice(0, 3).map((ob: any, i: number) => (
                      <div key={i} style={{
                        display: "flex", gap: 8, alignItems: "center",
                        padding: "7px 10px", marginBottom: 5, borderRadius: 8,
                        background: ob.type === "BULLISH" ? "rgba(0,220,160,.06)" : "rgba(255,60,90,.06)",
                      }}>
                        <span style={{ fontSize: 9, fontWeight: 800, color: ob.type === "BULLISH" ? "#00dca0" : "#ff3c5a", width: 28 }}>
                          {ob.type === "BULLISH" ? "▲" : "▼"} OB
                        </span>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,.4)", fontFamily: "'Fira Code',monospace", flex: 1 }}>
                          ${fmt(ob.l)} – ${fmt(ob.h)}
                        </span>
                        <div style={{ display: "flex", gap: 1 }}>
                          {Array.from({ length: Math.min(5, Math.round(ob.strength)) }).map((_, j) => (
                            <div key={j} style={{ width: 3, height: 10, background: ob.type === "BULLISH" ? "#00dca0" : "#ff3c5a", borderRadius: 1, opacity: 0.65 }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── LEVELS TAB ── */}
            {tab === "levels" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {[
                    { l: "🎯 Entry", v: sig.price, c: "#fff", bg: "rgba(255,255,255,.04)", sub: `ATR ${sig.atr}` },
                    { l: "🛑 Stop Loss", v: sig.sl, c: "#ff3c5a", bg: "rgba(255,60,90,.06)", sub: `-${sig.slPct}%` },
                    { l: "✅ TP1  1.2R", v: sig.tp1, c: "#00dca0", bg: "rgba(0,220,160,.04)", sub: "25% size" },
                    { l: "✅ TP2  " + sig.rr2 + "R", v: sig.tp2, c: "#00dca0", bg: "rgba(0,220,160,.06)", sub: "35% size" },
                    { l: "🚀 TP3  " + sig.rr3 + "R", v: sig.tp3, c: "#ffd700", bg: "rgba(255,215,0,.05)", sub: "25% size" },
                    { l: "💎 TP4  MAX", v: sig.tp4, c: "#e879f9", bg: "rgba(232,121,249,.05)", sub: "15% size" },
                  ].map((item) => (
                    <div key={item.l} style={{
                      background: item.bg, borderRadius: 11, padding: "11px 13px",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,.38)", marginBottom: 2 }}>{item.l}</div>
                        <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.18)" }}>{item.sub}</div>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 900, color: item.c, fontFamily: "'Fira Code',monospace" }}>
                        ${fmt(item.v)}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
                  {[
                    { l: "RR (TP2)", v: `1:${sig.rr2}`, c: "#ffd700" },
                    { l: "WIN PROB", v: `${sig.confidence}%`, c: col },
                    { l: "TF ALIGN", v: `${sig.tfAgree}/3`, c: sig.tfAgree === 3 ? "#00dca0" : sig.tfAgree === 2 ? "#ff9f0a" : "#ff3c5a" },
                  ].map((item) => (
                    <div key={item.l} style={{ background: "rgba(255,255,255,.025)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.28)", marginBottom: 4 }}>{item.l}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: item.c, fontFamily: "'Barlow Condensed',sans-serif" }}>{item.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── INDICATORS TAB ── */}
            {tab === "indicators" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {/* Gauges */}
                <div style={{ display: "flex", justifyContent: "space-around", background: "rgba(255,255,255,.02)", borderRadius: 12, padding: "10px 6px" }}>
                  <Gauge value={sig.rsi} label="RSI 1H" color={sig.rsi < 30 ? "#00dca0" : sig.rsi > 70 ? "#ff3c5a" : "#888"} />
                  <Gauge value={sig.rsiD} label="RSI 1D" color={sig.rsiD < 30 ? "#00dca0" : sig.rsiD > 70 ? "#ff3c5a" : "#888"} />
                  <Gauge value={sig.stoch?.k ?? 50} label="StochRSI" color={sig.stoch?.k < 20 ? "#00dca0" : sig.stoch?.k > 80 ? "#ff3c5a" : "#888"} />
                  <Gauge value={100 + (sig.willR ?? -50)} label="%R" color={sig.willR < -80 ? "#00dca0" : sig.willR > -20 ? "#ff3c5a" : "#888"} />
                </div>

                {/* MACD */}
                <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.38)", fontWeight: 700 }}>MACD (12,26,9)</span>
                    <span style={{ fontSize: 8.5, color: sig.macd?.trend === "UP" ? "#00dca0" : "#ff3c5a", background: sig.macd?.trend === "UP" ? "rgba(0,220,160,.1)" : "rgba(255,60,90,.1)", padding: "2px 8px", borderRadius: 5 }}>
                      {sig.macd?.trend === "UP" ? "▲ UP" : "▼ DOWN"}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                    {[
                      { l: "MACD", v: sig.macd?.macd?.toFixed(4), c: (sig.macd?.macd ?? 0) > 0 ? "#00dca0" : "#ff3c5a" },
                      { l: "Signal", v: sig.macd?.signal?.toFixed(4), c: "#888" },
                      { l: "Hist", v: sig.macd?.hist?.toFixed(4), c: (sig.macd?.hist ?? 0) > 0 ? "#00dca0" : "#ff3c5a" },
                    ].map((item) => (
                      <div key={item.l} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,.22)", marginBottom: 3 }}>{item.l}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: item.c, fontFamily: "'Fira Code',monospace" }}>{item.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bollinger */}
                <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.38)", fontWeight: 700, marginBottom: 8 }}>Bollinger Bands (20,2)</div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, marginBottom: 5 }}>
                      <span style={{ color: "#00dca0" }}>Lower ${fmt(sig.bb?.lower)}</span>
                      <span style={{ color: "#888" }}>{((sig.bb?.pctB ?? 0) * 100).toFixed(0)}%B</span>
                      <span style={{ color: "#ff3c5a" }}>Upper ${fmt(sig.bb?.upper)}</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,.06)", position: "relative" }}>
                      <div style={{
                        position: "absolute",
                        left: `${Math.min(100, (sig.bb?.pctB ?? 0.5) * 100)}%`,
                        top: -2, width: 9, height: 9, borderRadius: "50%",
                        background: col, transform: "translateX(-50%)",
                        boxShadow: `0 0 6px ${col}`,
                      }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.22)" }}>
                    BW: {((sig.bb?.bw ?? 0) * 100).toFixed(2)}% · Mid: ${fmt(sig.bb?.mid)}
                  </div>
                </div>

                {/* Ichimoku */}
                <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.38)", fontWeight: 700 }}>Ichimoku Cloud</span>
                    <span style={{ fontSize: 9.5, fontWeight: 800, color: sig.ichimoku?.bias === "BULLISH" ? "#00dca0" : sig.ichimoku?.bias === "BEARISH" ? "#ff3c5a" : "#888" }}>
                      {sig.ichimoku?.aboveCloud ? "ABOVE" : sig.ichimoku?.belowCloud ? "BELOW" : "INSIDE"} CLOUD
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 9 }}>
                    {[
                      { l: "Tenkan-sen", v: `$${fmt(sig.ichimoku?.tenkan)}` },
                      { l: "Kijun-sen",  v: `$${fmt(sig.ichimoku?.kijun)}` },
                    ].map((item) => (
                      <div key={item.l}>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,.22)", marginBottom: 2 }}>{item.l}</div>
                        <div style={{ fontSize: 10, color: "#aaa", fontFamily: "'Fira Code',monospace" }}>{item.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── MULTI-TF TAB ── */}
            {tab === "multi-tf" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                  {[
                    { tf: "1W", trend: sig.weeklyMS?.trend, rsi: null,     label: "Weekly Macro" },
                    { tf: "1D", trend: sig.dailyMS?.trend,  rsi: sig.rsiD, label: "Daily Swing"  },
                    { tf: "4H", trend: sig.ms?.trend,       rsi: null,     label: "4H Structure" },
                    { tf: "1H", trend: sig.bos?.type === "BULLISH" ? "BULLISH" : sig.bos?.type === "BEARISH" ? "BEARISH" : sig.ms?.trend, rsi: sig.rsi, label: "1H Entry" },
                  ].map((item) => {
                    const c = item.trend === "BULLISH" ? "#00dca0" : item.trend === "BEARISH" ? "#ff3c5a" : "#555";
                    return (
                      <div key={item.tf} style={{ background: "rgba(255,255,255,.025)", borderRadius: 10, padding: "10px 13px", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: `${c}12`, border: `1px solid ${c}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 9, fontWeight: 900, color: c }}>{item.tf}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.28)", marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 11, fontWeight: 800, color: c }}>{item.trend ?? "–"}</div>
                        </div>
                        {item.rsi !== null && (
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 8, color: "rgba(255,255,255,.22)", marginBottom: 1 }}>RSI</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: (item.rsi as number) < 30 ? "#00dca0" : (item.rsi as number) > 70 ? "#ff3c5a" : "#888", fontFamily: "monospace" }}>
                              {item.rsi}
                            </div>
                          </div>
                        )}
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                      </div>
                    );
                  })}
                </div>

                {/* Confluence */}
                <div style={{ background: "rgba(255,255,255,.02)", borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,.28)", letterSpacing: 1, marginBottom: 10 }}>TIMEFRAME CONFLUENCE</div>
                  <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                    {[sig.weeklyMS?.trend, sig.dailyMS?.trend, sig.ms?.trend].map((t, i) => {
                      const agree = t === (isBuy ? "BULLISH" : "BEARISH");
                      return (
                        <div key={i} style={{
                          flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 9,
                          background: agree ? (isBuy ? "rgba(0,220,160,.1)" : "rgba(255,60,90,.1)") : "rgba(255,255,255,.02)",
                          border: `1px solid ${agree ? col + "30" : "rgba(255,255,255,.04)"}`,
                        }}>
                          <div style={{ fontSize: 8, color: "rgba(255,255,255,.28)", marginBottom: 3 }}>{["1W","1D","4H"][i]}</div>
                          <div style={{ fontSize: 16 }}>{agree ? "✓" : "✗"}</div>
                          <div style={{ fontSize: 7, color: agree ? col : "#444", marginTop: 2 }}>{(t || "–").slice(0, 4)}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: 12, textAlign: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: sig.tfAgree === 3 ? "#00dca0" : sig.tfAgree === 2 ? "#ff9f0a" : "#ff3c5a" }}>
                      {sig.tfAgree}/3 timeframes aligned
                    </span>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,.22)", marginTop: 3 }}>
                      {sig.tfAgree === 3 ? "Maximum confluence — highest probability"
                        : sig.tfAgree === 2 ? "Partial confluence — trade with caution"
                        : "Low confluence — wait for better setup"}
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
//  PAGE COMPONENT
// ═══════════════════════════════════════════════════════
export default function SignalsPage() {
  const [signals, setSignals] = useState<any[]>([]);
  const [meta, setMeta]       = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [filter, setFilter]   = useState("ACTIVE");
  const [sort, setSort]       = useState("SCORE");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("/api/binance", { cache: "no-store" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "API error");
      setSignals(data.signals);
      setMeta(data.meta);
      setLastUpdate(new Date());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, [load]);

  const filtered = useMemo(() => {
    let list = [...signals];
    if (filter === "BUY")    list = list.filter((s) => s.direction === "BUY");
    else if (filter === "SELL")   list = list.filter((s) => s.direction === "SELL");
    else if (filter === "STRONG") list = list.filter((s) => s.strength === "STRONG" && s.direction !== "NEUTRAL");
    else if (filter === "ACTIVE") list = list.filter((s) => s.direction !== "NEUTRAL");
    if (sort === "SCORE")       list.sort((a, b) => b.pct - a.pct);
    else if (sort === "RSI")    list.sort((a, b) => a.rsi - b.rsi);
    else if (sort === "CHANGE") list.sort((a, b) => Math.abs(b.change24) - Math.abs(a.change24));
    else if (sort === "CONFLUENCE") list.sort((a, b) => b.tfAgree - a.tfAgree);
    return list;
  }, [signals, filter, sort]);

  return (
    <div style={{ minHeight: "100vh", background: "#080a12", color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>

      {/* BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", left: "-30%", width: "90%", height: "90%", borderRadius: "50%", background: "radial-gradient(circle at 40% 40%,rgba(0,220,160,.025),transparent 60%)", animation: "drift 22s ease-in-out infinite alternate" }} />
        <div style={{ position: "absolute", bottom: "-40%", right: "-20%", width: "80%", height: "80%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,60,90,.025),transparent 60%)", animation: "drift 28s ease-in-out infinite alternate-reverse" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 520, margin: "0 auto", padding: "0 13px 60px" }}>

        {/* HEADER */}
        <div style={{ padding: "22px 0 14px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,220,160,.06)", border: "1px solid rgba(0,220,160,.2)", borderRadius: 100, padding: "3px 10px 3px 7px", marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00dca0", display: "inline-block", boxShadow: "0 0 8px #00dca0", animation: "blink 1.5s infinite" }} />
                <span style={{ fontSize: 9, fontWeight: 800, color: "#00dca0", letterSpacing: 1.5 }}>LIVE · BINANCE</span>
              </div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: 0.5, lineHeight: 1, background: "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.4) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                SMC ELITE
              </h1>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.2)", marginTop: 3 }}>
                Smart Money · 5 Timeframe · 10 Pairs
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              {lastUpdate && <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.18)", marginBottom: 5 }}>{lastUpdate.toLocaleTimeString()}</div>}
              <button onClick={load} disabled={loading} style={{
                padding: "6px 13px", borderRadius: 100,
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.04)",
                color: "rgba(255,255,255,.4)",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 11, fontFamily: "inherit",
              }}>
                {loading ? "…" : "↻ Refresh"}
              </button>
            </div>
          </div>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
            {[
              { l: "BUY",    v: meta?.buy    ?? "–", c: "#00dca0" },
              { l: "SELL",   v: meta?.sell   ?? "–", c: "#ff3c5a" },
              { l: "STRONG", v: meta?.strong ?? "–", c: "#ffd700" },
              { l: "TOTAL",  v: meta?.total  ?? "–", c: "#38bdf8" },
              { l: "PAIRS",  v: signals.length || "–", c: "#a78bfa" },
            ].map((s) => (
              <div key={s.l} style={{ background: `${s.c}08`, border: `1px solid ${s.c}16`, borderRadius: 11, padding: "8px 4px", textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: s.c, fontFamily: "'Barlow Condensed',sans-serif", lineHeight: 1.1 }}>
                  {loading ? "–" : s.v}
                </div>
                <div style={{ fontSize: 7.5, color: "rgba(255,255,255,.25)", letterSpacing: 0.5, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }}>
            {["ALL","ACTIVE","BUY","SELL","STRONG"].map((f) => {
              const ac = f === "BUY" ? "#00dca0" : f === "SELL" ? "#ff3c5a" : f === "STRONG" ? "#ffd700" : "#fff";
              return (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: "5px 12px", borderRadius: 100, border: "none", cursor: "pointer",
                  fontSize: 9, fontWeight: 800, letterSpacing: 0.6, whiteSpace: "nowrap",
                  background: filter === f ? ac : "rgba(255,255,255,.04)",
                  color: filter === f ? "#000" : "rgba(255,255,255,.3)",
                  transition: "all .2s", fontFamily: "inherit",
                }}>{f}</button>
              );
            })}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{
            background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
            color: "rgba(255,255,255,.4)", borderRadius: 100, padding: "5px 10px",
            fontSize: 9, cursor: "pointer", outline: "none", fontFamily: "inherit",
          }}>
            <option value="SCORE">Score ↓</option>
            <option value="RSI">RSI (Oversold)</option>
            <option value="CHANGE">Change ↓</option>
            <option value="CONFLUENCE">Confluence ↓</option>
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "52px 0" }}>
            <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 18px" }}>
              <svg width={90} height={90} style={{ position: "absolute", inset: 0 }}>
                <circle cx={45} cy={45} r={38} fill="none" stroke="rgba(0,220,160,.07)" strokeWidth={5} />
                <circle cx={45} cy={45} r={38} fill="none" stroke="#00dca0" strokeWidth={5}
                  strokeDasharray="55 184" strokeLinecap="round"
                  style={{ transformOrigin: "45px 45px", animation: "spin 1.2s linear infinite", filter: "drop-shadow(0 0 6px #00dca0)" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#00dca0", fontFamily: "'Barlow Condensed',sans-serif" }}>SMC</div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,.3)" }}>LOADING</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: 1 }}>
              Fetching signals from API…
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.18)", marginTop: 4 }}>
              5 Timeframes · 10 Pairs · Full SMC Analysis
            </div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>⚠️</div>
            <div style={{ fontSize: 13, color: "#ff3c5a", marginBottom: 8 }}>API Error</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 16 }}>{error}</div>
            <button onClick={load} style={{ padding: "8px 20px", borderRadius: 100, border: "1px solid #ff3c5a40", background: "rgba(255,60,90,.08)", color: "#ff3c5a", cursor: "pointer", fontFamily: "inherit", fontSize: 11 }}>
              Retry
            </button>
          </div>
        )}

        {/* SIGNALS */}
        {!loading && !error && (
          <div>
            <Heatmap signals={signals} />
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: 34, marginBottom: 10 }}>🔍</div>
                  <div style={{ color: "rgba(255,255,255,.25)", fontSize: 13 }}>No signals match this filter</div>
                </div>
              ) : (
                filtered.map((sig) => <SignalCard key={sig.symbol} sig={sig} />)
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: 28, textAlign: "center", fontSize: 9, color: "rgba(255,255,255,.1)", lineHeight: 1.9 }}>
          SMC Elite · 1W · 1D · 4H · 1H · 15M Multi-Timeframe<br />
          OB · FVG · BOS · CHoCH · Liquidity · MACD · RSI · StochRSI · Ichimoku<br />
          Educational purposes only · Not financial advice
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Fira+Code:wght@400;500;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes drift { from{transform:translate(0,0)} to{transform:translate(3%,2%)} }
        *  { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        button, select { font-family: inherit; }
      `}</style>
    </div>
  );
}
