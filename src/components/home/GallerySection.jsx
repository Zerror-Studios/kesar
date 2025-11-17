import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Image from "next/image";
import { GrNext } from "react-icons/gr";

const GallerySection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
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

          {/* Desktop button */}
          {!isMobile && (
            <Button title={"Full Gallery"} link={"/gallery"} icon={<GrNext />} />
          )}
        </div>

        <div id="gallery_section_cards">
          <div className="gallery_section_card">
            <Image
              width={1000}
              height={1000}
              src="/images/home/gallery1.webp"
              alt="image"
            />
            <div className="gallery_section_card_overlay">
              <div className="overlay_tab">
                <span>Plant</span>
                <GrNext />
              </div>
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
              <div className="overlay_tab">
                <span>Lab</span>
                <GrNext />
              </div>
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
              <div className="overlay_tab">
                <span>Products</span>
                <GrNext />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile button */}
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
