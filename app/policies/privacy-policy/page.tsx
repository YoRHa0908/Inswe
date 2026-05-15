import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "PRIVACY POLICY",
    body: `Last updated: June 14, 2025

This Privacy Policy describes how Inswè (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from insweworldwide.com (the "Site") or otherwise communicate with us regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.

Please read this Privacy Policy carefully.`,
  },
  {
    title: "CHANGES TO THIS PRIVACY POLICY",
    body: `We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.`,
  },
  {
    title: "HOW WE COLLECT AND USE YOUR PERSONAL INFORMATION",
    body: `To provide the Services, we collect personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.

In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide or improve the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.`,
  },
  {
    title: "WHAT PERSONAL INFORMATION WE COLLECT",
    body: `The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.`,
  },
  {
    title: "INFORMATION WE COLLECT DIRECTLY FROM YOU",
    body: `Information that you directly submit to us through our Services may include:

Contact details including your name, address, phone number, and email.
Order information including your name, billing address, shipping address, payment confirmation, email address, and phone number.
Account information including your username, password, security questions and other information used for account security purposes.
Customer support information including the information you choose to include in communications with us, for example, when sending a message through the Services.

Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.`,
  },
  {
    title: "INFORMATION WE COLLECT ABOUT YOUR USAGE",
    body: `We may also automatically collect certain information about your interaction with the Services ("Usage Data"). To do this, we may use cookies, pixels and similar technologies ("Cookies"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.`,
  },
  {
    title: "INFORMATION WE OBTAIN FROM THIRD PARTIES",
    body: `Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:

Companies who support our Site and Services, such as Shopify.
Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you.

When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies.

Any information we obtain from third parties will be treated in accordance with this Privacy Policy.`,
  },
  {
    title: "HOW WE USE YOUR PERSONAL INFORMATION",
    body: `Providing Products and Services. We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, to send notifications to you related to your account, purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, facilitate any returns and exchanges and other features and functionalities related to your account.

Marketing and Advertising. We may use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. If you are an EEA resident, the legal basis for these data processing activities is our legitimate interest in selling our products, according to Art. 6 (1) (f) GDPR.

Security and Fraud Prevention. We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you believe your account has been compromised, please contact us immediately. If you are an EEA resident, the legal basis for these data processing activities is our legitimate interest in keeping our website secure, according to Art. 6 (1) (f) GDPR.

Communicating with You and Service Improvement. We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you according to Art. 6 (1) (f) GDPR.`,
  },
  {
    title: "COOKIES",
    body: `Like many websites, we use Cookies on our Site. We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services. We may also permit third parties and service providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites.

Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available.`,
  },
  {
    title: "HOW WE DISCLOSE PERSONAL INFORMATION",
    body: `In certain circumstances, we may disclose your personal information to third parties for contract fulfillment purposes, legitimate purposes and other reasons subject to this Privacy Policy. Such circumstances may include:

With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).
With business and marketing partners to provide services and advertise to you. Our business and marketing partners will use your information in accordance with their own privacy notices.
When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent.
With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.
In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations, to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.

We do not use or disclose sensitive personal information without your consent or for the purposes of inferring characteristics about you.`,
  },
  {
    title: "THIRD PARTY WEBSITES AND LINKS",
    body: `Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites.

Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.`,
  },
  {
    title: "CHILDREN'S DATA",
    body: `The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.

As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we "share" or "sell" (as those terms are defined in applicable law) personal information of individuals under 16 years of age.`,
  },
  {
    title: "SECURITY AND RETENTION OF YOUR INFORMATION",
    body: `Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use insecure channels to communicate sensitive or confidential information to us.

How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.`,
  },
  {
    title: "YOUR RIGHTS",
    body: `Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.

Right to Access / Know: You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.
Right to Delete: You may have a right to request that we delete personal information we maintain about you.
Right to Correct: You may have a right to request that we correct inaccurate personal information we maintain about you.
Right of Portability: You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.
Right to Opt out of Sale or Sharing or Targeted Advertising: You may have a right to direct us not to "sell" or "share" your personal information or to opt out of the processing of your personal information for purposes considered to be "targeted advertising", as defined in applicable privacy laws.
Restriction of Processing: You may have the right to ask us to stop or restrict our processing of personal information.
Withdrawal of Consent: Where we rely on consent to process your personal information, you may have the right to withdraw this consent.
Appeal: You may have a right to appeal our decision if we decline to process your request.
Managing Communication Preferences: We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you.

You may exercise any of these rights where indicated on our Site or by contacting us using the contact details provided below. We will not discriminate against you for exercising any of these rights.`,
  },
  {
    title: "COMPLAINTS",
    body: `If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority.`,
  },
  {
    title: "INTERNATIONAL USERS",
    body: `Please note that we may transfer, store and process your personal information outside the country you live in. Your personal information is also processed by staff and third party service providers and partners in these countries.

If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.`,
  },
  {
    title: "CONTACT",
    body: `Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please email us at inswe.studio@gmail.com or contact us at:

44A Park View Road
Welling, ENG, DA16 1RT
GB

For the purpose of applicable data protection laws and if not explicitly stated otherwise, we are the data controller of your personal information.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="mx-auto flex-1 max-w-[720px] px-4 py-10 sm:px-6 sm:py-16">
        {/* Page title */}
        <h1 className="mb-8 text-center text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1a1a1a] sm:mb-12 sm:text-[48px]">
          Privacy policy
        </h1>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-2 text-[12px] font-bold tracking-[0.05em] text-[#1a1a1a]">
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.body.split("\n").map((para, i) =>
                  para.trim() ? (
                    <p key={i} className="text-[13px] leading-relaxed text-[#444]">
                      {para.trim()}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
