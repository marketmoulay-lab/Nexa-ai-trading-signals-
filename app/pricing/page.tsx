"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"
import {
  CheckCircle2,
  Zap,
  Crown,
  Star,
  Shield,
  Send,
  Copy,
  Check,
  ExternalLink,
  CreditCard,
  Bitcoin,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "Forever free",
    description: "Perfect for getting started",
    icon: Zap,
    features: [
      "3 signals per day",
      "Access to @cryptomoulay",
      "Basic market analysis",
      "Community support",
    ],
    notIncluded: [
      "Unlimited signals",
      "30+ trading pairs",
      "Priority notifications",
      "VIP group access",
    ],
    cta: "Join Free",
    ctaLink: "https://t.me/cryptomoulay",
    popular: false,
    color: "primary",
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    period: "per month",
    description: "For active traders",
    icon: Star,
    features: [
      "Unlimited signals daily",
      "30+ trading pairs",
      "Priority notifications",
      "Advanced risk analysis",
      "14-day free trial",
      "Cancel anytime",
    ],
    notIncluded: [
      "Crypto signals",
      "Personal mentor",
      "VIP exclusive group",
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "primary",
  },
  {
    id: "elite",
    name: "Elite",
    price: 79,
    period: "per month",
    description: "Complete trading package",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Crypto signals included",
      "Personal mentor access",
      "VIP exclusive group",
      "Priority support 24/7",
      "Advanced AI insights",
      "14-day free trial",
    ],
    notIncluded: [],
    cta: "Go Elite",
    popular: false,
    color: "accent-gold",
  },
]

const cryptoAddresses = [
  {
    coin: "BTC",
    name: "Bitcoin",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    network: "Bitcoin Network",
    color: "#F7931A",
  },
  {
    coin: "ETH",
    name: "Ethereum",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    network: "ERC-20",
    color: "#627EEA",
  },
  {
    coin: "USDT",
    name: "Tether",
    address: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9",
    network: "TRC-20 (Recommended)",
    color: "#26A17B",
  },
  {
    coin: "USDC",
    name: "USD Coin",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    network: "ERC-20",
    color: "#2775CA",
  },
  {
    coin: "BNB",
    name: "BNB",
    address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
    network: "BEP-2",
    color: "#F0B90B",
  },
]

