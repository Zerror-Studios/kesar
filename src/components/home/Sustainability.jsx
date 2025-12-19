import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const Sustainability = () => {
  const cardsRef = useRef(null);

  // Custom easing
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  useEffect(() => {
    if (cardsRef.current) {
      const cards = gsap.utils.toArray(
        ".sustainable_section_card",
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
            amount: 0.4,       // faster cascading
          },
          scrollTrigger: {
            trigger: cardsRef.current,
            scroller: "body",
            start: "top 85%",
            end: "top 25%",     // more natural scroll window
            scrub: 0.07,        // slightly responsive to scroll
          },
        }
      );
    }
  }, []);

  return (
    <div id="sustainable_section">
      <div id="sustainable_section_container">
        <div id="sustainable_section_header">
          <div>
            <h4>Sustainability Snapshot</h4>
            <p>
              Committed to responsible manufacturing with measurable
              environmental stewardship.
            </p>
          </div>
          <p >ESG : Environment, Sustainability, Corporate Governance</p>
        </div>
        <div id="sustainable_section_cards" ref={cardsRef}>
          <div className="sustainable_section_card">
            <h5>Waste Minimisation</h5>
            <Image
              width={1000}
              height={1000}
              src="/images/home/waste.webp"
              alt="image"
            />
            <p>Circular processes reducing environmental impact</p>
          </div>

          <div className="sustainable_section_card">
            <h5>Stewardship Targets</h5>
            <Image
              width={1000}
              height={1000}
              src="/images/home/stewardship.webp"
              alt="image"
            />
            <p>Measurable ESG goals with quarterly tracking</p>
          </div>

          <div className="sustainable_section_card">
            <h5>Circular Manufacturing</h5>
            <Image
              width={1000}
              height={1000}
              src="/images/home/circular.webp"
              alt="image"
            />
            <p>By-products valorised into valuable end products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
