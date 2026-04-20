"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Zap, TrendingUp, DollarSign, BookOpen, Users, MessageSquare } from "lucide-react"

const navLinks = [
  { href: "/signals", label: "Signals", icon: Zap },
  { href: "/performance", label: "Performance", icon: TrendingUp },
  { href: "/pricing", label: "Pricing", icon: DollarSign },
  { href: "/blog", label: "Blog", icon: BookOpen },
  {
    label: "More",
    icon: ChevronDown,
    children: [
      { href: "/about", label: "About", icon: Users },
      { href: "/contact", label: "Contact", icon: MessageSquare },
    ],
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo.png"
            alt="NEXA AI Trading"
            width={180}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 glass-card p-2"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <child.icon className="w-4 h-4" />
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
              Join Telegram
            </a>
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
            <Link href="/pricing">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="flex flex-col">
                    <span className="px-4 py-2 text-sm text-muted-foreground">{link.label}</span>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 px-6 py-2 text-sm text-foreground hover:bg-white/5 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <child.icon className="w-4 h-4 text-primary" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-white/5 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="w-4 h-4 text-primary" />
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                    Join Telegram
                  </a>
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground" asChild>
                  <Link href="/pricing">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