const faqs = [
  {
    q: "What happens after I pay?",
    a: "After payment, send proof (screenshot or TX hash) to @cryptomoulay on Telegram. You'll be activated within 30 minutes.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes! No contracts, no hidden fees. Cancel anytime with zero penalties.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
  },
  {
    q: "Which crypto should I use?",
    a: "We recommend USDT (TRC-20) for zero network fees. All other coins work perfectly too.",
  },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAddresses[2]) // Default to USDT
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "crypto">("paypal")

  const copyAddress = () => {
    navigator.clipboard.writeText(selectedCrypto.address)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      window.open("https://t.me/cryptomoulay", "_blank")
      return
    }
    setSelectedPlan(planId)
    // Scroll to payment section
    document.getElementById("payment-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const selectedPlanDetails = plans.find((p) => p.id === selectedPlan)

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
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start for free, upgrade when you&apos;re ready. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 relative ${
                plan.popular ? "neon-border" : ""
              } ${plan.id === "elite" ? "holographic" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  plan.id === "elite"
                    ? "bg-accent-gold/20"
                    : "bg-primary/20"
                }`}
              >
                <plan.icon
                  className={`w-6 h-6 ${
                    plan.id === "elite" ? "text-accent-gold" : "text-primary"
                  }`}
                />
              </div>

              <h3 className="font-heading font-semibold text-xl text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

              <div className="mb-6">
                <span
                  className={`text-4xl font-heading font-bold ${
                    plan.id === "elite" ? "text-gradient-gold" : "text-foreground"
                  }`}
                >
                  ${plan.price}
                </span>
                <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.id === "elite" ? "text-accent-gold" : "text-primary"
                      }`}
                    />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm opacity-50">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground line-through">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : plan.id === "elite"
                    ? "bg-accent-gold/20 text-accent-gold border border-accent-gold/30 hover:bg-accent-gold/30"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Payment Section */}
        <motion.div
          id="payment-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Complete Your Payment
            </h2>
            <p className="text-muted-foreground">
              {selectedPlanDetails
                ? `Selected: ${selectedPlanDetails.name} Plan - $${selectedPlanDetails.price}/month`
                : "Select a plan above to continue"}
            </p>
          </div>

          {/* Payment Method Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                paymentMethod === "paypal"
                  ? "bg-[#003087] text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              PayPal
            </button>
            <button
              onClick={() => setPaymentMethod("crypto")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                paymentMethod === "crypto"
                  ? "bg-[#F7931A] text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bitcoin className="w-5 h-5" />
              Crypto
            </button>
          </div>

          {/* PayPal Section */}
          {paymentMethod === "paypal" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#003087]/20 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-[#003087]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Pay with PayPal
                </h3>
                <p className="text-sm text-muted-foreground">
                  Secure payment with buyer protection
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Send payment to:</p>
                <p className="font-mono text-lg text-foreground font-semibold">
                  soholondon52@gmail.com
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm text-primary font-semibold">
                    1
                  </span>
                  <div>
                    <p className="text-sm text-foreground">Send the plan amount via PayPal</p>
                    <p className="text-xs text-muted-foreground">
                      Pro: $29 | Elite: $79
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm text-primary font-semibold">
                    2
                  </span>
                  <div>
                    <p className="text-sm text-foreground">Screenshot the confirmation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm text-primary font-semibold">
                    3
                  </span>
                  <div>
                    <p className="text-sm text-foreground">
                      Send proof to @cryptomoulay on Telegram
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-buy/10 border border-buy/20 mb-6">
                <Shield className="w-5 h-5 text-buy" />
                <span className="text-sm text-foreground">
                  PayPal Buyer Protection included
                </span>
              </div>

              <Button
                className="w-full bg-[#003087] hover:bg-[#002369] text-white"
                asChild
              >
                <a
                  href="https://paypal.me/soholondon52"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pay with PayPal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          )}

          {/* Crypto Section */}
          {paymentMethod === "crypto" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              {/* Coin Selector */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {cryptoAddresses.map((crypto) => (
                  <button
                    key={crypto.coin}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCrypto.coin === crypto.coin
                        ? "text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    style={{
                      backgroundColor:
                        selectedCrypto.coin === crypto.coin ? crypto.color : undefined,
                    }}
                  >
                    {crypto.coin}
                  </button>
                ))}
              </div>

              {/* QR Code */}
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-white rounded-xl mb-4">
                  <QRCodeSVG value={selectedCrypto.address} size={180} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedCrypto.name} ({selectedCrypto.network})
                </p>
              </div>

              {/* Address */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-xs text-foreground break-all">
                    {selectedCrypto.address}
                  </p>
                  <button
                    onClick={copyAddress}
                    className="flex-shrink-0 p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                  >
                    {copiedAddress ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-gold/10 border border-accent-gold/20 mb-6">
                <AlertCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  Always verify you&apos;re sending on the correct network ({selectedCrypto.network})
                </p>
              </div>

              {/* Instructions */}
              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">
                  After sending, message @cryptomoulay with:
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>- Your Telegram username</li>
                  <li>- The plan you purchased (Pro/Elite)</li>
                  <li>- Transaction hash (TX ID)</li>
                </ul>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4 mr-2" />
                  Send Proof to @cryptomoulay
                </a>
              </Button>
            </motion.div>
          )}

          {/* Activation Time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 p-4 glass-card"
          >
            <p className="text-sm text-foreground">
              <span className="text-primary font-semibold">Activation within 30 minutes</span> after
              payment proof is received
            </p>
          </motion.div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <h3 className="font-heading font-semibold text-xl text-foreground mb-6 text-center">
            Payment FAQs
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card p-4">
                <p className="font-medium text-foreground mb-2">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>30-Day Money Back</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            <span>Instant Activation</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
