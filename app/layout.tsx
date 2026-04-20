import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CookieConsent } from '@/components/layout/cookie-consent'
import { NexaBot } from '@/components/chatbot/nexa-bot'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://moulaytrading.fit'),
  title: {
    default: 'NEXA AI | AI-Powered Trading Signals - 87.3% Win Rate',
    template: '%s | NEXA AI Trading Signals',
  },
  description: 'Get AI-powered trading signals for Forex, Gold, and Crypto with 87.3% verified win rate. Join 12,000+ traders using NEXA AI for real-time signals with precise entry, TP, and SL levels.',
  keywords: ['trading signals', 'AI trading', 'forex signals', 'gold trading', 'crypto signals', 'XAUUSD', 'trading bot', 'automated trading'],
  authors: [{ name: 'NEXA AI' }],
  creator: 'NEXA AI',
  publisher: 'NEXA AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moulaytrading.fit',
    siteName: 'NEXA AI Trading Signals',
    title: 'NEXA AI | AI-Powered Trading Signals - 87.3% Win Rate',
    description: 'Get AI-powered trading signals for Forex, Gold, and Crypto with 87.3% verified win rate. Join 12,000+ traders.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NEXA AI Trading Signals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXA AI | AI-Powered Trading Signals',
    description: 'Get AI-powered trading signals with 87.3% verified win rate. Join 12,000+ traders.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#02040F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <NexaBot />
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
