"use client";

import { useState } from "react";

/**
 * AffiliateSidebar
 * ديزاين Bloomberg-terminal-style باش يتلائم مع Nexa AI theme
 * حط هاد الملف فـ components/AffiliateSidebar.tsx
 * وزيدو فـ app/layout.tsx جنب المحتوى الرئيسي
 *
 * ⚠️ بدّل الروابط لي مكتوب عليهم "REPLACE_ME" بالكود ديالك ديال الأفيلييت
 */

type AffiliateLink = {
  name: string;
  tag: string; // نوع (Exchange / Prop Firm / Broker)
  url: string;
  accent: string; // hex color خاص بكل منصة
  mono: string; // مونوغرام (2-3 حروف) كأيقونة
};

const LINKS: AffiliateLink[] = [
  {
    name: "Binance P2P",
    tag: "Exchange",
    url: "https://www.binance.com/en/activity/referral-entry/CPA?ref=REPLACE_ME",
    accent: "#F0B90B",
    mono: "BN",
  },
  {
    name: "Bybit",
    tag: "Exchange",
    url: "https://www.bybit.com/invite?ref=157970",
    accent: "#F7A600",
    mono: "BY",
  },
  {
    name: "OKX",
    tag: "Exchange",
    url: "https://www.okx.com/join/31050757",
    accent: "#00D4B5",
    mono: "OK",
  },
  {
    name: "BingX",
    tag: "Exchange",
    url: "https://bingx.com/invite/REPLACE_ME",
    accent: "#1F5CFF",
    mono: "BX",
  },
  {
    name: "KuCoin",
    tag: "Exchange",
    url: "https://www.kucoin.com/r/rf/QBSAKVY7",
    accent: "#24AE8F",
    mono: "KC",
  },
  {
    name: "XM",
    tag: "Broker",
    url: "https://www.xm.com/ref/REPLACE_ME",
    accent: "#E4002B",
    mono: "XM",
  },
  {
    name: "PropFirmMatch",
    tag: "Prop Firm",
    url: "https://propfirmmatch.com/?a_aid=moulay",
    accent: "#7C5CFC",
    mono: "PFM",
  },
  {
    name: "Earn2Trade",
    tag: "Prop Firm",
    url: "https://www.earn2trade.com/?a_pid=non&a_bid=8d7b4b9e",
    accent: "#00C2FF",
    mono: "E2T",
  },
];

export default function AffiliateSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 h-screen shrink-0 border-l border-neutral-800 bg-[#0A0B0D] transition-all duration-200 ${
        collapsed ? "w-12" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-3">
        {!collapsed && (
          <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            Partners
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-neutral-500 hover:text-neutral-200"
          aria-label={collapsed ? "Expand partners panel" : "Collapse partners panel"}
        >
          {collapsed ? "«" : "»"}
        </button>
      </div>

      {!collapsed && (
        <div className="flex flex-col gap-1 p-2">
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex items-center justify-between rounded-md border border-transparent px-3 py-2.5 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-bold text-black"
                  style={{ backgroundColor: link.accent }}
                >
                  {link.mono}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-neutral-200">
                    {link.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                    {link.tag}
                  </span>
                </div>
              </div>
              <span className="text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-300">
                →
              </span>
            </a>
          ))}

          <p className="mt-2 px-3 text-[10px] leading-relaxed text-neutral-600">
            روابط برعاية. قد نربح عمولة من التسجيل عبر هاد الروابط دون أي تكلفة إضافية عليك.
          </p>
        </div>
      )}
    </aside>
  );
}
