"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Clock, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Telegram Support",
    description: "Get instant help from our support team",
    value: "@NexaAI_Support",
    href: "https://t.me/NexaAI_Support",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us a detailed message",
    value: "support@moulaytrading.fit",
    href: "mailto:support@moulaytrading.fit",
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "We typically respond within",
    value: "24 Hours",
    href: null,
  },
];

const faqs = [
  {
    question: "How do I receive trading signals?",
    answer: "Once subscribed, you'll receive an invitation to our private Telegram channel. All signals are delivered instantly via Telegram notifications with entry price, stop loss, and take profit levels.",
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day free trial for all plans. If you're not satisfied within the first 7 days of your paid subscription, contact us for a full refund. No questions asked.",
  },
  {
    question: "Which markets do you cover?",
    answer: "NEXA AI provides signals for Forex (major and minor pairs), Gold (XAU/USD), and major cryptocurrencies including BTC, ETH, and others.",
  },
  {
    question: "How many signals do you send per day?",
    answer: "On average, we send 3-5 high-quality signals per day. We prioritize quality over quantity - each signal is carefully analyzed by our AI before being sent.",
  },
  {
    question: "Do I need trading experience?",
    answer: "Our signals are suitable for all experience levels. Each signal comes with clear entry, stop loss, and take profit levels. We also provide educational content in our blog.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about NEXA AI? Our team is here to help you 24/7. 
              Reach out through any of our channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <method.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {method.href ? (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-primary hover:underline"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-lg font-semibold text-primary">
                        {method.value}
                      </span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We&apos;ll respond within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us more about your question..."
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mb-8">
                Quick answers to common questions about NEXA AI.
              </p>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-2xl bg-card border border-border/50"
                  >
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Global Operations</h2>
            <p className="text-muted-foreground mb-8">
              NEXA AI operates globally with team members across multiple time zones 
              to ensure 24/7 support and signal delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Remote-First Company</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <span>Telegram Priority</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
