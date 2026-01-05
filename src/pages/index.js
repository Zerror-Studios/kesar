import ApplicationSection from '@/components/home/ApplicationSection'
import GallerySection from '@/components/home/GallerySection'
import HeroSection from '@/components/home/HeroSection'
import Integrated from '@/components/home/Integrated'
import LatestNews from '@/components/home/LatestNews'
import LogoSection from '@/components/home/LogoSection'
import ProductFinder from '@/components/home/ProductFinder'
import ProductSection from '@/components/home/ProductSection'
import Sustainability from '@/components/home/Sustainability'
import React from 'react'
import SeoHeader from '../components/seo/SeoHeader'

const Home = ({ meta }) => {

  return (
    <>
      <SeoHeader meta={meta} />
      <HeroSection />
      <ProductFinder />
      <LogoSection />
      <Integrated />
      <ProductSection title={"Our Products"} des={"Comprehensive range of Phthalocyanine Pigments Blue and Green engineered for your specific applications."} btn={"Explore more Products"} />
      <ApplicationSection />
      <Sustainability />
      <LatestNews />
      <GallerySection />
    </>
  )
}

export default Home;

export async function getStaticProps() {
  const meta = {
    title: "Kesar Petroproducts Ltd. – Leading Petrochemical & Resin Manufacturer in India",
    description:
      "Kesar Petroproducts Ltd. is a trusted manufacturer of phthalic anhydride, plasticizers, resins, and specialty petrochemical products. Delivering high-quality industrial solutions with advanced infrastructure and global standards.",
    keywords:
      "Kesar Petroproducts, petrochemical manufacturer India, phthalic anhydride, plasticizers, resins, specialty chemicals, industrial chemicals, petro products",
    author: "Kesar Petroproducts Ltd.",
    robots: "index,follow",
  };
  return { props: { meta } };
}
