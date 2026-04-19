import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | NEXA AI",
  description: "Important disclaimers regarding NEXA AI trading signals and services.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer" lastUpdated="January 2024">
      <div className="space-y-8">
        <section className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-destructive">General Disclaimer</h2>
          <p className="text-foreground leading-relaxed font-medium">
            The information provided by NEXA AI is for educational and informational purposes only. 
            It should not be construed as financial, investment, or trading advice. Always consult 
            with a qualified financial advisor before making investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. No Financial Advice</h2>
          <p className="text-muted-foreground leading-relaxed">
            NEXA AI and its representatives are not registered investment advisors, broker-dealers, 
            or members of any other financial regulatory body. The trading signals, market analysis, 
            and educational content we provide are not intended to be, and should not be interpreted as, 
            personalized financial advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Trading Signals Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our AI-generated trading signals are based on technical analysis, historical data, and 
            proprietary algorithms. However:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Signals are not recommendations to buy or sell any specific financial instrument</li>
            <li>Past performance of signals does not guarantee future results</li>
            <li>Markets are inherently unpredictable and can move against any analysis</li>
            <li>You should always conduct your own due diligence before trading</li>
            <li>Use signals as one of many tools in your trading decision process</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. Performance Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            Any performance data, win rates, or profit figures displayed on our website represent 
            historical results based on our signal tracking. These figures:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>Are based on hypothetical or actual past performance</li>
            <li>Do not account for individual trading costs, slippage, or spreads</li>
            <li>May not include all market conditions</li>
            <li>Should not be relied upon as indicators of future performance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Risk of Loss</h2>
          <p className="text-muted-foreground leading-relaxed">
            Trading in financial markets involves substantial risk of loss. You should only trade with 
            risk capital - money you can afford to lose without affecting your lifestyle. Never trade 
            with borrowed money, emergency funds, or money needed for essential expenses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. No Guarantee</h2>
          <p className="text-muted-foreground leading-relaxed">
            NEXA AI makes no guarantees or warranties regarding:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>The accuracy or reliability of trading signals</li>
            <li>Profitability or returns on any trades</li>
            <li>Uninterrupted service availability</li>
            <li>The suitability of our services for your specific situation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Third-Party Content</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website may contain links to third-party websites, tools, or services (such as 
            TradingView charts). We do not endorse, control, or assume responsibility for the 
            content, privacy policies, or practices of any third-party sites or services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Educational Content</h2>
          <p className="text-muted-foreground leading-relaxed">
            Blog posts, tutorials, and educational materials on our website are provided for 
            informational purposes only. This content:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>Should not be considered professional trading education</li>
            <li>May become outdated as market conditions change</li>
            <li>Represents the views of the author at the time of publication</li>
            <li>Is not a substitute for formal financial education</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">8. AI Technology Limitations</h2>
          <p className="text-muted-foreground leading-relaxed">
            While our AI algorithms are sophisticated, they have limitations:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>AI cannot predict &quot;black swan&quot; events or unexpected news</li>
            <li>Historical patterns may not repeat in the future</li>
            <li>Market conditions can change faster than AI can adapt</li>
            <li>Technical failures can affect signal generation and delivery</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">9. Your Responsibility</h2>
          <p className="text-muted-foreground leading-relaxed">
            By using NEXA AI services, you acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>All trading decisions are made at your own risk</li>
            <li>You are solely responsible for your trading outcomes</li>
            <li>You will not hold NEXA AI liable for any trading losses</li>
            <li>You have read and understood all risk disclosures</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">10. Jurisdictional Compliance</h2>
          <p className="text-muted-foreground leading-relaxed">
            Trading regulations vary by jurisdiction. It is your responsibility to ensure that 
            your trading activities comply with the laws and regulations of your country of 
            residence. NEXA AI does not provide advice on regulatory compliance.
          </p>
        </section>

        <section className="p-6 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this disclaimer, please contact us at 
            support@moulaytrading.fit before using our services.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
