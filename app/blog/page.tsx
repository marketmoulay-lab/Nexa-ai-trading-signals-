"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { blogPosts, categories } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Search, Clock, ArrowRight, BookOpen } from "lucide-react"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">NEXA AI Trading Academy</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Learn to Trade Smarter
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Expert insights on AI trading, forex, gold, crypto, and proven strategies to improve your trading.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="glass-card p-6 md:p-8 neon-border hover:glow-primary transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4">
                      Featured
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{featuredPost.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                      <span className="text-primary">{featuredPost.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <article className="glass-card p-6 h-full flex flex-col hover:neon-border transition-all">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium mb-4 w-fit">
                    {post.category}
                  </span>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
            <Button variant="outline" onClick={() => { setSelectedCategory("All"); setSearchQuery("") }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 inline-block">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
              Ready to Apply What You&apos;ve Learned?
            </h3>
            <p className="text-muted-foreground mb-4">
              Join @cryptomoulay for real-time AI trading signals.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="https://t.me/cryptomoulay" target="_blank" rel="noopener noreferrer">
                Get Live Signals
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
