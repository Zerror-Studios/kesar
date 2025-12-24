import React, { useEffect, useState, useRef } from "react";
import Button from "../common/Button";
import ProductCard from "./ProductCard";
import { GrNext } from "react-icons/gr";
import { productCards } from "@/helpers/homeProducts";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const ProductSection = ({ title, des, btn }) => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);

  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  /* Detect screen size */
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 480);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  /* GSAP stagger animation */
  useEffect(() => {
    if (!sliderRef.current) return;

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
  }, []);

  return (
    <div id="product_section">
      <div id="product_section_container">
        <div id="product_section_title">
          <div>
            <h4>
              {title} <span>(EU REACH Registered)</span>
            </h4>
            <p>{des}</p>
          </div>

          {!isMobile && (
            <Button title={btn} link="/products" icon={<GrNext />} />
          )}
        </div>

        {/* Swiper Slider */}
        <div ref={sliderRef}>
          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={700}
            spaceBetween={20}
            slidesPerView={3}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1, // mobile
              },
              480: {
                slidesPerView: 1.5, // up to 480px
              },
              768: {
                slidesPerView: 2, // tablets
              },
              1024: {
                slidesPerView: 3, // desktop
              },
            }}
            className="product-swiper"
          >
            {productCards.map((product, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <ProductCard index={idx} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
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
