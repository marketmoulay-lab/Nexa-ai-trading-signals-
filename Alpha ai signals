<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Alpha AI Signals — إشارات التداول بالذكاء الاصطناعي</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --gold: #C9A84C;
    --gold-light: #F0C040;
    --gold-glow: rgba(201,168,76,0.35);
    --green: #00E5A0;
    --red: #FF4D6A;
    --bg: #03060F;
    --bg2: #060D1A;
    --bg3: #091222;
    --border: rgba(201,168,76,0.15);
    --text: #E8EAF0;
    --text-dim: #7A8299;
    --font-display: 'Orbitron', monospace;
    --font-body: 'Tajawal', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom cursor */
  .cursor {
    position: fixed;
    width: 12px; height: 12px;
    background: var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: screen;
  }
  .cursor-ring {
    position: fixed;
    width: 36px; height: 36px;
    border: 1px solid var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.15s ease;
    opacity: 0.5;
  }

  /* Grid noise overlay */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  /* ===== NAV ===== */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 60px;
    background: linear-gradient(180deg, rgba(3,6,15,0.95) 0%, transparent 100%);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none;
  }

  .logo-icon {
    width: 38px; height: 38px;
    border: 1.5px solid var(--gold);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .logo-icon::before {
    content: 'α';
    font-family: var(--font-display);
    font-size: 20px;
    color: var(--gold);
    font-weight: 900;
  }
  .logo-icon::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-glow), transparent);
  }

  .logo-text {
    font-family: var(--font-display);
    font-size: 14px;
    letter-spacing: 2px;
    color: var(--text);
  }
  .logo-text span { color: var(--gold); }

  .nav-links {
    display: flex; align-items: center; gap: 40px;
    list-style: none;
  }
  .nav-links a {
    color: var(--text-dim);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--gold); }

  .nav-cta {
    display: flex; gap: 12px;
  }

  .btn {
    padding: 10px 24px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 700;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.25s ease;
    letter-spacing: 0.5px;
  }
  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-dim);
  }
  .btn-ghost:hover {
    border-color: var(--gold);
    color: var(--gold);
  }
  .btn-gold {
    background: linear-gradient(135deg, #C9A84C, #F0C040);
    border: none;
    color: #050A15;
  }
  .btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(201,168,76,0.4);
  }

  /* ===== HERO ===== */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 140px 60px 80px;
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 20%, rgba(0,229,160,0.04) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 10% 80%, rgba(201,168,76,0.04) 0%, transparent 60%);
  }

  .hero-content {
    position: relative; z-index: 2;
    max-width: 680px;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.25);
    border-radius: 100px;
    font-size: 12px;
    color: var(--gold);
    letter-spacing: 1px;
    margin-bottom: 32px;
    font-weight: 600;
  }
  .badge-dot {
    width: 6px; height: 6px;
    background: var(--green);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,229,160,0.5); }
    50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(0,229,160,0); }
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(38px, 5vw, 68px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -1px;
    margin-bottom: 24px;
  }
  .hero h1 .line1 { color: var(--text); display: block; }
  .hero h1 .line2 {
    display: block;
    background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-desc {
    font-size: 18px;
    line-height: 1.75;
    color: var(--text-dim);
    margin-bottom: 44px;
    max-width: 520px;
    font-weight: 400;
  }

  .hero-actions {
    display: flex; gap: 16px; align-items: center;
    margin-bottom: 64px;
  }

  .hero-stats {
    display: flex; gap: 40px;
    padding-top: 32px;
    border-top: 1px solid var(--border);
  }
  .stat-item {}
  .stat-val {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 700;
    color: var(--gold);
  }
  .stat-label {
    font-size: 12px;
    color: var(--text-dim);
    margin-top: 4px;
    letter-spacing: 0.5px;
  }

  /* Floating signal cards */
  .hero-visual {
    position: absolute;
    left: 60px; top: 50%;
    transform: translateY(-50%);
    width: 460px;
    display: flex; flex-direction: column; gap: 12px;
    z-index: 2;
  }

  .signal-card {
    background: rgba(6,13,26,0.9);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex; align-items: center; gap: 16px;
    backdrop-filter: blur(20px);
    animation: floatIn 0.6s ease both;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .signal-card:hover {
    transform: translateX(-4px);
    box-shadow: 0 0 30px rgba(201,168,76,0.1);
  }
  .signal-card:nth-child(1) { animation-delay: 0.2s; }
  .signal-card:nth-child(2) { animation-delay: 0.4s; margin-right: 30px; }
  .signal-card:nth-child(3) { animation-delay: 0.6s; }
  .signal-card:nth-child(4) { animation-delay: 0.8s; margin-right: 20px; }

  @keyframes floatIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .signal-type {
    width: 42px; height: 42px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .signal-type.buy { background: rgba(0,229,160,0.12); color: var(--green); border: 1px solid rgba(0,229,160,0.2); }
  .signal-type.sell { background: rgba(255,77,106,0.12); color: var(--red); border: 1px solid rgba(255,77,106,0.2); }

  .signal-info { flex: 1; }
  .signal-pair {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 1px;
  }
  .signal-action {
    font-size: 11px;
    color: var(--text-dim);
    margin-top: 2px;
  }

  .signal-profit {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
  }
  .profit-pos { color: var(--green); }
  .profit-neg { color: var(--red); }

  .signal-live {
    display: flex; align-items: center; gap: 5px;
    font-size: 10px;
    color: var(--green);
    letter-spacing: 0.5px;
  }
  .signal-live-dot {
    width: 5px; height: 5px;
    background: var(--green);
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }

  /* ===== SECTION COMMON ===== */
  section {
    position: relative;
    padding: 100px 60px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--gold);
    font-weight: 700;
    margin-bottom: 16px;
    text-transform: uppercase;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.5vw, 46px);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }
  .section-sub {
    font-size: 17px;
    color: var(--text-dim);
    line-height: 1.7;
    max-width: 520px;
  }

  /* ===== TICKER ===== */
  .ticker-strip {
    background: var(--bg2);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 14px 0;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  .ticker-track {
    display: flex;
    gap: 0;
    animation: tickerMove 30s linear infinite;
    width: max-content;
  }
  @keyframes tickerMove {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 0 30px;
    border-right: 1px solid var(--border);
    white-space: nowrap;
  }
  .ticker-sym {
    font-family: var(--font-display);
    font-size: 12px;
    color: var(--text);
    letter-spacing: 1px;
  }
  .ticker-price { font-size: 13px; font-weight: 600; }
  .ticker-change { font-size: 11px; font-weight: 700; }
  .up { color: var(--green); }
  .down { color: var(--red); }

  /* ===== HOW IT WORKS ===== */
  .how-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin-top: 72px;
  }
  .how-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    padding: 48px 40px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
  }
  .how-card:hover { border-color: rgba(201,168,76,0.4); }
  .how-card:hover .how-num { opacity: 1; }
  .how-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .how-card:hover::before { opacity: 1; }

  .how-num {
    font-family: var(--font-display);
    font-size: 80px;
    font-weight: 900;
    color: rgba(201,168,76,0.06);
    position: absolute;
    top: 16px; left: 24px;
    line-height: 1;
    transition: opacity 0.3s;
    opacity: 0.5;
  }

  .how-icon {
    font-size: 32px;
    margin-bottom: 24px;
    position: relative; z-index: 1;
  }
  .how-title {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 16px;
    letter-spacing: 0.5px;
  }
  .how-desc {
    font-size: 15px;
    color: var(--text-dim);
    line-height: 1.7;
  }

  /* ===== FEATURES ===== */
  .features-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    margin-top: 72px;
  }

  .features-list {
    display: flex; flex-direction: column; gap: 4px;
  }
  .feature-item {
    display: flex; gap: 20px;
    padding: 28px 0;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.2s;
  }
  .feature-item:last-child { border-bottom: none; }
  .feature-item.active .feat-icon-wrap { border-color: var(--gold); background: rgba(201,168,76,0.1); }
  .feature-item.active .feat-title { color: var(--gold); }
  .feature-item.active .feat-bar { width: 100%; }

  .feat-icon-wrap {
    width: 48px; height: 48px;
    border-radius: 10px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    transition: all 0.3s;
  }
  .feat-content { flex: 1; }
  .feat-title {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 8px;
    letter-spacing: 0.5px;
    transition: color 0.3s;
  }
  .feat-desc { font-size: 14px; color: var(--text-dim); line-height: 1.6; }
  .feat-bar-wrap {
    width: 100%; height: 1px;
    background: var(--border);
    margin-top: 12px;
    border-radius: 2px;
    overflow: hidden;
  }
  .feat-bar {
    height: 100%;
    background: var(--gold);
    width: 0;
    transition: width 3s linear;
  }

  .features-visual {
    position: relative;
  }
  .chart-mock {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    overflow: hidden;
  }
  .chart-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 24px;
  }
  .chart-pair {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }
  .chart-badge {
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  .badge-buy { background: rgba(0,229,160,0.12); color: var(--green); }
  .badge-sell { background: rgba(255,77,106,0.12); color: var(--red); }

  /* SVG chart */
  .chart-svg { width: 100%; }

  .chart-metrics {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
  }
  .chart-metric {
    background: var(--bg3);
    padding: 14px 16px;
  }
  .metric-label { font-size: 11px; color: var(--text-dim); margin-bottom: 4px; letter-spacing: 0.5px; }
  .metric-val {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
  }

  /* ===== PRICING ===== */
  .pricing-section { background: var(--bg2); }
  .pricing-toggle {
    display: flex; align-items: center; gap: 16px;
    margin: 48px 0 0;
    font-size: 14px; color: var(--text-dim);
  }
  .toggle-switch {
    width: 48px; height: 26px;
    background: rgba(201,168,76,0.2);
    border-radius: 100px;
    cursor: pointer;
    position: relative;
    transition: background 0.3s;
    border: 1px solid var(--gold);
  }
  .toggle-switch::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 18px; height: 18px;
    background: var(--gold);
    border-radius: 50%;
    transition: left 0.3s;
  }
  .toggle-switch.active { background: rgba(201,168,76,0.3); }
  .toggle-switch.active::after { left: 25px; }
  .save-badge {
    background: rgba(0,229,160,0.1);
    border: 1px solid rgba(0,229,160,0.3);
    color: var(--green);
    padding: 2px 10px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
  }

  .plans-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 48px;
  }
  .plan-card {
    border-radius: 16px;
    padding: 40px 32px;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--bg);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .plan-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .plan-card.featured {
    border-color: var(--gold);
    background: linear-gradient(180deg, rgba(201,168,76,0.05) 0%, var(--bg) 60%);
  }
  .plan-card.featured::before {
    content: 'الأكثر شعبية ⭐';
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    color: #050A15;
    font-size: 11px;
    font-weight: 800;
    padding: 5px 20px;
    border-radius: 0 0 10px 10px;
    letter-spacing: 0.5px;
  }

  .plan-name {
    font-family: var(--font-display);
    font-size: 13px;
    letter-spacing: 2px;
    color: var(--gold);
    margin-bottom: 20px;
  }
  .plan-price {
    margin-bottom: 8px;
  }
  .plan-amount {
    font-family: var(--font-display);
    font-size: 52px;
    font-weight: 900;
    line-height: 1;
    color: var(--text);
  }
  .plan-currency { font-size: 22px; color: var(--text-dim); vertical-align: top; margin-top: 12px; display: inline-block; }
  .plan-period { font-size: 14px; color: var(--text-dim); margin-bottom: 28px; }
  .plan-desc { font-size: 14px; color: var(--text-dim); line-height: 1.6; margin-bottom: 32px; }

  .plan-features { list-style: none; margin-bottom: 36px; }
  .plan-features li {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 14px;
    color: var(--text-dim);
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .plan-features li:last-child { border-bottom: none; }
  .plan-features li::before {
    content: '✓';
    color: var(--green);
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .plan-features li.disabled { opacity: 0.35; }
  .plan-features li.disabled::before { content: '✕'; color: var(--text-dim); }

  /* ===== TESTIMONIALS ===== */
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 64px;
  }
  .testimonial-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 32px 28px;
    transition: border-color 0.3s;
  }
  .testimonial-card:hover { border-color: rgba(201,168,76,0.3); }

  .stars { color: var(--gold); font-size: 14px; margin-bottom: 18px; letter-spacing: 2px; }
  .testimonial-text {
    font-size: 15px;
    color: var(--text-dim);
    line-height: 1.75;
    margin-bottom: 24px;
  }
  .testimonial-author {
    display: flex; align-items: center; gap: 12px;
  }
  .author-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    background: var(--bg3);
  }
  .author-name { font-size: 14px; font-weight: 700; color: var(--text); }
  .author-role { font-size: 12px; color: var(--text-dim); margin-top: 2px; }
  .author-profit { font-family: var(--font-display); font-size: 12px; color: var(--green); margin-top: 2px; }

  /* ===== CTA ===== */
  .cta-section {
    text-align: center;
    padding: 120px 60px;
    position: relative;
    overflow: hidden;
  }
  .cta-section::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%);
  }
  .cta-section .section-title { margin: 0 auto 16px; max-width: 600px; }
  .cta-section .section-sub { margin: 0 auto 44px; text-align: center; }
  .cta-actions { display: flex; gap: 16px; justify-content: center; }

  /* ===== FOOTER ===== */
  footer {
    background: var(--bg2);
    border-top: 1px solid var(--border);
    padding: 60px;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px;
    margin-bottom: 48px;
  }
  .footer-brand-desc {
    font-size: 14px;
    color: var(--text-dim);
    line-height: 1.7;
    margin: 16px 0 24px;
  }
  .footer-social { display: flex; gap: 10px; }
  .social-btn {
    width: 36px; height: 36px;
    border-radius: 8px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }
  .social-btn:hover { border-color: var(--gold); background: rgba(201,168,76,0.08); }

  .footer-col-title {
    font-family: var(--font-display);
    font-size: 12px;
    letter-spacing: 1.5px;
    color: var(--gold);
    margin-bottom: 20px;
  }
  .footer-links { list-style: none; }
  .footer-links li { margin-bottom: 10px; }
  .footer-links a {
    font-size: 14px;
    color: var(--text-dim);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--text); }

  .footer-bottom {
    padding-top: 28px;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy { font-size: 13px; color: var(--text-dim); }
  .footer-legal { display: flex; gap: 24px; }
  .footer-legal a { font-size: 13px; color: var(--text-dim); text-decoration: none; }
  .footer-legal a:hover { color: var(--text); }

  /* ===== ANIMATIONS ===== */
  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    nav { padding: 20px 30px; }
    section { padding: 80px 30px; }
    .hero { padding: 140px 30px 80px; }
    .hero-visual { display: none; }
    .how-grid { grid-template-columns: 1fr 1fr; }
    .plans-grid { grid-template-columns: 1fr; max-width: 400px; margin-left: auto; margin-right: auto; }
    .testimonials-grid { grid-template-columns: 1fr 1fr; }
    .features-layout { grid-template-columns: 1fr; gap: 40px; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 600px) {
    .nav-links { display: none; }
    .how-grid { grid-template-columns: 1fr; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .hero-stats { flex-wrap: wrap; gap: 24px; }
  }
</style>
</head>
<body>

<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">
    <div class="logo-icon"></div>
    <div class="logo-text">ALPHA <span>AI</span> SIGNALS</div>
  </a>
  <ul class="nav-links">
    <li><a href="#how">كيف يعمل</a></li>
    <li><a href="#features">المميزات</a></li>
    <li><a href="#pricing">الأسعار</a></li>
    <li><a href="#testimonials">آراء العملاء</a></li>
  </ul>
  <div class="nav-cta">
    <a href="#" class="btn btn-ghost">تسجيل الدخول</a>
    <a href="#" class="btn btn-gold">ابدأ مجاناً ◀</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>

  <div class="hero-content">
    <div class="hero-badge">
      <span class="badge-dot"></span>
      إشارات حية الآن — 47 إشارة نشطة
    </div>
    <h1>
      <span class="line1">تداول بذكاء</span>
      <span class="line2">مع الذكاء الاصطناعي</span>
    </h1>
    <p class="hero-desc">
      إشارات تداول دقيقة مدعومة بالذكاء الاصطناعي المتقدم. تحليل السوق في الوقت الفعلي، إدارة المخاطر الذكية، وأرباح موثّقة تصل إلى 340%.
    </p>
    <div class="hero-actions">
      <a href="#pricing" class="btn btn-gold" style="padding:14px 32px; font-size:15px;">ابدأ تجربتك المجانية ◀</a>
      <a href="#how" class="btn btn-ghost" style="padding:14px 24px; font-size:15px;">كيف يعمل؟</a>
    </div>
    <div class="hero-stats">
      <div class="stat-item">
        <div class="stat-val" data-count="94">0%</div>
        <div class="stat-label">دقة الإشارات</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" data-count="12500">0+</div>
        <div class="stat-label">متداول نشط</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" data-count="340">0%</div>
        <div class="stat-label">متوسط العائد السنوي</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" data-count="4.9">0</div>
        <div class="stat-label">تقييم المستخدمين</div>
      </div>
    </div>
  </div>

  <!-- Floating signal cards on left side -->
  <div class="hero-visual">
    <div class="signal-card">
      <div class="signal-type buy">▲</div>
      <div class="signal-info">
        <div class="signal-pair">BTC/USDT</div>
        <div class="signal-action">شراء • دخول: $67,420</div>
      </div>
      <div>
        <div class="signal-profit profit-pos">+8.4%</div>
        <div class="signal-live"><span class="signal-live-dot"></span> مباشر</div>
      </div>
    </div>
    <div class="signal-card">
      <div class="signal-type buy">▲</div>
      <div class="signal-info">
        <div class="signal-pair">EUR/USD</div>
        <div class="signal-action">شراء • دخول: 1.0892</div>
      </div>
      <div>
        <div class="signal-profit profit-pos">+3.1%</div>
        <div class="signal-live"><span class="signal-live-dot"></span> مباشر</div>
      </div>
    </div>
    <div class="signal-card">
      <div class="signal-type sell" style="color:var(--red);">▼</div>
      <div class="signal-info">
        <div class="signal-pair">GOLD/USD</div>
        <div class="signal-action">بيع • دخول: $2,341</div>
      </div>
      <div>
        <div class="signal-profit profit-neg">-1.2%</div>
        <div class="signal-live" style="color:var(--text-dim)"><span class="signal-live-dot" style="background:var(--text-dim)"></span> مغلق</div>
      </div>
    </div>
    <div class="signal-card">
      <div class="signal-type buy">▲</div>
      <div class="signal-info">
        <div class="signal-pair">ETH/USDT</div>
        <div class="signal-action">شراء • دخول: $3,812</div>
      </div>
      <div>
        <div class="signal-profit profit-pos">+14.7%</div>
        <div class="signal-live"><span class="signal-live-dot"></span> مباشر</div>
      </div>
    </div>
  </div>
</section>

<!-- TICKER -->
<div class="ticker-strip">
  <div class="ticker-track" id="tickerTrack">
    <!-- repeated twice for seamless loop -->
    <div class="ticker-item"><span class="ticker-sym">BTC/USDT</span><span class="ticker-price up">$68,242</span><span class="ticker-change up">+2.41%</span></div>
    <div class="ticker-item"><span class="ticker-sym">ETH/USDT</span><span class="ticker-price up">$3,891</span><span class="ticker-change up">+1.87%</span></div>
    <div class="ticker-item"><span class="ticker-sym">EUR/USD</span><span class="ticker-price down">1.0834</span><span class="ticker-change down">-0.22%</span></div>
    <div class="ticker-item"><span class="ticker-sym">GOLD</span><span class="ticker-price up">$2,358</span><span class="ticker-change up">+0.91%</span></div>
    <div class="ticker-item"><span class="ticker-sym">S&P 500</span><span class="ticker-price up">5,248</span><span class="ticker-change up">+0.64%</span></div>
    <div class="ticker-item"><span class="ticker-sym">BNB/USDT</span><span class="ticker-price down">$584</span><span class="ticker-change down">-1.03%</span></div>
    <div class="ticker-item"><span class="ticker-sym">SOL/USDT</span><span class="ticker-price up">$178</span><span class="ticker-change up">+4.12%</span></div>
    <div class="ticker-item"><span class="ticker-sym">OIL/USD</span><span class="ticker-price down">$82.4</span><span class="ticker-change down">-0.58%</span></div>
    <div class="ticker-item"><span class="ticker-sym">GBP/USD</span><span class="ticker-price up">1.2645</span><span class="ticker-change up">+0.14%</span></div>
    <div class="ticker-item"><span class="ticker-sym">BTC/USDT</span><span class="ticker-price up">$68,242</span><span class="ticker-change up">+2.41%</span></div>
    <div class="ticker-item"><span class="ticker-sym">ETH/USDT</span><span class="ticker-price up">$3,891</span><span class="ticker-change up">+1.87%</span></div>
    <div class="ticker-item"><span class="ticker-sym">EUR/USD</span><span class="ticker-price down">1.0834</span><span class="ticker-change down">-0.22%</span></div>
    <div class="ticker-item"><span class="ticker-sym">GOLD</span><span class="ticker-price up">$2,358</span><span class="ticker-change up">+0.91%</span></div>
    <div class="ticker-item"><span class="ticker-sym">S&P 500</span><span class="ticker-price up">5,248</span><span class="ticker-change up">+0.64%</span></div>
    <div class="ticker-item"><span class="ticker-sym">BNB/USDT</span><span class="ticker-price down">$584</span><span class="ticker-change down">-1.03%</span></div>
    <div class="ticker-item"><span class="ticker-sym">SOL/USDT</span><span class="ticker-price up">$178</span><span class="ticker-change up">+4.12%</span></div>
    <div class="ticker-item"><span class="ticker-sym">OIL/USD</span><span class="ticker-price down">$82.4</span><span class="ticker-change down">-0.58%</span></div>
    <div class="ticker-item"><span class="ticker-sym">GBP/USD</span><span class="ticker-price up">1.2645</span><span class="ticker-change up">+0.14%</span></div>
  </div>
</div>

<!-- HOW IT WORKS -->
<section id="how">
  <div class="fade-up">
    <div class="section-label">آلية العمل</div>
    <div class="section-title">ثلاث خطوات للربح<br>الذكي والمستدام</div>
    <div class="section-sub">نحن نتعامل مع التعقيد حتى تتمكن أنت من التركيز على ما يهمك — تحقيق الأرباح.</div>
  </div>
  <div class="how-grid fade-up">
    <div class="how-card">
      <div class="how-num">01</div>
      <div class="how-icon">🤖</div>
      <div class="how-title">تحليل الذكاء الاصطناعي</div>
      <div class="how-desc">يحلل نموذجنا أكثر من 200 متغير في الوقت الفعلي — بيانات السوق، الأخبار، المشاعر الاجتماعية، والنماذج التقنية — لاكتشاف الفرص قبل السوق بلحظات.</div>
    </div>
    <div class="how-card">
      <div class="how-num">02</div>
      <div class="how-icon">⚡</div>
      <div class="how-title">إشارة فورية ودقيقة</div>
      <div class="how-desc">تصلك الإشارة فوراً عبر الموقع، التطبيق، والتيليغرام — مع سعر الدخول، الهدف، ووقف الخسارة المحدد بدقة. لا تخمينات.</div>
    </div>
    <div class="how-card">
      <div class="how-num">03</div>
      <div class="how-icon">📈</div>
      <div class="how-title">ربح محسوب ومدار</div>
      <div class="how-desc">يتابع النظام الصفقة ويُعدّل التوصيات في الوقت الفعلي. إدارة مخاطر ذكية لحماية رأس مالك وتعظيم أرباحك.</div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section id="features" style="background: var(--bg2);">
  <div class="fade-up">
    <div class="section-label">المميزات</div>
    <div class="section-title">كل ما تحتاجه<br>في منصة واحدة</div>
  </div>
  <div class="features-layout">
    <div class="features-list fade-up">
      <div class="feature-item active" onclick="selectFeature(this, 'buy')">
        <div class="feat-icon-wrap">🧠</div>
        <div class="feat-content">
          <div class="feat-title">ذكاء اصطناعي متعلم ذاتياً</div>
          <div class="feat-desc">النموذج يتطور يومياً من بيانات الأسواق، يتعلم من الأخطاء ويُحسّن دقته باستمرار.</div>
          <div class="feat-bar-wrap"><div class="feat-bar"></div></div>
        </div>
      </div>
      <div class="feature-item" onclick="selectFeature(this, 'sell')">
        <div class="feat-icon-wrap">🔔</div>
        <div class="feat-content">
          <div class="feat-title">تنبيهات متعددة القنوات</div>
          <div class="feat-desc">Telegram، Email، SMS، والموقع — تأكيد بأنك لن تفوت أي إشارة مهما كانت ظروفك.</div>
          <div class="feat-bar-wrap"><div class="feat-bar"></div></div>
        </div>
      </div>
      <div class="feature-item" onclick="selectFeature(this, 'neutral')">
        <div class="feat-icon-wrap">🛡️</div>
        <div class="feat-content">
          <div class="feat-title">إدارة مخاطر ذكية</div>
          <div class="feat-desc">نسبة المخاطرة/المكافأة المحسوبة تلقائياً، مع توصيات حجم الصفقة المناسب لرأس مالك.</div>
          <div class="feat-bar-wrap"><div class="feat-bar"></div></div>
        </div>
      </div>
      <div class="feature-item" onclick="selectFeature(this, 'buy')">
        <div class="feat-icon-wrap">📊</div>
        <div class="feat-content">
          <div class="feat-title">لوحة تحكم تحليلية</div>
          <div class="feat-desc">تتبع أداء محفظتك، إحصائيات الإشارات، وتقارير الأرباح في لوحة تحكم بصرية متكاملة.</div>
          <div class="feat-bar-wrap"><div class="feat-bar"></div></div>
        </div>
      </div>
    </div>

    <div class="features-visual fade-up">
      <div class="chart-mock">
        <div class="chart-header">
          <div>
            <div class="chart-pair">BTC / USDT</div>
            <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">تحليل 4 ساعات</div>
          </div>
          <span class="chart-badge badge-buy" id="chartBadge">▲ شراء</span>
        </div>
        <svg class="chart-svg" viewBox="0 0 400 160" id="chartSVG">
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#00E5A0" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#00E5A0" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FF4D6A" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#FF4D6A" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <!-- Grid lines -->
          <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          <!-- Chart path -->
          <path id="chartPath" d="M0,120 Q40,110 70,100 T130,80 T190,60 T250,40 T310,30 T370,18 L400,15 L400,160 L0,160 Z" fill="url(#greenGrad)"/>
          <path id="chartLine" d="M0,120 Q40,110 70,100 T130,80 T190,60 T250,40 T310,30 T370,18 L400,15" fill="none" stroke="#00E5A0" stroke-width="2"/>
          <!-- Signal point -->
          <circle cx="280" cy="35" r="6" fill="rgba(0,229,160,0.2)" stroke="#00E5A0" stroke-width="1.5" id="signalDot">
            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <line x1="280" y1="35" x2="280" y2="160" stroke="#00E5A0" stroke-width="0.5" stroke-dasharray="4,4" opacity="0.4"/>
          <!-- Signal label -->
          <rect x="248" y="8" width="64" height="18" rx="4" fill="rgba(0,229,160,0.15)" stroke="rgba(0,229,160,0.3)" stroke-width="0.5"/>
          <text id="signalLabel" x="280" y="20.5" text-anchor="middle" fill="#00E5A0" font-size="9" font-family="Orbitron">▲ BUY</text>
        </svg>
        <div class="chart-metrics">
          <div class="chart-metric">
            <div class="metric-label">دقة الإشارة</div>
            <div class="metric-val up">96.2%</div>
          </div>
          <div class="chart-metric">
            <div class="metric-label">نسبة R/R</div>
            <div class="metric-val" style="color:var(--gold)">1:3.4</div>
          </div>
          <div class="chart-metric">
            <div class="metric-label">الهدف المتوقع</div>
            <div class="metric-val up">+7.8%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PRICING -->
<section id="pricing" class="pricing-section">
  <div class="fade-up" style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:24px;">
    <div>
      <div class="section-label">الأسعار</div>
      <div class="section-title">استثمار صغير<br>عوائد ضخمة</div>
    </div>
    <div class="pricing-toggle">
      <span>شهري</span>
      <div class="toggle-switch" id="billingToggle" onclick="toggleBilling()"></div>
      <span>سنوي</span>
      <span class="save-badge">وفر 40%</span>
    </div>
  </div>

  <div class="plans-grid fade-up">
    <!-- Starter -->
    <div class="plan-card">
      <div class="plan-name">STARTER</div>
      <div class="plan-price">
        <span class="plan-currency">$</span><span class="plan-amount" id="p1">29</span>
      </div>
      <div class="plan-period">شهرياً · فوترة شهرية</div>
      <div class="plan-desc">مثالي للمبتدئين الراغبين في دخول عالم التداول الذكي.</div>
      <ul class="plan-features">
        <li>5 إشارات يومياً</li>
        <li>العملات الرقمية والفوركس</li>
        <li>تنبيهات Telegram</li>
        <li>تقارير أسبوعية</li>
        <li class="disabled">إشارات VIP الحصرية</li>
        <li class="disabled">إدارة محفظة ذكية</li>
        <li class="disabled">دعم أولوية 24/7</li>
      </ul>
      <a href="#" class="btn btn-ghost" style="width:100%; justify-content:center;">ابدأ مجاناً</a>
    </div>

    <!-- Pro (featured) -->
    <div class="plan-card featured">
      <div class="plan-name">PRO</div>
      <div class="plan-price">
        <span class="plan-currency">$</span><span class="plan-amount" id="p2">79</span>
      </div>
      <div class="plan-period">شهرياً · فوترة شهرية</div>
      <div class="plan-desc">للمتداولين الجادين الذين يريدون كل الأدوات.</div>
      <ul class="plan-features">
        <li>إشارات غير محدودة</li>
        <li>جميع الأسواق (كريبتو، فوركس، أسهم)</li>
        <li>تنبيهات متعددة القنوات</li>
        <li>إشارات VIP الحصرية</li>
        <li>لوحة تحكم متقدمة</li>
        <li>إدارة مخاطر ذكية</li>
        <li class="disabled">مدير حساب شخصي</li>
      </ul>
      <a href="#" class="btn btn-gold" style="width:100%; justify-content:center;">ابدأ الآن ◀</a>
    </div>

    <!-- Elite -->
    <div class="plan-card">
      <div class="plan-name">ELITE</div>
      <div class="plan-price">
        <span class="plan-currency">$</span><span class="plan-amount" id="p3">199</span>
      </div>
      <div class="plan-period">شهرياً · فوترة شهرية</div>
      <div class="plan-desc">تجربة كاملة مع دعم شخصي واستراتيجيات مخصصة.</div>
      <ul class="plan-features">
        <li>كل مميزات Pro</li>
        <li>مدير حساب شخصي</li>
        <li>استراتيجيات تداول مخصصة</li>
        <li>API للربط مع منصتك</li>
        <li>جلسات تدريب شهرية</li>
        <li>دعم أولوية 24/7</li>
        <li>تقارير أداء مفصلة</li>
      </ul>
      <a href="#" class="btn btn-ghost" style="width:100%; justify-content:center;">تواصل معنا</a>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section id="testimonials">
  <div class="fade-up" style="text-align:center">
    <div class="section-label">آراء العملاء</div>
    <div class="section-title">12,500+ متداول يثقون بنا</div>
    <div class="section-sub" style="margin: 0 auto;">نتائج حقيقية من متداولين حقيقيين.</div>
  </div>
  <div class="testimonials-grid fade-up">
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <div class="testimonial-text">"غيّر هذا النظام تجربتي في التداول تماماً. الإشارات دقيقة بشكل مذهل وكسبت في الشهر الأول أكثر مما كسبته في ستة أشهر قبلها."</div>
      <div class="testimonial-author">
        <div class="author-avatar">🇸🇦</div>
        <div>
          <div class="author-name">محمد الشمري</div>
          <div class="author-role">متداول كريبتو، الرياض</div>
          <div class="author-profit">+42% في 3 أشهر</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <div class="testimonial-text">"كنت أخسر بانتظام حتى جربت Alpha AI Signals. الآن لدي خطة واضحة لكل صفقة ونظام إدارة مخاطر يحميني. استثمار يستحق كل درهم."</div>
      <div class="testimonial-author">
        <div class="author-avatar">🇦🇪</div>
        <div>
          <div class="author-name">فاطمة الكعبي</div>
          <div class="author-role">مستثمرة، دبي</div>
          <div class="author-profit">+28% في شهرين</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <div class="testimonial-text">"الدعم الفني ممتاز، والإشارات واضحة ومفصلة. أفضل شيء هو الشرح المصاحب لكل إشارة — أتعلم كيف يفكر الذكاء الاصطناعي."</div>
      <div class="testimonial-author">
        <div class="author-avatar">🇰🇼</div>
        <div>
          <div class="author-name">خالد العازمي</div>
          <div class="author-role">متداول فوركس، الكويت</div>
          <div class="author-profit">+67% في 6 أشهر</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section" style="background: var(--bg2);">
  <div class="fade-up">
    <div class="section-label" style="text-align:center">ابدأ الآن</div>
    <div class="section-title" style="text-align:center; margin:0 auto 16px">حوّل تداولك<br>إلى مستوى آخر</div>
    <div class="section-sub" style="text-align:center; margin:0 auto 44px">انضم إلى آلاف المتداولين الذين يستخدمون Alpha AI Signals لتحقيق أرباح مستدامة. جرّب مجاناً لمدة 14 يوماً.</div>
    <div class="cta-actions">
      <a href="#" class="btn btn-gold" style="padding:16px 40px; font-size:16px;">ابدأ تجربتك المجانية ◀</a>
      <a href="#" class="btn btn-ghost" style="padding:16px 28px; font-size:16px;">اطلع على النتائج المثبتة</a>
    </div>
    <div style="text-align:center; margin-top:24px; font-size:13px; color:var(--text-dim);">✓ لا يلزم بطاقة ائتمان &nbsp;·&nbsp; ✓ إلغاء في أي وقت &nbsp;·&nbsp; ✓ دعم 24/7</div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-grid">
    <div>
      <a href="#" class="nav-logo" style="text-decoration:none;">
        <div class="logo-icon"></div>
        <div class="logo-text">ALPHA <span>AI</span> SIGNALS</div>
      </a>
      <p class="footer-brand-desc">منصة الذكاء الاصطناعي الأولى للإشارات في المنطقة العربية. نؤمن بأن التداول الذكي حق للجميع.</p>
      <div class="footer-social">
        <a href="#" class="social-btn">𝕏</a>
        <a href="#" class="social-btn">📱</a>
        <a href="#" class="social-btn">📷</a>
        <a href="#" class="social-btn">💬</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">المنتج</div>
      <ul class="footer-links">
        <li><a href="#">كيف يعمل</a></li>
        <li><a href="#">المميزات</a></li>
        <li><a href="#">الأسعار</a></li>
        <li><a href="#">الأسواق المدعومة</a></li>
        <li><a href="#">API للمطورين</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-col-title">الشركة</div>
      <ul class="footer-links">
        <li><a href="#">من نحن</a></li>
        <li><a href="#">المدونة</a></li>
        <li><a href="#">شركاؤنا</a></li>
        <li><a href="#">برنامج الإحالة</a></li>
        <li><a href="#">وظائف</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-col-title">الدعم</div>
      <ul class="footer-links">
        <li><a href="#">مركز المساعدة</a></li>
        <li><a href="#">تواصل معنا</a></li>
        <li><a href="#">المجتمع</a></li>
        <li><a href="#">تحديثات النظام</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">© 2026 Alpha AI Signals. جميع الحقوق محفوظة.</div>
    <div class="footer-legal">
      <a href="#">سياسة الخصوصية</a>
      <a href="#">الشروط والأحكام</a>
      <a href="#">إخلاء المسؤولية</a>
    </div>
  </div>
</footer>

<script>
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = (mx - 6) + 'px';
    cursor.style.top = (my - 6) + 'px';
  });

  function animateRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .plan-card, .how-card, .feature-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      ring.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
    });
  });

  // Counter animation
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    const suffix = el.textContent.includes('%') ? '%' : el.textContent.includes('+') ? '+' : '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Intersection observer for fade-up and counters
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // Also observe stats directly
  const heroSection = document.querySelector('.hero');
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('[data-count]').forEach(animateCounter);
        statsObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  if (heroSection) statsObs.observe(heroSection);

  // Feature selector
  function selectFeature(el, type) {
    document.querySelectorAll('.feature-item').forEach(f => {
      f.classList.remove('active');
      f.querySelector('.feat-bar').style.width = '0';
    });
    el.classList.add('active');
    setTimeout(() => el.querySelector('.feat-bar').style.width = '100%', 50);

    const badge = document.getElementById('chartBadge');
    const path = document.getElementById('chartPath');
    const line = document.getElementById('chartLine');
    const dot = document.getElementById('signalDot');
    const label = document.getElementById('signalLabel');

    if (type === 'buy') {
      badge.className = 'chart-badge badge-buy';
      badge.textContent = '▲ شراء';
      path.setAttribute('fill', 'url(#greenGrad)');
      path.setAttribute('d', 'M0,120 Q40,110 70,100 T130,80 T190,60 T250,40 T310,30 T370,18 L400,15 L400,160 L0,160 Z');
      line.setAttribute('d', 'M0,120 Q40,110 70,100 T130,80 T190,60 T250,40 T310,30 T370,18 L400,15');
      line.setAttribute('stroke', '#00E5A0');
      dot.setAttribute('stroke', '#00E5A0');
      dot.setAttribute('fill', 'rgba(0,229,160,0.2)');
      label.setAttribute('fill', '#00E5A0');
      label.textContent = '▲ BUY';
    } else if (type === 'sell') {
      badge.className = 'chart-badge badge-sell';
      badge.textContent = '▼ بيع';
      path.setAttribute('fill', 'url(#redGrad)');
      path.setAttribute('d', 'M0,20 Q40,30 80,50 T160,80 T220,100 T290,120 T360,140 L400,148 L400,160 L0,160 Z');
      line.setAttribute('d', 'M0,20 Q40,30 80,50 T160,80 T220,100 T290,120 T360,140 L400,148');
      line.setAttribute('stroke', '#FF4D6A');
      dot.setAttribute('stroke', '#FF4D6A');
      dot.setAttribute('fill', 'rgba(255,77,106,0.2)');
      label.setAttribute('fill', '#FF4D6A');
      label.textContent = '▼ SELL';
    } else {
      badge.className = 'chart-badge' ;
      badge.style.background = 'rgba(201,168,76,0.12)';
      badge.style.color = '#C9A84C';
      badge.textContent = '◆ محايد';
    }
  }

  // Initialize first feature bar
  setTimeout(() => {
    const first = document.querySelector('.feature-item.active .feat-bar');
    if (first) first.style.width = '100%';
  }, 800);

  // Billing toggle
  let isAnnual = false;
  const prices = { p1: [29, 17], p2: [79, 47], p3: [199, 119] };

  function toggleBilling() {
    isAnnual = !isAnnual;
    document.getElementById('billingToggle').classList.toggle('active');
    Object.entries(prices).forEach(([id, [monthly, annual]]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = isAnnual ? annual : monthly;
    });
    document.querySelectorAll('.plan-period').forEach(el => {
      el.textContent = isAnnual ? 'شهرياً · فوترة سنوية' : 'شهرياً · فوترة شهرية';
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
</script>
</body>
</html>
