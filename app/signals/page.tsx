"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TradingViewWidget } from "@/components/trading/tradingview-widget"
import { SignalCard, type Signal } from "@/components/trading/signal-card"
import { Send, Clock, Filter, TrendingUp, TrendingDown, Zap } from "lucide-react"
import type { Metadata } from "next"

const pairs = [
  { symbol: "OANDA:XAUUSD", label: "XAUUSD", name: "Gold" },
  { symbol: "FX:EURUSD", label: "EURUSD", name: "Euro/USD" },
  { symbol: "BITSTAMP:BTCUSD", label: "BTCUSD", name: "Bitcoin" },
  { symbol: "FX:GBPUSD", label: "GBPUSD", name: "Pound/USD" },
  { symbol: "FX:USDJPY", label: "USDJPY", name: "USD/Yen" },
]

const timeframes = [
  { value: "15", label: "M15" },
  { value: "60", label: "H1" },
  { value: "240", label: "H4" },
  { value: "D", label: "D1" },
]

// Sample signals for demonstration
const todaySignals: Signal[] = [
  {
    id: "sig-1",
    pair: "XAUUSD",
    type: "BUY",
    entry: 2342.50,
    stopLoss: 2335.00,
    takeProfit1: 2350.00,
    takeProfit2: 2358.00,
    takeProfit3: 2365.00,
    status: "active",
    timestamp: new Date(),
  },
  {
    id: "sig-2",
    pair: "EURUSD",
    type: "SELL",
    entry: 1.08450,
    stopLoss: 1.08650,
    takeProfit1: 1.08250,
    takeProfit2: 1.08050,
    takeProfit3: 1.07850,
    status: "hit_tp1",
    timestamp: new Date(Date.now() - 3600000),
    pips: 20,
  },
  {
    id: "sig-3",
    pair: "BTCUSD",
    type: "BUY",
    entry: 67450,
    stopLoss: 66800,
    takeProfit1: 68000,
    takeProfit2: 68500,
    takeProfit3: 69200,
    status: "active",
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: "sig-4",
    pair: "GBPUSD",
    type: "BUY",
    entry: 1.26780,
    stopLoss: 1.26480,
    takeProfit1: 1.27080,
    takeProfit2: 1.27380,
    takeProfit3: 1.27680,
    status: "hit_tp2",
    timestamp: new Date(Date.now() - 14400000),
    pips: 60,
  },
  {
    id: "sig-5",
    pair: "XAUUSD",
    type: "SELL",
    entry: 2355.00,
    stopLoss: 2362.00,
    takeProfit1: 2348.00,
    takeProfit2: 2340.00,
    takeProfit3: 2332.00,
    status: "hit_tp3",
    timestamp: new Date(Date.now() - 21600000),
    pips: 230,
  },
]

export default function SignalsPage() {
  const [selectedPair, setSelectedPair] = useState(pairs[0])
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[1])
  const [signalFilter, setSignalFilter] = useState<"all" | "active" | "closed">("all")

  const filteredSignals = todaySignals.filter((signal) => {
    if (signalFilter === "all") return true
    if (signalFilter === "active") return signal.status === "active"
    return signal.status !== "active"
  })

  const activeCount = todaySignals.filter((s) => s.status === "active").length
  const totalPips = todaySignals
    .filter((s) => s.pips !== undefined)
    .reduce((acc, s) => acc + (s.pips || 0), 0)

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Live Trading Signals
          </h1>
          <p className="text-muted-foreground">
            Real-time AI-powered signals with TradingView charts. Join @cryptomoulay for instant alerts.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Active Signals</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-buy/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-buy" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-buy">+{totalPips}</p>
              <p className="text-xs text-muted-foreground">Pips Today</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">{todaySignals.length}</p>
              <p className="text-xs text-muted-foreground">Signals Today</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-gold/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">87.3%</p>
              <p className="text-xs text-muted-foreground">Win Rate</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Pair Selector */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {pairs.map((pair) => (
                <button
                  key={pair.symbol}
                  onClick={() => setSelectedPair(pair)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPair.symbol === pair.symbol
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  {pair.label}
                </button>
              ))}
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Timeframe:</span>
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    selectedTimeframe.value === tf.value
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* TradingView Chart */}
            <TradingViewWidget
              symbol={selectedPair.symbol}
              interval={selectedTimeframe.value}
              height={500}
            />

            {/* Chart Info */}
            <div className="mt-4 p-4 glass-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Currently viewing</p>
                  <p className="font-heading font-semibold text-foreground">
                    {selectedPair.name} ({selectedPair.label})
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                    <Send className="w-4 h-4 mr-2" />
                    Get Live Alerts
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Signals Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-lg text-foreground">
                Today&apos;s Signals
              </h2>
              <div className="flex items-center gap-1">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={signalFilter}
                  onChange={(e) => setSignalFilter(e.target.value as typeof signalFilter)}
                  className="bg-transparent text-sm text-muted-foreground focus:outline-none cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredSignals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SignalCard signal={signal} variant="compact" />
                </motion.div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-6 glass-card p-4 neon-border">
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Want More Signals?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join our Telegram for instant signal notifications and access to 30+ markets.
              </p>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4 mr-2" />
                  Join @cryptomoulay
                </a>
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="mt-4 text-xs text-muted-foreground">
              Signals shown are for demonstration. Past performance does not guarantee future results. 
              Trading involves risk.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
