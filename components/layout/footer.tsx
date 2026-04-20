import Link from "next/link"
import Image from "next/image"
import { Send, Mail } from "lucide-react"

const footerLinks = {
  product: [
    { href: "/signals", label: "Live Signals" },
    { href: "/performance", label: "Performance" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "https://t.me/cryptomoulay", label: "Telegram", external: true },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/risk-disclosure", label: "Risk Disclosure" },
    { href: "/refund-policy", label: "Refund Policy" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="NEXA AI Trading"
                width={200}
                height={55}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              AI-powered trading signals for Forex, Gold, and Crypto. Join 12,000+ traders achieving 87.3% win rate.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/cryptomoulay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Send className="w-4 h-4" />
                @cryptomoulay
              </a>
              <a
                href="mailto:soholondon52@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Product</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Legal</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-destructive">Risk Warning:</strong> Trading involves substantial risk of loss and is not suitable for all investors. NEXA AI signals are for informational purposes only and do not constitute financial advice. Past performance does not guarantee future results. Never trade with money you cannot afford to lose. By using our services, you acknowledge that you understand these risks.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} NEXA AI Trading Systems. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Domain: moulaytrading.fit | Support: @cryptomoulay
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
