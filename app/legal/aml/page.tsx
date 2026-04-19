import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AML Policy | NEXA AI",
  description: "NEXA AI's Anti-Money Laundering (AML) and Know Your Customer (KYC) policies.",
};

export default function AMLPolicyPage() {
  return (
    <LegalPageLayout title="Anti-Money Laundering (AML) Policy" lastUpdated="January 2024">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            NEXA AI is committed to preventing money laundering, terrorist financing, and other 
            financial crimes. This Anti-Money Laundering (AML) Policy outlines our procedures and 
            controls to detect, prevent, and report suspicious activities in compliance with 
            international AML standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Policy Objectives</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our AML policy aims to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Prevent NEXA AI services from being used for money laundering or terrorist financing</li>
            <li>Identify and verify the identity of our customers</li>
            <li>Detect and report suspicious transactions</li>
            <li>Maintain appropriate records of customer information and transactions</li>
            <li>Comply with applicable AML laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. Know Your Customer (KYC) Procedures</h2>
          <h3 className="text-xl font-semibold mb-3 text-foreground">3.1 Customer Identification</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We collect the following information from customers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Full legal name</li>
            <li>Email address</li>
            <li>Country of residence</li>
            <li>Payment information (PayPal account or cryptocurrency wallet address)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">3.2 Enhanced Due Diligence</h3>
          <p className="text-muted-foreground leading-relaxed">
            For high-value transactions or suspicious activities, we may require additional 
            verification including government-issued ID and proof of address.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Transaction Monitoring</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We monitor transactions for suspicious patterns including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Unusually large or frequent payments</li>
            <li>Payments from high-risk jurisdictions</li>
            <li>Multiple accounts from the same person</li>
            <li>Rapid subscription changes or payment method switches</li>
            <li>Payments inconsistent with stated purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Cryptocurrency Payments</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For cryptocurrency transactions, we implement additional measures:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Monitoring wallet addresses for links to illicit activities</li>
            <li>Tracking transaction patterns on public blockchains</li>
            <li>Using blockchain analytics tools when necessary</li>
            <li>Rejecting payments from mixers or privacy coins associated with illegal activity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Prohibited Activities</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The following are strictly prohibited:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Using our services to launder money or finance terrorism</li>
            <li>Providing false or misleading information</li>
            <li>Using stolen payment methods or cryptocurrency</li>
            <li>Making payments on behalf of others without disclosure</li>
            <li>Attempting to circumvent our AML controls</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Record Keeping</h2>
          <p className="text-muted-foreground leading-relaxed">
            We maintain records of:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>Customer identification information</li>
            <li>Transaction records including dates, amounts, and payment methods</li>
            <li>Correspondence related to suspicious activity</li>
            <li>Records of any enhanced due diligence performed</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Records are maintained for a minimum of 5 years after the business relationship ends.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">8. Suspicious Activity Reporting</h2>
          <p className="text-muted-foreground leading-relaxed">
            If we identify suspicious activity, we will:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>Document the suspicious activity internally</li>
            <li>Report to relevant authorities as required by law</li>
            <li>Suspend or terminate the customer&apos;s account</li>
            <li>Cooperate with law enforcement investigations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">9. High-Risk Jurisdictions</h2>
          <p className="text-muted-foreground leading-relaxed">
            We apply enhanced scrutiny to customers from jurisdictions identified as high-risk 
            by international bodies such as FATF. We may decline to provide services to customers 
            from countries subject to comprehensive sanctions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">10. Training and Awareness</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our team members receive regular training on:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
            <li>Identifying suspicious activities and red flags</li>
            <li>Customer verification procedures</li>
            <li>Record-keeping requirements</li>
            <li>Reporting obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">11. Policy Updates</h2>
          <p className="text-muted-foreground leading-relaxed">
            This AML policy is reviewed and updated regularly to reflect changes in regulations 
            and best practices. The latest version is always available on our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">12. Contact Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions about our AML policy or to report suspicious activity:
          </p>
          <ul className="list-none mt-4 space-y-2 text-muted-foreground">
            <li>Email: compliance@moulaytrading.fit</li>
            <li>Support: support@moulaytrading.fit</li>
          </ul>
        </section>
      </div>
    </LegalPageLayout>
  );
}
