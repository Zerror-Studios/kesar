import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutInfo from "@/components/about/AboutInfo";
import Leadership from "@/components/about/Leadership";
import GallerySection from "@/components/home/GallerySection";
import Sustainability from "@/components/home/Sustainability";
import SeoHeader from "@/components/seo/SeoHeader";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const About = ({ meta }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);
  return (
    <>
      <SeoHeader meta={meta} />
      <AboutHeroSection />
      <AboutInfo />
      <Sustainability />
      <Leadership />
      <GallerySection />
    </>
  );
};

export default About;

export async function getStaticProps() {
  const meta = {
    title: "About Us – Kesar Petroproducts Ltd.",
    description:
      "Kesar Petroproducts Ltd. delivers high-quality petrochemical solutions with a commitment to innovation, sustainability, and serving diverse industries.", // 21 words, 140 characters
    keywords:
      "Kesar Petroproducts, petrochemical company, chemical solutions India, industrial chemicals, company mission, sustainability, innovation", // 12 keywords, focused
    author: "Kesar Petroproducts Ltd.",
    robots: "index,follow",
  };

  return { props: { meta } };
}
