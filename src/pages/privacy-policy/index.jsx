import SeoHeader from '@/components/seo/SeoHeader'
import React from 'react'

const PrivacyPolicy = ({meta}) => {
  return (
     <>
      <SeoHeader meta={meta} />
     <div id="mpolicy-section1">

  <h2>Privacy Policy</h2>
  <p><strong>Effective Date:</strong> 22 December 2025</p>

  <p>
    <strong>Kesar Petroproducts Ltd.</strong> (together with its affiliates, if any, collectively referred to as the
    “Company”, “Kesar Petroproducts”, “we”, “our” or “us”) is committed to respecting and protecting your privacy.
    We handle your personal data in accordance with applicable data protection laws and widely recognized privacy
    principles, including the EU General Data Protection Regulation (GDPR), where applicable, as well as other
    international standards.
  </p>

  <p>
    This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you interact
    with us—via our website, email, telephone, in-person meetings, trade shows (such as ChinaCoat), or other channels.
    “Personal data” means any information relating to an identified or identifiable individual.
  </p>

  <p>
    By continuing to use our website or by providing us with personal data through any channel, you confirm that you
    are at least sixteen (16) years of age. We do not knowingly collect personal data from children under 16 without
    verifiable parental consent.
  </p>

  <p>
    We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations.
    The latest version will always be posted on our website.
  </p>

  <h4>Controller</h4>
  <p><strong>Kesar Petroproducts Ltd.</strong></p>
  <p>
    404, Naman Centre, C-31/G Block, BKC, Bandra (E),<br />
    Mumbai – 400051, India
  </p>
  <p><strong>Email: </strong><a href="mailto:kesarprivacy@gmail.com">kesarprivacy@gmail.com</a></p>

  <p>
    As the data controller, Kesar Petroproducts Ltd. determines the purposes and means of processing your personal data.
  </p>

  <h4>1. What Personal Data Do We Collect, Why, and on What Legal Basis?</h4>

  <p>
    Most areas of our website can be accessed without providing personal data. However, certain services—such as
    requesting product samples, technical data sheets, quotations, or subscribing to updates—require you to
    voluntarily share information with us.
  </p>

  <p>
    We process personal data only where permitted by law and based on one or more of the following legal grounds:
  </p>

  <ul>
    <li>Performance of a contract</li>
    <li>Our legitimate business interests</li>
    <li>Your explicit consent</li>
    <li>Compliance with legal obligations</li>
  </ul>

  <p><strong>1.1 Automatically Collected Data (Website Usage)</strong></p>

  <p>When you visit our website, we may automatically collect:</p>

  <ul>
    <li>IP address, browser type, device information, operating system</li>
    <li>Pages visited, time spent, language preference, error logs</li>
  </ul>

  <p>We use this data to:</p>

  <ul>
    <li>Ensure website functionality, security, and stability</li>
    <li>Display content in your preferred language (session-only)</li>
    <li>Analyze trends and improve user experience</li>
  </ul>

  <p><strong>Legal basis:</strong> Legitimate interest.</p>

  <p><strong>1.2 Data You Provide Directly</strong></p>

  <p>This may include:</p>

  <ul>
    <li>Contact details such as name, company, job title, business email, phone number, and address</li>
    <li>Inquiry content submitted through forms or emails</li>
    <li>Professional data provided during job applications</li>
  </ul>

  <p>We use this data to:</p>

  <ul>
    <li>Respond to your inquiries and requests</li>
    <li>Fulfill orders and manage contractual relationships</li>
    <li>Improve products and customer experience</li>
    <li>Administer recruitment processes</li>
    <li>Comply with legal and regulatory requirements</li>
  </ul>

  <p>
    <strong>Legal basis:</strong> Contractual necessity, legitimate interest, or consent.
  </p>

  <p><strong>1.3 Data from Third Parties or Public Sources</strong></p>

  <p>We may receive data from:</p>

  <ul>
    <li>Your employer for business communications</li>
    <li>Public professional platforms such as LinkedIn</li>
    <li>Background verification agencies (with consent)</li>
  </ul>

  <h4>2. Who Do We Share Your Personal Data With?</h4>

  <p>
    We do not sell or rent your personal data. Data may be shared only with trusted service providers,
    group companies, or authorities where legally required.
  </p>

  <p>
    <strong>International Transfers:</strong> Where data is transferred internationally, we use GDPR-compliant
    safeguards such as Standard Contractual Clauses.
  </p>

  <h4>3. How Do We Secure Your Data?</h4>

  <p>
    We use appropriate technical and organizational measures, including access controls, employee training,
    and encryption, to safeguard your data.
  </p>

  <h4>4. How Long Do We Retain Your Data?</h4>

  <ul>
    <li>Customer inquiries: up to 3 years</li>
    <li>Contracts and orders: statutory retention periods</li>
    <li>Job applications: 6 months if unsuccessful</li>
    <li>Marketing data: until consent is withdrawn</li>
  </ul>

  <h4>5. Cookies and Tracking Technologies</h4>

  <p>
    Our website currently uses essential cookies. Any future non-essential cookies or analytics tools
    will be implemented only after obtaining user consent.
  </p>

  <h4>7. Your Privacy Rights</h4>

  <ul>
    <li>Access, correct, or delete your personal data</li>
    <li>Restrict or object to processing</li>
    <li>Request data portability</li>
    <li>Withdraw consent at any time</li>
    <li>Lodge a complaint with a data protection authority</li>
  </ul>

  <p>
    To exercise your rights, contact us at <a href="mailto:kesarprivacy@gmail.com">kesarprivacy@gmail.com</a>.
  </p>

  <h4>9. How to Contact Us</h4>

  <p><strong>Kesar Petroproducts Ltd.</strong></p>
  <p>
    404, Naman Centre, C-31/G Block, BKC, Bandra (E),<br />
    Mumbai – 400051, India
  </p>
  <p><strong>Email:</strong> <a href="mailto:kesarprivacy@gmail.com">kesarprivacy@gmail.com</a></p>

</div>
     </>

  )
}

export default PrivacyPolicy


export async function getStaticProps() {
  const meta = {
    title: "Privacy Policy | Kesar Petroproducts Ltd.",
    description:
      "Learn how Kesar Petroproducts Ltd. collects, uses, stores, and protects personal data in compliance with GDPR and applicable global data protection laws.",
    keywords:
      "Kesar Petroproducts privacy policy, data protection policy, GDPR compliance, personal data handling, industrial chemicals privacy, corporate privacy policy India",
    author: "Kesar Petroproducts Ltd.",
    robots: "noindex,nofollow",
  };

  return { props: { meta } };
}