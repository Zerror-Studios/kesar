import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ categories, currentSlug }) => {
  return (
    <>
      {categories?.map((categoryItem, index) => (
        <div className="product_list" key={index}>
          <h5>{categoryItem?.category}</h5>
          <div className="product_list_container">
            {categoryItem?.products?.map((product, idx) => (
              <ProductCard
                key={idx}
                product={product}
                currentSlug={currentSlug || ""} 
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
