"use client";

import { motion } from "framer-motion";
import { Bot, Target, Shield, TrendingUp, Users, Award, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Signals Generated", value: "50,000+", icon: Zap },
  { label: "Active Traders", value: "10,000+", icon: Users },
  { label: "Win Rate", value: "87.3%", icon: Target },
  { label: "Countries", value: "120+", icon: Globe },
];

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Our AI analyzes millions of data points to deliver signals with surgical precision, ensuring every trade recommendation is backed by robust analysis.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Transparency is at our core. We publish verified performance metrics and never manipulate results. What you see is what you get.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "We're committed to continuous improvement. Our algorithms evolve daily, learning from market patterns to stay ahead of the curve.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a thriving community of traders. Share insights, learn from experts, and grow together in our private Telegram channels.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "The Beginning",
    description: "NEXA AI was founded with a vision to democratize AI-powered trading signals for retail traders worldwide.",
  },
  {
    year: "2022",
    title: "AI Engine Launch",
    description: "Released our proprietary AI engine capable of analyzing 50+ technical indicators and sentiment data in real-time.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded to 100+ countries with multi-language support and 24/7 signal delivery via Telegram.",
  },
  {
    year: "2024",
    title: "Performance Milestone",
    description: "Achieved 87.3% win rate across 50,000+ signals, establishing NEXA AI as a market leader.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Bot className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">About NEXA AI</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Revolutionizing Trading with{" "}
              <span className="text-primary">Artificial Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              NEXA AI combines cutting-edge machine learning with decades of trading expertise 
              to deliver institutional-grade signals to retail traders worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that every trader deserves access to the same powerful tools 
                that institutional investors use. Our mission is to level the playing field 
                by providing AI-powered trading signals that are accurate, timely, and actionable.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Through continuous innovation and a relentless focus on quality, we aim to 
                help traders around the world achieve their financial goals with confidence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/signals">
                  <Button size="lg" className="gap-2">
                    <Zap className="w-5 h-5" />
                    View Live Signals
                  </Button>
                </Link>
                <Link href="/performance">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Award className="w-5 h-5" />
                    See Performance
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 border border-primary/20">
                <div className="w-full h-full rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                  <Bot className="w-32 h-32 text-primary/50" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-primary/20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at NEXA AI
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a global trading signals platform
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center font-bold text-primary">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-4" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Trade Smarter?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of traders who trust NEXA AI for their trading signals.
              Start your journey today with our 7-day free trial.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/pricing">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
