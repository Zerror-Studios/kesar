import React, { useEffect, useState, useRef } from "react";
import Button from "../common/Button";
import Image from "next/image";
import { GrNext } from "react-icons/gr";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const GallerySection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef(null);

  // Detect screen width
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 480);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Create custom ease
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  // Animate cards on scroll
 // Animate cards on scroll
useEffect(() => {
  if (cardsRef.current) {
    const cards = gsap.utils.toArray(
      ".gallery_section_card",
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
    <div id="gallery_section">
      <div id="gallery_section_container">
        <div id="gallery_section_header">
          <div>
            <h4>Gallery</h4>
            <p>
              Explore our world-class facilities, cutting-edge research
              laboratories, and the precision that goes into every product we
              manufacture.
            </p>
          </div>

          {!isMobile && (
            <Button title={"Full Gallery"} link={"/gallery"} icon={<GrNext />} />
          )}
        </div>

        <div id="gallery_section_cards" ref={cardsRef}>
          <div className="gallery_section_card">
            <Image
              width={1000}
              height={1000}
              src="/images/home/gallery1.webp"
              alt="image"
            />
            <div className="gallery_section_card_overlay">
              <Link href="/gallery" className="overlay_tab">
                <span>Plant</span>
                <GrNext />
              </Link>
            </div>
          </div>

          <div className="gallery_section_card">
            <Image
              width={1000}
              height={1000}
              src="/images/home/gallery2.webp"
              alt="image"
            />
            <div className="gallery_section_card_overlay">
               <Link href="/gallery" className="overlay_tab">
                <span>Lab</span>
                <GrNext />
              </Link>
            </div>
          </div>

          <div className="gallery_section_card">
            <Image
              width={1000}
              height={1000}
              src="/images/home/gallery3.webp"
              alt="image"
            />
            <div className="gallery_section_card_overlay">
               <Link href="/gallery" className="overlay_tab">
                <span>Products</span>
                <GrNext />
              </Link>
            </div>
          </div>
        </div>

        {isMobile && (
          <div className="btn_wrap_mobile">
            <Button title={"Full Gallery"} link={"/gallery"} icon={<GrNext />} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GallerySection;
