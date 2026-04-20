"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cookie, X } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allConsent = { necessary: true, analytics: true, marketing: true }
    localStorage.setItem("cookie-consent", JSON.stringify(allConsent))
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const minimalConsent = { necessary: true, analytics: false, marketing: false }
    localStorage.setItem("cookie-consent", JSON.stringify(minimalConsent))
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    setIsVisible(false)
    setShowPreferences(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="glass-card p-6 relative">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {!showPreferences ? (
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        We value your privacy
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We use cookies to enhance your browsing experience and analyze our traffic.
                        By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                        <Link href="/cookie-policy" className="text-primary hover:underline">
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPreferences(true)}
                    >
                      Manage
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRejectAll}
                    >
                      Reject All
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleAcceptAll}
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-foreground">
                      Cookie Preferences
                    </h3>
                    <button
                      onClick={() => setShowPreferences(false)}
                      className="text-sm text-primary hover:underline"
                    >
                      Back
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">Necessary</p>
                        <p className="text-xs text-muted-foreground">
                          Required for the website to function properly
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="w-5 h-5 accent-primary"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-foreground">Analytics</p>
                        <p className="text-xs text-muted-foreground">
                          Help us understand how visitors interact with our website
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="w-5 h-5 accent-primary cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-foreground">Marketing</p>
                        <p className="text-xs text-muted-foreground">
                          Used to deliver personalized advertisements
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) =>
                          setPreferences({ ...preferences, marketing: e.target.checked })
                        }
                        className="w-5 h-5 accent-primary cursor-pointer"
                      />
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRejectAll}
                    >
                      Reject All
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleSavePreferences}
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
