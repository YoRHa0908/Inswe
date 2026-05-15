import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "REFUND POLICY",
    body: `We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
To start a return, you can contact us at inswe.studio@gmail.com. Please note that returns will need to be sent to the following address: 44A PARKVIEW ROAD, DA16 1TR, WELLING.
If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
You can always contact us for any return question at inswe.studio@gmail.com.`,
  },
  {
    title: "DAMAGES AND ISSUES",
    body: `Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.`,
  },
  {
    title: "EXCEPTIONS / NON-RETURNABLE ITEMS",
    body: `Unfortunately, we cannot accept returns on sale items or gift cards.`,
  },
  {
    title: "EXCHANGES",
    body: `The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.`,
  },
  {
    title: "EUROPEAN UNION 14 DAY COOLING OFF PERIOD",
    body: `Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification.
As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.`,
  },
  {
    title: "REFUNDS",
    body: `We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
If more than 15 business days have passed since we've approved your return, please contact us at inswe.studio@gmail.com.`,
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="mx-auto flex-1 max-w-[720px] px-4 py-10 sm:px-6 sm:py-16">
        {/* Page title */}
        <h1 className="mb-8 text-center text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1a1a1a] sm:mb-12 sm:text-[48px]">
          Refund policy
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
