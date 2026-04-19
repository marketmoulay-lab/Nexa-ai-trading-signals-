import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | NEXA AI",
  description: "Learn about NEXA AI's refund and cancellation policies for trading signal subscriptions.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title="Refund Policy" lastUpdated="January 2024">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Our Commitment</h2>
          <p className="text-muted-foreground leading-relaxed">
            At NEXA AI, we are committed to your satisfaction. We offer a comprehensive refund policy 
            to ensure you can try our services with confidence. We believe in the quality of our 
            AI-powered trading signals and want you to experience their value firsthand.
          </p>
        </section>

        <section className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-foreground">7-Day Free Trial</h2>
          <p className="text-foreground leading-relaxed">
            All new users receive a <strong>7-day free trial</strong> with no payment required. This allows 
            you to evaluate our signals before making any financial commitment. We encourage all users to 
            take advantage of this trial period.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Refund Eligibility</h2>
          <h3 className="text-xl font-semibold mb-3 text-foreground">2.1 Full Refund (Within 7 Days)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You are eligible for a full refund if:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>You request a refund within 7 days of your first paid subscription</li>
            <li>You have not previously received a refund from NEXA AI</li>
            <li>Your account has not been terminated for terms violation</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">2.2 Partial Refund (8-14 Days)</h3>
          <p className="text-muted-foreground leading-relaxed">
            Requests made between 8-14 days of purchase may be eligible for a 50% refund at our discretion, 
            based on individual circumstances.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">2.3 No Refund (After 14 Days)</h3>
          <p className="text-muted-foreground leading-relaxed">
            Refund requests made more than 14 days after purchase are generally not eligible for refunds, 
            as you have had substantial time to evaluate the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. How to Request a Refund</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To request a refund, please follow these steps:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Contact our support team via email at support@moulaytrading.fit</li>
            <li>Include your account email and payment transaction ID</li>
            <li>Briefly explain the reason for your refund request</li>
            <li>Allow 2-3 business days for initial response</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mt-4">
            You may also reach us via Telegram at @NexaAI_Support for faster assistance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Refund Processing</h2>
          <h3 className="text-xl font-semibold mb-3 text-foreground">4.1 PayPal Payments</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Refunds for PayPal payments will be processed to your original PayPal account within 
            5-7 business days after approval.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-foreground">4.2 Cryptocurrency Payments</h3>
          <p className="text-muted-foreground leading-relaxed">
            Due to the nature of cryptocurrency transactions and potential price fluctuations, crypto 
            refunds will be processed at the USD equivalent value at the time of the original payment. 
            Refunds will be sent to a wallet address you provide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Subscription Cancellation</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You may cancel your subscription at any time:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Cancellation takes effect at the end of your current billing period</li>
            <li>You retain access to signals until your subscription expires</li>
            <li>No partial refunds are given for unused time within a billing period</li>
            <li>Contact support to cancel your subscription</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Non-Refundable Situations</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Refunds will not be provided in the following cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Trading losses incurred while following our signals</li>
            <li>Account termination due to terms of service violations</li>
            <li>Failure to use the signals during the subscription period</li>
            <li>Technical issues on your end (internet, Telegram access, etc.)</li>
            <li>Multiple refund requests from the same user</li>
            <li>Signal sharing or redistribution violations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Chargebacks</h2>
          <p className="text-muted-foreground leading-relaxed">
            We encourage you to contact us directly before initiating a chargeback with your payment 
            provider. Filing a chargeback without first attempting to resolve the issue with us may 
            result in permanent account suspension and potential legal action for fraudulent chargebacks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">8. Special Circumstances</h2>
          <p className="text-muted-foreground leading-relaxed">
            We understand that exceptional circumstances may arise. If you have a unique situation not 
            covered by this policy, please contact our support team. We will review requests on a 
            case-by-case basis and do our best to find a fair resolution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">9. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            For refund requests or questions about this policy:
          </p>
          <ul className="list-none mt-4 space-y-2 text-muted-foreground">
            <li>Email: support@moulaytrading.fit</li>
            <li>Telegram: @NexaAI_Support</li>
            <li>Response Time: Within 24 hours</li>
          </ul>
        </section>
      </div>
    </LegalPageLayout>
  );
}
