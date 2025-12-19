import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import { GrNext } from "react-icons/gr";

const newTags = [
  "Production : 8000 MT / Annum",
  "Production : 2400 MT / Annum",
  "Production : 3600 MT / Annum",
  "Production : 1800 MT / Annum",
  "Production : 3600 MT / Annum",
  "Production : 3000 MT / Annum",
  "Production : 1200 MT / Annum",
  "",
];
const ProductCard = ({ product ,index }) => {
  return (
    <div className="product_card">
      <div className="product_details">
        <h3 className="product_name">{product?.name}</h3>

        <div className="product_description">
          {product?.tags &&
            product?.tags.map((t, i) => (
              <>
                <span key={i}>{t}</span>
              </>
            ))}
            {newTags[index] &&  <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
              <span key={index} style={{fontWeight:'800',color:"#000"}}>{newTags[index]}</span>
            </div>}
           
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
          link={`${product.slug}`}
        />
      </div>
    </div>
  );
};

export default ProductCard;
