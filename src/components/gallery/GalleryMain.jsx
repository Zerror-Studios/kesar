import Image from "next/image";
import React from "react";

const GalleryMain = () => {
  // Step 1: Create data array
  const galleryData = [
    { src: "/images/gallery/image1.webp", title: "Activated - CPC" },
    { src: "/images/gallery/image2.webp", title: "Zinc Phosphate, Zinc Oxide, Zinc Carbonate" },
    { src: "/images/gallery/image3.webp", title: "Beta-Blue-15-3" },
    { src: "/images/gallery/image4.webp", title: "Beta-CPC-15" },
    { src: "/images/gallery/image5.webp", title: "CPC-Blue-15-0" },
    { src: "/images/gallery/image6.webp", title: "CPC-Blue-15-1" },
    { src: "/images/gallery/image7.webp", title: "CPC-Crude" },
    { src: "/images/gallery/image8.webp", title: "CPC-Crude2" },
    { src: "/images/gallery/image9.webp", title: "CPC-Crude4" },
    { src: "/images/gallery/image10.webp", title: "Diammonium Phosphate, Mono Ammonium Phosphate" },
    { src: "/images/gallery/image11.webp", title: "RM" },
    { src: "/images/gallery/image12.webp", title: "Zinc Sulphate" },
  ];

  return (
    <div id="gallery_main">
      <div id="gallery_main_conainer">
        <h4>Gallery</h4>
        <p>
          Explore our world-class facilities, cutting-edge research laboratories,
          and the precision that goes into every product we manufacture.
        </p>

        {/* Step 2: Map over data */}
        <div id="gallery_image_container">
          {galleryData.map((item, index) => (
            <div className="gallery_card" key={index}>
              <div className="gallery_card_img">
                <Image
                  width={1000}
                  height={1000}
                  src={item.src}
                  alt={item.title}
                />
              </div>
              <h5>{item.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryMain;
