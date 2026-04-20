"use client"

import { motion } from "framer-motion"

export function AuroraBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Aurora gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          {/* Primary aurora */}
          <div
            className="absolute -top-1/2 -left-1/4 w-full h-full opacity-30"
            style={{
              background: "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(0, 255, 178, 0.3), transparent 70%)",
            }}
          />
          {/* Secondary aurora */}
          <div
            className="absolute -top-1/4 right-0 w-3/4 h-3/4 opacity-20"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 80% 30%, rgba(41, 121, 255, 0.3), transparent 70%)",
            }}
          />
          {/* Accent aurora */}
          <div
            className="absolute bottom-0 left-1/4 w-1/2 h-1/2 opacity-15"
            style={{
              background: "radial-gradient(ellipse 50% 30% at 50% 80%, rgba(191, 90, 242, 0.3), transparent 70%)",
            }}
          />
        </motion.div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              animate={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
