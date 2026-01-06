import InvestorHero from "@/components/investors/InvestorHero";
import ReportSection from "@/components/investors/ReportSection";
import SeoHeader from "@/components/seo/SeoHeader";
import React from "react";

const Investors = ({meta}) => {
  return (
    <>
    <SeoHeader meta={meta} />
      <InvestorHero />
      <ReportSection />
    </>
  );
};

export default Investors;


export async function getStaticProps() {
  const meta = {
    title:
      "Kesar Petroproducts Ltd. – Investor Relations, Financial Reports & Corporate Information",
    description:
      "Access investor-related information for Kesar Petroproducts Ltd., including annual reports, financial statements, corporate governance details, shareholding patterns, and stock exchange updates.",
    keywords:
      "Kesar Petro investors, investor relations, financial reports, corporate governance, BSE updates, annual reports, shareholder information",
    author: "Kesar Petroproducts Ltd.",
    robots: "index,follow",
  };
  return { props: { meta } };
}
