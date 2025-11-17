import React from "react";
import Button from "../common/Button";
import Link from "next/link";
import { GrNext } from "react-icons/gr";

const ProductCard = ({ product, currentSlug }) => {
  if (!product) return null; // render nothing if product is undefined

  const isActive = currentSlug ? product.slug === currentSlug : false;

  const content = (
    <div className={`product_list_card ${isActive ? "active" : ""}`}>
      <div className="product_img_wrap">
        <div className="product_sample_container">
          {product.shades?.map((shade, idx) => (
            <div
              key={idx}
              className={`product_sample${idx + 1} ${
                product.style ? "center" : ""
              }`}
              style={{ backgroundColor: shade }}
            ></div>
          ))}
        </div>
      </div>
      <div className="product_list_dets">
        <div>
          <h5 className="product_list_card_name">{product.name}</h5>
          <div className="product_card_desc">
            {product.tags?.map((tag, idx) => (
              <span key={idx}>{tag}</span>
            ))}
          </div>
        </div>
        <Button title={"More"} color={"orange"} width="fit" icon={<GrNext />} />
      </div>
    </div>
  );

  return isActive ? (
    content
  ) : (
    <Link className="product_link" href={`/products/${product.slug}`}>
      {content}
    </Link>
  );
};

export default ProductCard;
