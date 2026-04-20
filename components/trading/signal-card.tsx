"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Clock, Target, Shield } from "lucide-react"

export interface Signal {
  id: string
  pair: string
  type: "BUY" | "SELL"
  entry: number
  stopLoss: number
  takeProfit1: number
  takeProfit2: number
  takeProfit3: number
  status: "active" | "hit_tp1" | "hit_tp2" | "hit_tp3" | "stopped"
  timestamp: Date
  pips?: number
}

interface SignalCardProps {
  signal: Signal
  variant?: "default" | "compact"
}

export function SignalCard({ signal, variant = "default" }: SignalCardProps) {
  const isBuy = signal.type === "BUY"
  const isActive = signal.status === "active"

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isBuy ? "bg-buy/20 text-buy" : "bg-sell/20 text-sell"
            }`}
          >
            {isBuy ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
          <div>
            <p className="font-heading font-semibold text-foreground">{signal.pair}</p>
            <p className="text-xs text-muted-foreground">
              Entry: {signal.entry.toFixed(signal.pair.includes("JPY") ? 3 : 5)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
              isBuy ? "bg-buy/20 text-buy" : "bg-sell/20 text-sell"
            }`}
          >
            {signal.type}
          </span>
          {isActive && (
            <p className="text-xs text-primary mt-1 flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Active
            </p>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 neon-border hover:glow-primary transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isBuy ? "bg-buy/20 text-buy" : "bg-sell/20 text-sell"
            }`}
          >
            {isBuy ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground">{signal.pair}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {signal.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`inline-block px-3 py-1.5 rounded-lg text-sm font-bold ${
              isBuy ? "bg-buy/20 text-buy" : "bg-sell/20 text-sell"
            }`}
          >
            {signal.type}
          </span>
          {isActive && (
            <p className="text-xs text-primary mt-2 flex items-center justify-end gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              LIVE
            </p>
          )}
        </div>
      </div>

      {/* Entry Price */}
      <div className="bg-muted/50 rounded-lg p-3 mb-4">
        <p className="text-xs text-muted-foreground mb-1">Entry Price</p>
        <p className="font-mono text-xl font-bold text-foreground">
          {signal.entry.toFixed(signal.pair.includes("JPY") ? 3 : 5)}
        </p>
      </div>

      {/* Targets */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-buy/10 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-buy mb-1">
            <Target className="w-3 h-3" />
            <span className="text-xs">TP1</span>
          </div>
          <p className="font-mono text-sm font-semibold text-foreground">
            {signal.takeProfit1.toFixed(signal.pair.includes("JPY") ? 3 : 5)}
          </p>
        </div>
        <div className="bg-buy/10 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-buy mb-1">
            <Target className="w-3 h-3" />
            <span className="text-xs">TP2</span>
          </div>
          <p className="font-mono text-sm font-semibold text-foreground">
            {signal.takeProfit2.toFixed(signal.pair.includes("JPY") ? 3 : 5)}
          </p>
        </div>
        <div className="bg-buy/10 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-buy mb-1">
            <Target className="w-3 h-3" />
            <span className="text-xs">TP3</span>
          </div>
          <p className="font-mono text-sm font-semibold text-foreground">
            {signal.takeProfit3.toFixed(signal.pair.includes("JPY") ? 3 : 5)}
          </p>
        </div>
      </div>

      {/* Stop Loss */}
      <div className="bg-sell/10 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sell">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">Stop Loss</span>
        </div>
        <p className="font-mono font-semibold text-foreground">
          {signal.stopLoss.toFixed(signal.pair.includes("JPY") ? 3 : 5)}
        </p>
      </div>

      {/* Pips Result */}
      {signal.pips !== undefined && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Result</span>
            <span
              className={`font-mono font-bold ${
                signal.pips >= 0 ? "text-buy" : "text-sell"
              }`}
            >
              {signal.pips >= 0 ? "+" : ""}
              {signal.pips} pips
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
