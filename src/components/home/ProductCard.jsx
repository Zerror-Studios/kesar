import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import { GrNext } from "react-icons/gr";

const ProductCard = ({ product }) => {
  return (
    <div className="product_card">
      <div className="product_details">
        <h3 className="product_name">{product?.name}</h3>

        <div className="product_description">
          <span>{product?.tags?.[0]}</span>
          <span>{product?.category}</span>
        </div>
      </div>

      {/* Static image stays same */}
      <Image
        width={1000}
        height={1000}
        src="/images/home/product.webp"
        alt="product"
      />

      <div className="product_info">
        <p>{product?.desc}</p>
        <Button
          title={"More"}
          color={"orange"}
          width={"fit"}
          icon={<GrNext />}
          link={`/products/${product.slug}`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
