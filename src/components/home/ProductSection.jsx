import React, { useEffect, useState, useRef } from "react";
import Button from "../common/Button";
import ProductCard from "./ProductCard";
import { GrNext } from "react-icons/gr";
import { productCards } from "@/helpers/homeProducts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

import { Splide, SplideSlide } from "@splidejs/react-splide";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const ProductSection = ({ title, des, btn }) => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const progressRef = useRef(null);

  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  // Detect screen size
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 480);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // GSAP stagger animation
  useEffect(() => {
    if (sliderRef.current) {
      const cards = sliderRef.current.querySelectorAll(".product_card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, rotation: 1.5 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "ease-secondary",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  // Safe progress update (null-check)
  const updateProgress = (splide) => {
    if (!progressRef.current) return; // FIX: prevents null error

    const endIndex = splide.Components.Controller.getEnd();
    const progress = 10 + (splide.index / endIndex) * 90; // 10% → 100%
    progressRef.current.style.width = `${progress}%`;
  };

  return (
    <div id="product_section">
      <div id="product_section_container">
        <div id="product_section_title">
          <div>
            <h4>{title}</h4>
            <p>{des}</p>
          </div>

          {!isMobile && (
            <Button title={btn} link="/products" icon={<GrNext />} />
          )}
        </div>

        {/* Progress bar FIRST — ensures it is mounted before Splide */}
        <div className="splide-progress">
          <div className="splide-progress-bar" ref={progressRef}></div>
        </div>

        {/* Splide Slider */}
        <div ref={sliderRef}>
          <Splide
            options={{
              perPage: 3, // default for desktop
              gap: "20px",
              pagination: false,
              arrows: false,
              drag: true,
              speed: 600,
              type: "slide",

              breakpoints: {
                1286: {
                  perPage: 2.1,
                },
                1150: {
                  perPage: 2.3,
                },
                1024: {
                  perPage: 2.5,
                },
                900: {
                  perPage: 2.1, // 👈 For tablets
                },
                768: {
                  perPage: 1.6, // 👈 For tablets
                },
                600: {
                  perPage: 1.2, // 👈 For tablets
                },
                480: {
                  perPage: 1.1, // 👈 For small mobiles
                },
              },
            }}
            onMounted={(splide) => updateProgress(splide)}
            onMove={(splide) => updateProgress(splide)}
          >
            {productCards.map((product, idx) => (
              <SplideSlide key={idx}>
                <ProductCard product={product} />
              </SplideSlide>
            ))}
          </Splide>
        </div>

        {isMobile && (
          <div className="btn_wrap_mobile">
            <Button title={btn} link="/products" icon={<GrNext />} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
