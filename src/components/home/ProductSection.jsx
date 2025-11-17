import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import ProductCard from "./ProductCard";
import { GrNext } from "react-icons/gr";
import { categories } from "@/helpers/productData";

const ProductSection = ({ title, des, btn }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkWidth(); // initial run

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // first product from each category → 4 total
  const firstProducts = categories.map(cat => cat.products[0]).slice(0, 4);

  return (
    <div id="product_section">
      <div id="product_section_container">

        <div id="product_section_title">
          <div>
            <h4>{title}</h4>
            <p>{des}</p>
          </div>

          {/* Desktop button */}
          {!isMobile && (
            <Button title={btn} link="/products" icon={<GrNext />} />
          )}
        </div>

        <div className="product_slider">
          {firstProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>

        {/* Mobile button */}
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
