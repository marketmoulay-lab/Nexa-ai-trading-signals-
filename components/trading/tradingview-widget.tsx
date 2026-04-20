"use client"

import { useEffect, useRef, memo } from "react"

interface TradingViewWidgetProps {
  symbol?: string
  theme?: "dark" | "light"
  interval?: string
  height?: number | string
}

function TradingViewWidgetComponent({
  symbol = "OANDA:XAUUSD",
  theme = "dark",
  interval = "60",
  height = 500,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    // Clean up previous widget
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: "Etc/UTC",
      theme: theme,
      style: "1",
      locale: "en",
      toolbar_bg: "#080D1A",
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      backgroundColor: "rgba(2, 4, 15, 1)",
      gridColor: "rgba(44, 44, 46, 0.3)",
    })

    scriptRef.current = script
    containerRef.current?.appendChild(script)

    return () => {
      if (scriptRef.current && containerRef.current?.contains(scriptRef.current)) {
        containerRef.current.removeChild(scriptRef.current)
      }
    }
  }, [symbol, theme, interval])

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden border border-border" style={{ height }}>
      <div ref={containerRef} className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }} />
    </div>
  )
}

export const TradingViewWidget = memo(TradingViewWidgetComponent)
