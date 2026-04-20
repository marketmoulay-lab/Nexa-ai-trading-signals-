"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bot, X, Send, Minus, Volume2, VolumeX, ExternalLink } from "lucide-react"
import { findResponse, quickReplies as defaultQuickReplies } from "./knowledge-base"
import Link from "next/link"

interface Message {
  id: string
  type: "bot" | "user"
  text: string
  timestamp: Date
  quickReplies?: string[]
}

const STORAGE_KEY = "nexa-bot-chat"

export function NexaBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setMessages(parsed.messages.map((m: Message) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      })))
      setHasShownWelcome(true)
    }
  }, [])

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }))
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Proactive welcome after 10 seconds
  useEffect(() => {
    if (!hasShownWelcome && messages.length === 0) {
      const timer = setTimeout(() => {
        // Show subtle pulse notification instead of opening
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [hasShownWelcome, messages.length])

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      text,
      timestamp: new Date(),
      quickReplies,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    if (!hasShownWelcome && messages.length === 0) {
      setHasShownWelcome(true)
      setTimeout(() => {
        addBotMessage(
          "Hello! I'm NEXA BOT, your AI trading assistant.\n\nHow can I help you today?",
          defaultQuickReplies
        )
      }, 500)
    }
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Show typing indicator
    setIsTyping(true)

    // Find and send response
    setTimeout(() => {
      const response = findResponse(text)
      setIsTyping(false)
      addBotMessage(response.response, response.quickReplies)
    }, 800 + Math.random() * 700)
  }

  const handleQuickReply = (reply: string) => {
    // Handle special quick replies
    if (reply === "Open Telegram" || reply === "Join Telegram" || reply === "Join @cryptomoulay") {
      window.open("https://t.me/cryptomoulay", "_blank")
      return
    }
    if (reply === "View Pricing" || reply === "Pricing Plans") {
      window.location.href = "/pricing"
      return
    }
    if (reply === "View Performance") {
      window.location.href = "/performance"
      return
    }

    // Regular quick reply - treat as message
    setInputValue(reply)
    setTimeout(() => handleSend(), 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
    setHasShownWelcome(false)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg animate-pulse-glow hover:scale-110 transition-transform"
            aria-label="Open chat"
          >
            <Bot className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "min(600px, 80vh)",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] glass-card overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-sm">
                    NEXA BOT
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-buy animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online 24/7</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={soundEnabled ? "Mute" : "Unmute"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {message.quickReplies && message.type === "bot" && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.quickReplies.map((reply) => (
                              <button
                                key={reply}
                                onClick={() => handleQuickReply(reply)}
                                className="px-3 py-1.5 text-xs rounded-full bg-background/50 text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-background-card">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button
                      size="icon"
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Footer Links */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <button
                      onClick={clearChat}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear chat
                    </button>
                    <Link
                      href="https://t.me/cryptomoulay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Need more help? @cryptomoulay
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
