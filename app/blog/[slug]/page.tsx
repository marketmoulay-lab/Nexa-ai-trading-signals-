"use client"

import { use } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  Twitter,
  Linkedin,
  Send,
  ArrowRight,
} from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export default function BlogArticlePage({ params }: Props) {
  const resolvedParams = use(params)
  const post = getBlogPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category)

  const shareOnTwitter = () => {
    const url = `https://moulaytrading.fit/blog/${post.slug}`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`,
      "_blank"
    )
  }

  const shareOnLinkedIn = () => {
    const url = `https://moulaytrading.fit/blog/${post.slug}`
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    )
  }

  const shareOnTelegram = () => {
    const url = `https://moulaytrading.fit/blog/${post.slug}`
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
      "_blank"
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4">
                {post.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-foreground leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/^# (.+)$/gm, '<h1 class="font-heading text-3xl font-bold text-foreground mt-8 mb-4">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="font-heading text-2xl font-bold text-foreground mt-8 mb-4">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="font-heading text-xl font-semibold text-foreground mt-6 mb-3">$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    .replace(/^- (.+)$/gm, '<li class="text-muted-foreground ml-4">$1</li>')
                    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-muted-foreground ml-4">$2</li>')
                    .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono"><code>$1</code></pre>')
                    .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-primary text-sm font-mono">$1</code>')
                    .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed">')
                    .replace(/^\|(.+)\|$/gm, (match) => {
                      const cells = match.split('|').filter(Boolean)
                      return `<tr>${cells.map(c => `<td class="border border-border px-4 py-2">${c.trim()}</td>`).join('')}</tr>`
                    })
                }}
              />
            </div>

            {/* CTA Box */}
            <div className="mt-12 glass-card p-6 neon-border">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                Ready to Trade with AI?
              </h3>
              <p className="text-muted-foreground mb-4">
                Join 12,000+ traders using NEXA AI signals. Get started for free today.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                    <Send className="w-4 h-4 mr-2" />
                    Join @cryptomoulay
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share this article
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={shareOnTwitter}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={shareOnTelegram}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                    aria-label="Share on Telegram"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Sticky Container */}
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Quick Actions */}
              <div className="glass-card p-4">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="sm" asChild>
                    <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                      <Send className="w-4 h-4 mr-2" />
                      Get Free Signals
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" size="sm" asChild>
                    <Link href="/signals">View Live Signals</Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="sm" asChild>
                    <Link href="/performance">Check Performance</Link>
                  </Button>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="glass-card p-4">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {related.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="glass-card p-4">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["AI Trading", "Forex", "Gold", "Crypto", "Strategy"].map((cat) => (
                    <Link
                      key={cat}
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
