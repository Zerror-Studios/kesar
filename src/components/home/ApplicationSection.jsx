import React, { useEffect, useRef } from "react";
import ApplicationCard from "./ApplicationCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const ApplicationSection = () => {
  const cardsRef = useRef(null);

  const applications = [
    {
      id: 1,
      title: "Inks",
      image: "/images/home/ink.webp",
      description:
        "High-quality Phthalocyanine pigments for printing inks with excellent color strength and stability",
      tags: ["Color Strength", "Lightfastness", "Chemical Resistance"],
    },
    {
      id: 2,
      title: "Coatings",
      image: "/images/home/coatings.webp",
      description:
        "Durable Phthalocyanine pigments for industrial and architectural coatings applications",
      tags: ["Weather Resistance", "UV Stability", "Heat Resistance"],
    },
    {
      id: 3,
      title: "Plastics (Master Batch)",
      image: "/images/home/plastic.webp",
      description:
        "Heat-stable pigments for polymer applications and processing",
      tags: ["Heat Stability", "Lightfastness", "Chemical Resistance"],
    },
    {
      id: 4,
      title: "Offset",
      image: "/images/home/offset.webp",
      description:
        "Concentrated Phthalocyanine pigment preparations for plastic coloration",
      tags: ["Weather Resistance", "UV Stability", "Heat Resistance"],
    },
  ];

  // create custom ease
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  useEffect(() => {
    if (cardsRef.current) {
      const cards = gsap.utils.toArray(
        ".application_card",
        cardsRef.current
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, rotation: 1.5 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.5,       // slightly faster duration
          ease: "ease-secondary",
          stagger: {
            amount: 0.3,       // faster cascading
          },
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 0.07,
          },
        }
      );
    }
  }, []);

  return (
    <div id="application_section">
      <div id="application_section_container">
        <div id="application_section_header">
          <div>
            <h4>Applications & Industries</h4>
            <p>
              Specialized solutions for diverse industrial applications with
              proven performance
            </p>
          </div>
        </div>

        <div id="application_section_cards" ref={cardsRef}>
          {applications.map((data, index) => (
            <div key={index} className="application_card">
              <ApplicationCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationSection;
