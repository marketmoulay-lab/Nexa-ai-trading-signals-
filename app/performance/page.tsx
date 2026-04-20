"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  Target,
  Calendar,
  Award,
  CheckCircle2,
  XCircle,
  Send,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

// Win rate data for donut chart
const winRateData = [
  { name: "Wins", value: 87.3, color: "#30D158" },
  { name: "Losses", value: 12.7, color: "#FF3B30" },
]

// Monthly pips data
const monthlyPipsData = [
  { month: "May", pips: 1850 },
  { month: "Jun", pips: 2120 },
  { month: "Jul", pips: 1980 },
  { month: "Aug", pips: 2340 },
  { month: "Sep", pips: 2180 },
  { month: "Oct", pips: 2450 },
  { month: "Nov", pips: 2680 },
  { month: "Dec", pips: 2520 },
  { month: "Jan", pips: 2890 },
  { month: "Feb", pips: 2750 },
  { month: "Mar", pips: 3120 },
  { month: "Apr", pips: 3280 },
]

// Equity curve data
const equityCurveData = [
  { month: "May", equity: 10000 },
  { month: "Jun", equity: 11200 },
  { month: "Jul", equity: 12100 },
  { month: "Aug", equity: 13800 },
  { month: "Sep", equity: 15200 },
  { month: "Oct", equity: 17100 },
  { month: "Nov", equity: 19400 },
  { month: "Dec", equity: 21200 },
  { month: "Jan", equity: 23800 },
  { month: "Feb", equity: 25600 },
  { month: "Mar", equity: 27200 },
  { month: "Apr", equity: 28400 },
]

// Pair accuracy data
const pairAccuracyData = [
  { pair: "XAUUSD", accuracy: 91.2, trades: 342 },
  { pair: "EURUSD", accuracy: 86.5, trades: 256 },
  { pair: "BTCUSD", accuracy: 84.8, trades: 198 },
  { pair: "GBPUSD", accuracy: 88.3, trades: 215 },
  { pair: "USDJPY", accuracy: 85.1, trades: 187 },
]

// Recent performance stats
const recentStats = [
  { period: "Today", signals: 5, wins: 4, pips: 156 },
  { period: "This Week", signals: 28, wins: 24, pips: 892 },
  { period: "This Month", signals: 127, wins: 111, pips: 3280 },
  { period: "Last 3 Months", signals: 389, wins: 340, pips: 9150 },
]

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Performance Analytics
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent, verified results. Track our AI&apos;s performance across all markets with real-time analytics.
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-buy/20 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-buy" />
            </div>
            <p className="text-3xl font-heading font-bold text-buy">
              <AnimatedCounter value={87.3} suffix="%" decimals={1} />
            </p>
            <p className="text-sm text-muted-foreground">Win Rate</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">
              <AnimatedCounter value={28400} prefix="$" />
            </p>
            <p className="text-sm text-muted-foreground">From $10K Start</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">
              <AnimatedCounter value={12} suffix=" mo" />
            </p>
            <p className="text-sm text-muted-foreground">Track Record</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-accent-gold" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">
              <AnimatedCounter value={184} suffix="%" />
            </p>
            <p className="text-sm text-muted-foreground">Annual Return</p>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Win Rate Donut */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Win Rate Distribution
            </h3>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={winRateData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {winRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#080D1A",
                      border: "1px solid #2C2C2E",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#F5F5F7" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-buy" />
                <span className="text-sm text-foreground">87.3% Wins</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-sell" />
                <span className="text-sm text-foreground">12.7% Losses</span>
              </div>
            </div>
          </motion.div>

          {/* Monthly Pips Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Monthly Pips Performance
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPipsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                  <XAxis
                    dataKey="month"
                    stroke="#8E8E93"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#8E8E93" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#080D1A",
                      border: "1px solid #2C2C2E",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#F5F5F7" }}
                  />
                  <Bar
                    dataKey="pips"
                    fill="#00FFB2"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Total: 29,160 pips in 12 months
            </p>
          </motion.div>
        </div>

        {/* Equity Curve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Equity Growth Curve
            </h3>
            <span className="text-sm text-buy font-semibold">+184% Return</span>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityCurveData}>
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFB2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00FFB2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                <XAxis
                  dataKey="month"
                  stroke="#8E8E93"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#8E8E93"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#080D1A",
                    border: "1px solid #2C2C2E",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#F5F5F7" }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Equity"]}
                />
                <Area
                  type="monotone"
                  dataKey="equity"
                  stroke="#00FFB2"
                  strokeWidth={2}
                  fill="url(#colorEquity)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Starting capital: $10,000 | Current equity: $28,400 | Period: 12 months
          </p>
        </motion.div>

        {/* Pair Accuracy */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
              Accuracy by Trading Pair
            </h3>
            <div className="space-y-4">
              {pairAccuracyData.map((item, index) => (
                <div key={item.pair}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{item.pair}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.accuracy}% ({item.trades} trades)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.accuracy}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor:
                          item.accuracy >= 90
                            ? "#30D158"
                            : item.accuracy >= 85
                            ? "#00FFB2"
                            : "#2979FF",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
              Recent Performance
            </h3>
            <div className="space-y-4">
              {recentStats.map((stat) => (
                <div
                  key={stat.period}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium text-foreground">{stat.period}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.signals} signals
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-buy font-semibold">
                      {stat.wins}/{stat.signals} ({((stat.wins / stat.signals) * 100).toFixed(1)}%)
                    </p>
                    <p className="text-xs text-muted-foreground">+{stat.pips} pips</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Verification & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-8 neon-border text-center"
        >
          <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
            Verified Results
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            All performance data is verified and updated daily. Join our Telegram to see live signal results
            and start trading with 87.3% accuracy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
              asChild
            >
              <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                <Send className="w-4 h-4 mr-2" />
                Join @cryptomoulay
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">
                View Pricing Plans
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-muted/30 rounded-lg"
        >
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> Past performance does not guarantee future results. 
            Trading involves substantial risk of loss. The statistics shown are based on historical 
            data and actual results may vary. Never trade with money you cannot afford to lose.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
