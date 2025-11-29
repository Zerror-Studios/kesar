import React, { useEffect, useState, useRef } from "react";
import Button from "../common/Button";
import { GrNext } from "react-icons/gr";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const Integrated = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null); // ref for the whole container
 CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");
  useEffect(() => {
    // Detect mobile width
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "ease-secondary",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub:0.05,
          },
        }
      );
    }
  }, []);

  return (
    <div id="integrated_section">
      <div id="integrated_container" ref={containerRef}>
        <div id="integrated_details">
          <h4>Integrated Value Chain</h4>
          <p>
            We control CPC crude, cuprous chloride, synergists/additives, and
            captive power; manufacture PB 15:0/1/3 & PG7 (plus Activated CPC);
            and valorise by-products into Zinc Phosphate / ZnO / ZnCO₃ and DAP /
            MAP / Zinc Sulphate - closing the loop for repeatable shade, stable
            pricing, and lower waste.
          </p>

          {!isMobile && (
            <Button
              title="Learn More About our Integration"
              icon={<GrNext />}
              link="/about"
            />
          )}
        </div>

        <div id="integrated_process">
          <div className="process">
            <span>Backward Integration</span>
          </div>
          <div className="process">
            <span>Phthalocyanine Pigments</span>
          </div>
          <div className="process">
            <span>Forward Integration</span>
          </div>
        </div>

        {isMobile && (
          <Button
            title="Learn More About our Integration"
            icon={<GrNext />}
            link="/about"
          />
        )}
      </div>
    </div>
  );
};

export default Integrated;
