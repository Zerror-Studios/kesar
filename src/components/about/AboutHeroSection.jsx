import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutHeroSection = () => {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if(window.innerWidth <= 480) return;
    const image = imageRef.current;
    const section = sectionRef.current;

    // Create the parallax scroll animation
    const tl = gsap.to(image, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Cleanup function to kill ScrollTrigger & GSAP instance
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div id="about_hero" ref={sectionRef} className="relative overflow-hidden">
      <div id="about_hero_container" className="relative">
        {/* Parallax Image */}
        <div ref={imageRef} className="image_container">
          <Image
            width={1920}
            height={1080}
            src="/images/about/about-banner.webp"
            alt="about-banner"
            priority
            className="w-full h-screen object-cover"
          />
        </div>

        {/* Overlay Content */}
        <div
          id="about_hero_overlay"
        >
          <h2>
            Think Phthalocyanine. <br /> Think Kesar.
          </h2>
          <div className="about_hero_dets">
            <p>
              Kesar Petroproducts Ltd. is a technology-driven Phthalocyanine
              pigment manufacturer and one of India’s established producers of
              phthalocyanine blue crude and downstream blues, with a sustainable
              presence in 40+ countries.
            </p>
            <p>
              Over three decades, we’ve combined efficient manufacturing with
              documented quality systems to deliver consistent blues and greens
              for inks, coatings, plastics, masterbatches, textiles and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
