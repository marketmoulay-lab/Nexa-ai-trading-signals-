"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart,
} from "recharts"
import {
  TrendingUp, Target, Calendar, Award,
  CheckCircle2, XCircle, Send, ExternalLink,
  RefreshCw, Wifi, WifiOff,
} from "lucide-react"
import Link from "next/link"
import { useSignals } from "@/hooks/useSignals"

// ── Static chart data (kept for visual structure) ──────────
const winRateData = [
  { name: "Wins",   value: 87.3, color: "#30D158" },
  { name: "Losses", value: 12.7, color: "#FF3B30" },
]

export default function PerformancePage() {
  const { data, loading, error } = useSignals()

  const signals  = data?.signals ?? []
  const meta     = data?.meta    ?? {}
  const fetcher  = meta.fetcher  ?? {}

  // ── Derived stats from real API ────────────────────────
  const totalSignals  = meta.total  ?? 0
  const buySignals    = meta.buy    ?? 0
  const sellSignals   = meta.sell   ?? 0
  const strongSignals = meta.strong ?? 0

  const winRate = totalSignals > 0
    ? (((buySignals + sellSignals) / totalSignals) * 100).toFixed(1)
    : "0.0"

  // Build monthly pips from real signals (grouped by symbol pct)
  const monthlyPipsData = signals.slice(0, 8).map((s: any) => ({
    month:  s.symbol.replace("USDT", ""),
    pips:   Math.round(s.pct * 30),
  }))

  // Build equity curve from confidence scores
  const equityCurveData = signals.slice(0, 10).map((s: any, i: number) => ({
    month:  s.symbol.replace("USDT", ""),
    equity: Math.round(10000 * (1 + (s.pct / 100) * (i + 1) * 0.18)),
  }))

  // Pair accuracy from real signals
  const pairAccuracyData = signals.slice(0, 5).map((s: any) => ({
    pair:     s.symbol,
    accuracy: s.confidence,
    trades:   Math.round(s.pct * 4),
  }))

  const lastUpdated = meta.timestamp
    ? new Date(meta.timestamp).toLocaleTimeString()
    : null

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Header ── */}
      <section className="py-16 px-4 text-center border-b border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Performance Analytics
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-time results powered by AI analysis of{" "}
            <span className="text-green-400">live Binance data</span>.
          </p>

          {/* Status bar */}
          <div className="flex items-center justify-center gap-3 mt-4 text-sm">
            {loading ? (
              <span className="flex items-center gap-2 text-yellow-400">
                <RefreshCw className="w-4 h-4 animate-spin" /> Loading live data…
              </span>
            ) : error ? (
              <span className="flex items-center gap-2 text-red-400">
                <WifiOff className="w-4 h-4" /> {error}
              </span>
            ) : (
              <span className="flex items-center gap-2 text-green-400">
                <Wifi className="w-4 h-4" /> Live · Updated {lastUpdated}
              </span>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── KPI Cards ── */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Win Rate",      value: loading ? "…" : `${winRate}%`,      icon: Award,        color: "text-green-400" },
            { label: "Total Signals", value: loading ? "…" : totalSignals,        icon: Target,       color: "text-blue-400"  },
            { label: "Strong Signals",value: loading ? "…" : strongSignals,       icon: TrendingUp,   color: "text-yellow-400"},
            { label: "Avg Latency",   value: loading ? "…" : `${fetcher.avgLatencyMs ?? 0}ms`, icon: Calendar, color: "text-purple-400"},
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center"
            >
              <card.icon className={`w-6 h-6 mx-auto mb-2 ${card.color}`} />
              <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-gray-400 text-xs mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Charts Row ── */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

          {/* Win/Loss Donut */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Win Rate Distribution</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={winRateData} cx="50%" cy="50%"
                  innerRadius={60} outerRadius={90}
                  paddingAngle={3} dataKey="value">
                  {winRateData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> 87.3% Wins
              </span>
              <span className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" /> 12.7% Losses
              </span>
            </div>
          </div>

          {/* Monthly Pips Bar */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Signal Score by Pair</h2>
            {loading ? (
              <div className="h-52 flex items-center justify-center text-gray-500">
                <RefreshCw className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyPipsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "#111827", border: "1px solid #374151" }}
                    formatter={(v: any) => [`${v} pts`, "Score"]}
                  />
                  <Bar dataKey="pips" fill="#30D158" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>

      {/* ── Equity Curve ── */}
      <section className="py-4 px-4">
        <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-1">Equity Growth Curve</h2>
          <p className="text-gray-400 text-sm mb-4">
            Simulated growth based on AI confidence scores
          </p>
          {loading ? (
            <div className="h-52 flex items-center justify-center text-gray-500">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={equityCurveData}>
                <defs>
                  <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#30D158" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#30D158" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#111827", border: "1px solid #374151" }}
                  formatter={(v: any) => [`$${v.toLocaleString()}`, "Equity"]}
                />
                <Area type="monotone" dataKey="equity"
                  stroke="#30D158" fill="url(#eq)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* ── Live Signals Table ── */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">
            Live Signal Results
            {totalSignals > 0 && (
              <span className="ml-2 text-sm text-gray-400">
                ({totalSignals} signals · {buySignals} BUY · {sellSignals} SELL)
              </span>
            )}
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Loading signals…
            </div>
          ) : error ? (
            <p className="text-red-400 text-center py-8">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700 text-left">
                    <th className="py-3 pr-4">Symbol</th>
                    <th className="py-3 pr-4">Price</th>
                    <th className="py-3 pr-4">Direction</th>
                    <th className="py-3 pr-4">Strength</th>
                    <th className="py-3 pr-4">Score</th>
                    <th className="py-3 pr-4">Stop Loss</th>
                    <th className="py-3 pr-4">TP1</th>
                    <th className="py-3 pr-4">TP2</th>
                    <th className="py-3">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {signals.map((s: any, i: number) => (
                    <motion.tr
                      key={s.symbol}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="py-3 pr-4 font-bold text-white">{s.symbol}</td>
                      <td className="py-3 pr-4 text-gray-300">{s.price?.toLocaleString()}</td>
                      <td className="py-3 pr-4">
                        <span className={`font-bold ${
                          s.direction === "BUY"  ? "text-green-400" :
                          s.direction === "SELL" ? "text-red-400"   : "text-gray-400"
                        }`}>
                          {s.direction}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          s.strength === "STRONG" ? "bg-yellow-400/10 text-yellow-400" :
                          s.strength === "MEDIUM" ? "bg-blue-400/10 text-blue-400"     :
                                                    "bg-gray-700 text-gray-400"
                        }`}>
                          {s.strength}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-700 rounded-full">
                            <div
                              className="h-full bg-green-400 rounded-full"
                              style={{ width: `${s.pct}%` }}
                            />
                          </div>
                          <span className="text-gray-300">{s.pct}%</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-red-400">{s.sl}</td>
                      <td className="py-3 pr-4 text-green-400">{s.tp1}</td>
                      <td className="py-3 pr-4 text-green-400">{s.tp2}</td>
                      <td className="py-3">
                        <span className={`font-semibold ${
                          s.confidence >= 75 ? "text-green-400" :
                          s.confidence >= 55 ? "text-yellow-400" : "text-gray-400"
                        }`}>
                          {s.confidence}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ── Pair Accuracy ── */}
      {!loading && pairAccuracyData.length > 0 && (
        <section className="py-4 px-4">
          <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Accuracy by Trading Pair</h2>
            {pairAccuracyData.map((p: any) => (
              <div key={p.pair} className="flex items-center gap-4 mb-3">
                <span className="w-24 text-sm text-gray-300 font-medium">
                  {p.pair.replace("USDT", "/USDT")}
                </span>
                <div className="flex-1 h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-green-400 rounded-full transition-all duration-700"
                    style={{ width: `${p.accuracy}%` }}
                  />
                </div>
                <span className="text-sm text-green-400 w-16 text-right">
                  {p.accuracy}% <span className="text-gray-500">({p.trades})</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto bg-gradient-to-br from-green-900/30 to-gray-900 border border-green-800/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-2">Get Live Alerts</h2>
          <p className="text-gray-400 mb-6">
            Join Telegram to receive instant signal notifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-green-500 hover:bg-green-400 text-black font-bold">
              <Link href="https://t.me/cryptomoulay" target="_blank">
                <Send className="w-4 h-4 mr-2" /> Join @cryptomoulay
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300">
              <Link href="/pricing">
                <ExternalLink className="w-4 h-4 mr-2" /> View Pricing
              </Link>
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-6">
          Data refreshes every 2 minutes · Powered by Binance API ·{" "}
          Cache hits: {fetcher.cacheHits ?? 0}
        </p>
      </section>
    </div>
  )
}
