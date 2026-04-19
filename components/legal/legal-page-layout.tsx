"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Link from "next/link";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/risk-disclosure", label: "Risk Disclosure" },
  { href: "/legal/refund", label: "Refund Policy" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
  { href: "/legal/aml", label: "AML Policy" },
];

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{title}</h1>
            <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Legal Documents
                </h3>
                <nav className="space-y-2">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 rounded-lg text-sm hover:bg-card hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="prose prose-invert prose-lg max-w-none">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
