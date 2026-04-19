export interface KnowledgeItem {
  keywords: string[]
  response: string
  quickReplies?: string[]
}

export const knowledgeBase: KnowledgeItem[] = [
  // Signals Questions
  {
    keywords: ["signal", "signals", "provide", "offer", "what do you"],
    response: "NEXA AI provides real-time trading signals for Forex, Gold, Crypto, and Indices with 87%+ accuracy. Get free signals on @cryptomoulay! Join here: t.me/cryptomoulay",
    quickReplies: ["How accurate?", "What pairs?", "How to join?"],
  },
  {
    keywords: ["accurate", "accuracy", "win rate", "success rate", "percentage"],
    response: "Our AI achieves 87.3% win rate verified over 12 months. April 2026: 111 wins out of 127 signals = 87.4% accuracy! Check our full performance at moulaytrading.fit/performance",
    quickReplies: ["View Performance", "Join Telegram", "Pricing Plans"],
  },
  {
    keywords: ["pairs", "markets", "currencies", "assets", "cover", "trade"],
    response: "We cover 30+ markets:\n\n- Gold (XAUUSD) - our specialty\n- Forex: EUR/USD, GBP/USD, USD/JPY...\n- Crypto: BTC, ETH, SOL, BNB\n- Indices: NASDAQ, S&P500, DAX",
    quickReplies: ["Gold Signals", "Crypto Signals", "Pricing"],
  },
  {
    keywords: ["fast", "speed", "quick", "instant", "time", "delivery"],
    response: "Under 2 seconds! Our AI detects the setup and fires the signal to @cryptomoulay instantly. You get: Entry + TP1/TP2/TP3 + Stop Loss.",
    quickReplies: ["Join Telegram", "How it works"],
  },

  // Pricing Questions
  {
    keywords: ["price", "cost", "much", "fee", "subscription", "plan", "pricing"],
    response: "We have 3 plans:\n\n- FREE - $0/mo (3 signals on @cryptomoulay)\n- PRO - $29/mo (unlimited signals, 30+ pairs)\n- ELITE - $79/mo (crypto + mentor + VIP group)\n\n14-day free trial on Pro and Elite!",
    quickReplies: ["Start Free Trial", "Payment Methods", "Join Free"],
  },
  {
    keywords: ["free", "trial", "test", "try"],
    response: "Yes! 14 days FREE on Pro and Elite plans. Also, you can join @cryptomoulay for free daily signals with no subscription needed!",
    quickReplies: ["Start Trial", "Join Telegram", "View Pricing"],
  },
  {
    keywords: ["pro", "professional"],
    response: "PRO Plan - $29/month:\n\n- Unlimited signals daily\n- 30+ trading pairs\n- Priority notifications\n- 14-day free trial\n- Cancel anytime\n\nPerfect for active traders!",
    quickReplies: ["Start Pro Trial", "Compare Plans", "How to Pay"],
  },
  {
    keywords: ["elite", "vip", "premium", "best"],
    response: "ELITE Plan - $79/month:\n\n- Everything in PRO\n- Crypto signals included\n- Personal mentor access\n- VIP exclusive group\n- Priority support\n\nOur most comprehensive package!",
    quickReplies: ["Start Elite Trial", "Compare Plans", "Contact Support"],
  },

  // Payment Questions
  {
    keywords: ["pay", "payment", "method", "how to subscribe", "purchase"],
    response: "We accept 2 payment methods:\n\n- PayPal: soholondon52@gmail.com\n- Crypto: BTC, ETH, USDT, USDC, BNB\n\nAfter payment, send proof to @cryptomoulay and you'll be activated within 30 minutes!",
    quickReplies: ["PayPal Payment", "Crypto Payment", "Contact Support"],
  },
  {
    keywords: ["paypal"],
    response: "Pay via PayPal to: soholondon52@gmail.com\n\nSteps:\n1. Send payment to the email above\n2. Screenshot the confirmation\n3. Send proof to @cryptomoulay\n4. Get activated in 30 minutes!\n\nPayPal buyer protection included!",
    quickReplies: ["Crypto Instead", "Contact Support"],
  },
  {
    keywords: ["crypto", "bitcoin", "btc", "eth", "usdt", "cryptocurrency"],
    response: "Pay with crypto:\n\n- BTC, ETH, USDT (TRC-20 recommended - zero fees), USDC, BNB\n- Visit moulaytrading.fit/pricing for wallet addresses\n- Send payment proof to @cryptomoulay\n\n100% safe and verified!",
    quickReplies: ["View Addresses", "PayPal Instead", "Contact Support"],
  },
  {
    keywords: ["subscribe", "join", "signup", "sign up", "register", "start"],
    response: "Simple! 3 steps:\n\n1. Choose your plan on moulaytrading.fit/pricing\n2. Pay via PayPal or Crypto\n3. Send payment proof to @cryptomoulay\n\nActivated within 30 minutes!",
    quickReplies: ["View Pricing", "Payment Methods", "Contact Support"],
  },

  // Telegram Questions
  {
    keywords: ["telegram", "channel", "group", "where", "get signals"],
    response: "Join our Telegram channel @cryptomoulay:\n\nt.me/cryptomoulay\n\nFree members get 3 signals/day. Pro members get unlimited signals instantly!",
    quickReplies: ["Open Telegram", "Upgrade to Pro", "Learn More"],
  },

  // General Questions
  {
    keywords: ["legit", "legitimate", "real", "scam", "trust", "safe"],
    response: "Absolutely!\n\n- 87.3% verified win rate\n- 12,000+ active traders\n- Verified results on Myfxbook\n- 30-day money back guarantee\n- PayPal buyer protection\n\nCheck our performance at moulaytrading.fit/performance",
    quickReplies: ["View Performance", "Read Reviews", "Join Telegram"],
  },
  {
    keywords: ["beginner", "new", "newbie", "start", "learn", "first time"],
    response: "Perfect for beginners!\n\nEach signal includes:\n- Exact entry price\n- 3 Take-Profit levels\n- Stop Loss price\n- Risk percentage\n\nNo analysis needed - just follow the signal!",
    quickReplies: ["Join Free", "Read Guides", "View Signals"],
  },
  {
    keywords: ["cancel", "refund", "money back", "stop"],
    response: "Yes! Cancel anytime with zero penalties. No contracts, no hidden fees. 30-day money back guarantee included.\n\nFor cancellations, contact @cryptomoulay",
    quickReplies: ["Contact Support", "View Policies"],
  },
  {
    keywords: ["contact", "support", "help", "question", "talk", "speak"],
    response: "Contact us anytime!\n\nTelegram: @cryptomoulay (fastest)\nEmail: soholondon52@gmail.com\n\nWe respond within minutes!",
    quickReplies: ["Open Telegram", "Send Email"],
  },
  {
    keywords: ["work", "how does", "explain", "process"],
    response: "How NEXA AI works:\n\n1. Our AI analyzes 30+ markets 24/7\n2. It detects high-probability setups\n3. Signals are sent to @cryptomoulay instantly\n4. You receive Entry, TP, and SL levels\n5. Follow the signal and profit!\n\n87.3% average win rate!",
    quickReplies: ["View Performance", "Join Telegram", "Start Trial"],
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    response: "Hello! I'm NEXA BOT, your AI trading assistant.\n\nHow can I help you today? You can ask me about:\n\n- Trading signals\n- Pricing plans\n- How to join\n- Payment methods\n\nOr type any question!",
    quickReplies: ["Today's Signals", "Pricing Plans", "Join Telegram", "How to Pay"],
  },
  {
    keywords: ["thanks", "thank you", "thx", "appreciate"],
    response: "You're welcome! If you have any more questions, feel free to ask.\n\nFor personalized help, contact @cryptomoulay directly!",
    quickReplies: ["Join Telegram", "View Pricing", "Ask Another Question"],
  },
]

export const quickReplies = [
  "Today's Signals",
  "Pricing Plans",
  "Join @cryptomoulay",
  "How to Pay?",
  "Win Rate?",
]

export const fallbackResponse = {
  response: "Great question! For detailed help, please contact us directly on Telegram:\n\n@cryptomoulay\n\nOur team responds within minutes!",
  quickReplies: ["Open Telegram", "View Pricing", "Ask About Signals"],
}

export function findResponse(message: string): KnowledgeItem {
  const lowerMessage = message.toLowerCase()
  
  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return item
      }
    }
  }
  
  return fallbackResponse
}
