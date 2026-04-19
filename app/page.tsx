"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { SignalCard, type Signal } from "@/components/trading/signal-card"
import {
  Zap,
  Target,
  Shield,
  Clock,
  TrendingUp,
  Users,
  ChartCandlestick,
  Bot,
  Send,
  CheckCircle2,
  ArrowRight,
  Star,
  ChevronDown,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Sample signals for preview
const sampleSignals: Signal[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
]

const features = [
  {
    icon: Bot,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze 30+ markets 24/7 for high-probability setups.",
  },
  {
    icon: Zap,
    title: "Instant Signals",
    description: "Receive signals in under 2 seconds with precise entry, TP, and SL levels.",
  },
  {
    icon: Target,
    title: "87.3% Win Rate",
    description: "Verified accuracy over 12 months with transparent performance tracking.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Every signal includes stop loss and multiple take profit targets.",
  },
  {
    icon: ChartCandlestick,
    title: "Multi-Market Coverage",
    description: "Forex, Gold (XAUUSD), Crypto, and Indices - all in one platform.",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Our AI never sleeps. Get signals during any trading session.",
  },
]

const testimonials = [
  {
    name: "Marcus T.",
    role: "Day Trader",
    content: "NEXA AI has transformed my trading. The gold signals are incredibly accurate. Made $4,800 in my first month!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "Crypto Investor",
    content: "Finally, a signal service that actually delivers. The 87% win rate is real - I've tracked it myself.",
    rating: 5,
  },
  {
    name: "James R.",
    role: "Forex Trader",
    content: "The speed of signals is unmatched. I get entries before the move even starts. Game changer!",
    rating: 5,
  },
]

const faqs = [
  {
    question: "How accurate are NEXA AI signals?",
    answer: "Our AI achieves an 87.3% win rate verified over 12 months. April 2026 alone saw 111 wins out of 127 signals (87.4% accuracy). You can view our full performance history on the Performance page.",
  },
  {
    question: "What markets do you cover?",
    answer: "We cover 30+ markets including Gold (XAUUSD - our specialty), major Forex pairs (EUR/USD, GBP/USD, USD/JPY), Cryptocurrencies (BTC, ETH, SOL), and Indices (NASDAQ, S&P500, DAX).",
  },
  {
    question: "How do I receive signals?",
    answer: "All signals are delivered instantly via our Telegram channel @cryptomoulay. Free members get 3 signals daily, while Pro and Elite members get unlimited signals.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! You can join @cryptomoulay for free and receive 3 signals daily at no cost. Pro and Elite plans also include a 14-day free trial with full access.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal (soholondon52@gmail.com) and Cryptocurrency (BTC, ETH, USDT, USDC, BNB). PayPal offers buyer protection, and crypto payments are instant.",
  },
  {
    question: "Can beginners use NEXA AI?",
    answer: "Absolutely! Each signal includes exact entry price, 3 take-profit levels, stop loss, and risk percentage. No analysis needed - just follow the signal!",
  },
]

const stats = [
  { value: 87.3, suffix: "%", label: "Win Rate" },
  { value: 12, suffix: "K+", label: "Active Traders" },
  { value: 30, suffix: "+", label: "Markets Covered" },
  { value: 2, suffix: "s", label: "Signal Speed" },
]

export default function HomePage() {
  return (
    <AuroraBackground>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">AI Trading Signals Live Now</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              The Future of Trading{" "}
              <span className="text-gradient">is Here</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              While others guess, NEXA AI knows. Get AI-powered trading signals for Forex, Gold, and Crypto with{" "}
              <span className="text-primary font-semibold">87.3% verified win rate</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary text-lg px-8"
                asChild
              >
                <Link href="/pricing">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                  <Send className="w-5 h-5 mr-2" />
                  Join @cryptomoulay
                </a>
              </Button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-4 text-center">
                  <p className="font-heading text-2xl md:text-3xl font-bold text-primary">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.suffix === "%" ? 1 : 0} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-muted-foreground"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Signals Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Live Signal Preview
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See the quality of signals you&apos;ll receive. Real-time entries with precise TP and SL levels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {sampleSignals.map((signal, index) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SignalCard signal={signal} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/signals">
                View All Signals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-background-card">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose NEXA AI?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powered by advanced AI algorithms that analyze markets 24/7 to find the best trading opportunities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:neon-border transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start trading with AI signals in 3 simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Join Telegram",
                description: "Connect with @cryptomoulay and join our trading community of 12,000+ traders.",
                icon: Send,
              },
              {
                step: "02",
                title: "Receive Signals",
                description: "Get instant AI-powered signals with entry price, take profits, and stop loss levels.",
                icon: Zap,
              },
              {
                step: "03",
                title: "Trade & Profit",
                description: "Execute signals and track your performance. Average 87.3% win rate!",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass-card p-6 text-center h-full">
                  <div className="text-5xl font-heading font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-background-card">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Traders Say
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join thousands of satisfied traders using NEXA AI signals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-gold fill-accent-gold" />
                  ))}
                </div>
                <p className="text-foreground mb-4">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start for free. Upgrade when you&apos;re ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">Free</h3>
              <p className="text-4xl font-heading font-bold text-foreground mb-1">$0</p>
              <p className="text-sm text-muted-foreground mb-6">Forever free</p>
              <ul className="space-y-3 mb-6">
                {["3 signals per day", "Telegram access", "Basic support"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                  Join Free
                </a>
              </Button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 neon-border relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                Most Popular
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">Pro</h3>
              <p className="text-4xl font-heading font-bold text-foreground mb-1">$29</p>
              <p className="text-sm text-muted-foreground mb-6">per month</p>
              <ul className="space-y-3 mb-6">
                {[
                  "Unlimited signals",
                  "30+ trading pairs",
                  "Priority notifications",
                  "14-day free trial",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/pricing">Start Free Trial</Link>
              </Button>
            </motion.div>

            {/* Elite Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 holographic"
            >
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">Elite</h3>
              <p className="text-4xl font-heading font-bold text-gradient-gold mb-1">$79</p>
              <p className="text-sm text-muted-foreground mb-6">per month</p>
              <ul className="space-y-3 mb-6">
                {[
                  "Everything in Pro",
                  "Crypto signals included",
                  "Personal mentor access",
                  "VIP exclusive group",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full border-accent-gold text-accent-gold hover:bg-accent-gold/10" asChild>
                <Link href="/pricing">Go Elite</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-background-card">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Have questions? We have answers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center neon-border"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Trading with AI?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join 12,000+ traders using NEXA AI to make smarter trading decisions. Start free today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary text-lg px-8"
                asChild
              >
                <Link href="/pricing">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                  <Send className="w-5 h-5 mr-2" />
                  Join Telegram
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </AuroraBackground>
  )
}
