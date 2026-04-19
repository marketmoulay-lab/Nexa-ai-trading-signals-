import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NEXA AI",
  description: "Learn how NEXA AI collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="January 2024">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            NEXA AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit our website 
            moulaytrading.fit and use our trading signal services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3 text-foreground">2.1 Personal Information</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may collect personal information that you voluntarily provide, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Name and email address</li>
            <li>Telegram username</li>
            <li>Payment information (processed securely through PayPal or cryptocurrency wallets)</li>
            <li>Communication preferences</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">2.2 Automatically Collected Information</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you visit our website, we may automatically collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referral source and exit pages</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the collected information for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Providing and maintaining our trading signal services</li>
            <li>Processing payments and managing subscriptions</li>
            <li>Sending trading signals via Telegram</li>
            <li>Communicating service updates and promotional content (with consent)</li>
            <li>Analyzing usage patterns to improve our services</li>
            <li>Preventing fraud and ensuring platform security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Sharing and Disclosure</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Payment processors (PayPal, cryptocurrency networks) for transaction processing</li>
            <li>Analytics providers to understand service usage</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Cookies and Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar tracking technologies to enhance your experience. These include 
            essential cookies for site functionality, analytics cookies to understand usage patterns, 
            and preference cookies to remember your settings. You can manage cookie preferences through 
            your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement industry-standard security measures including SSL encryption, secure payment 
            processing, and regular security audits. However, no method of transmission over the internet 
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Your Rights (GDPR)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you are in the European Economic Area, you have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">8. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal information for as long as your account is active or as needed to 
            provide services. We may retain certain information for legal compliance, dispute resolution, 
            or legitimate business purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">9. Children&apos;s Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are not intended for individuals under 18 years of age. We do not knowingly 
            collect personal information from minors. If we learn that we have collected data from a 
            minor, we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">10. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            For privacy-related inquiries or to exercise your rights, contact us at:
          </p>
          <ul className="list-none mt-4 space-y-2 text-muted-foreground">
            <li>Email: support@moulaytrading.fit</li>
            <li>Telegram: @NexaAI_Support</li>
          </ul>
        </section>
      </div>
    </LegalPageLayout>
  );
}
