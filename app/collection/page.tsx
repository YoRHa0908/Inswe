// app/campaign/page.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Collection from "@/components/collection/Collection";

/* -------------------------------------------------------------------------- */
/*                               CAMPAIGN DATA                                */
/* -------------------------------------------------------------------------- */
 
export default function CampaignPage() {
  return (
    <main
      id="MainContent"
      className="content-for-layout"
      role="main"
      data-page-transition-enabled="true"
      data-product-transition="true"
      data-template="page"
    >
      <Header /> 
      <Collection />
      <Footer />
    </main>
  );
}