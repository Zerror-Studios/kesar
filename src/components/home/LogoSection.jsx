import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Custom ease (same used in other sections)
CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

const logoData = [
  { src: "/images/home/logo1.webp", text: "Annual Capacity (Tons)" },
  { src: "/images/home/logo2.webp", text: "5 Integrated Facilities" },
  { src: "/images/home/logo3.webp", text: "ISO & REACH" },
  { src: "/images/home/logo4.webp", text: "In-house Power" },
  { src: "/images/home/logo5.webp", text: "Backward Integration" },
  { src: "/images/home/logo6.webp", text: "Forward Integration" },
];

const LogoSection = () => {
  const logoRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      logoRefs.current,
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "ease-secondary",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#logo_section",
          start: "top 85%",
          end: "top 25%",
          scrub:0.05
        },
      }
    );
  }, []);

  return (
    <div id="logo_section" className="flex flex-wrap justify-center gap-6">
      {logoData.map((item, index) => (
        <div
          className="logo_card flex flex-col items-center"
          key={index}
          ref={(el) => (logoRefs.current[index] = el)}
        >
          <Image width={100} height={100} src={item.src} alt={`logo-${index + 1}`} />
          <p className="mt-2 text-center">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default LogoSection;
