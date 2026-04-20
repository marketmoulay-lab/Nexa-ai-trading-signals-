import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Disclosure | NEXA AI",
  description: "Important risk warnings about trading financial instruments with NEXA AI signals.",
};

export default function RiskDisclosurePage() {
  return (
    <LegalPageLayout title="Risk Disclosure" lastUpdated="January 2024">
      <div className="space-y-8">
        <section className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Important Warning</h2>
          <p className="text-foreground leading-relaxed font-medium">
            Trading in financial instruments carries a high level of risk and may not be suitable for 
            all investors. You could lose all or part of your initial investment. Do not trade with 
            money you cannot afford to lose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Nature of Trading Risks</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Trading in Forex, cryptocurrencies, and commodities like Gold involves substantial risk due to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Market Volatility:</strong> Prices can fluctuate rapidly and unpredictably</li>
            <li><strong>Leverage:</strong> Using leverage amplifies both potential profits and losses</li>
            <li><strong>Liquidity Risk:</strong> Markets may experience reduced liquidity during certain periods</li>
            <li><strong>Gap Risk:</strong> Prices may gap significantly between trading sessions</li>
            <li><strong>Systemic Risk:</strong> Market-wide events can affect all positions simultaneously</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Forex Trading Risks</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Foreign exchange trading carries specific risks:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Currency values can be affected by political and economic events</li>
            <li>Interest rate changes can significantly impact currency pairs</li>
            <li>Margin trading can result in losses exceeding your initial deposit</li>
            <li>Weekend gaps and holiday periods can create unexpected price movements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. Cryptocurrency Trading Risks</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cryptocurrency trading presents unique challenges:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Extreme price volatility - 10-20% moves in a single day are common</li>
            <li>Regulatory uncertainty in many jurisdictions</li>
            <li>Risk of exchange hacks and security breaches</li>
            <li>24/7 market operation requiring constant monitoring</li>
            <li>Lack of traditional investor protections</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Gold (XAU/USD) Trading Risks</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Trading gold carries its own set of risks:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Sensitivity to US Dollar strength and interest rates</li>
            <li>Geopolitical events can cause sudden price spikes</li>
            <li>Central bank gold policies can affect prices</li>
            <li>Market manipulation concerns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. No Guarantee of Profits</h2>
          <p className="text-muted-foreground leading-relaxed">
            NEXA AI&apos;s trading signals are based on AI analysis and historical data. However:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li><strong>Past performance is not indicative of future results</strong></li>
            <li>No trading system or signal service can guarantee profits</li>
            <li>Market conditions can change rapidly, invalidating any analysis</li>
            <li>Our 87.3% win rate is historical and may not be maintained</li>
            <li>Even winning trades can result in overall losses due to position sizing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Leverage and Margin</h2>
          <p className="text-muted-foreground leading-relaxed">
            Trading on margin and using leverage can amplify your losses beyond your initial investment. 
            You may be required to deposit additional funds at short notice to maintain positions, or 
            your positions may be liquidated at a loss. Always understand the margin requirements and 
            use appropriate risk management.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Risk Management Recommendations</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We strongly recommend:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Never trade with money you cannot afford to lose</li>
            <li>Always use stop-loss orders on every trade</li>
            <li>Risk only 1-2% of your trading capital per trade</li>
            <li>Diversify your trading across multiple instruments</li>
            <li>Start with a demo account to practice</li>
            <li>Continuously educate yourself about market conditions</li>
            <li>Consider seeking independent financial advice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">8. Signals Are Not Financial Advice</h2>
          <p className="text-muted-foreground leading-relaxed">
            NEXA AI trading signals are for informational and educational purposes only. They do not 
            constitute financial advice, investment recommendations, or an offer to buy or sell any 
            financial instrument. Always conduct your own research and consider seeking advice from 
            a licensed financial advisor.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">9. Technology Risks</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Using our services involves technology-related risks:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Signal delivery delays due to network issues</li>
            <li>Telegram platform outages</li>
            <li>Internet connectivity problems</li>
            <li>Broker execution delays or requotes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">10. Your Responsibility</h2>
          <p className="text-muted-foreground leading-relaxed">
            By using NEXA AI services, you acknowledge that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>You have read and understood this risk disclosure</li>
            <li>You are solely responsible for your trading decisions</li>
            <li>You understand the risks involved in trading</li>
            <li>You accept full responsibility for any losses incurred</li>
            <li>NEXA AI is not liable for any trading losses</li>
          </ul>
        </section>

        <section className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
          <p className="text-foreground leading-relaxed font-medium">
            If you do not fully understand the risks involved in trading, please do not use our services 
            and seek professional financial advice before making any investment decisions.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
