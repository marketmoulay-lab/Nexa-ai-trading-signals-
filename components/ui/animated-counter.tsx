"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Easing function (ease out cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = easeOutCubic * value

      setCount(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, value, duration])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </motion.span>
  )
}
