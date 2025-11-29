import React, { useEffect, useState, useRef } from "react";
import Button from "../common/Button";
import ProductCard from "./ProductCard";
import { GrNext } from "react-icons/gr";
import { productCards } from "@/helpers/homeProducts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const ProductSection = ({ title, des, btn }) => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null); // parent container for cards

  // Create custom ease
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  // Detect screen width
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 480);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Animate cards on scroll
  useEffect(() => {
    if (sliderRef.current) {
      const cards = gsap.utils.toArray(".product_card", sliderRef.current);

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, rotation: 1.5 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: .8, // slightly faster duration
          ease: "ease-secondary",
          stagger: {
            amount: 0.8, // faster cascading
          },
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 0.07,
          },
        }
      );
    }
  }, []);

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

        <div className="product_slider" ref={sliderRef}>
          {productCards.map((product, idx) => (
            <div key={idx} className="product_card">
              <ProductCard product={product} />
            </div>
          ))}
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
