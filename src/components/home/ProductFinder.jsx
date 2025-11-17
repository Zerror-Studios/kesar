import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const ProductFinder = ({isHero}) => {
  return (
    <div id="product_finder" className={`${isHero ? 'hero':''}`}>
      <div id="product_finder_container">
        <h4>Product Finder</h4>
        <p>
          Comprehensive range of Phthalocyanine Pigments Blue and Green
          engineered for your specific applications.
        </p>
        <div id="dropdown_container">
          <div className="dropdown_box">
            <p>Phthalocyanine Pigments</p>
            <div id="dropdown_wrapper">
              <div className="dropdown">
                <span>Select Application</span>
                <IoMdArrowDropdown />
              </div>
              <div className="dropdown">
                <span>Select Colour Index</span>
                <IoMdArrowDropdown />
              </div>
            </div>
          </div>
          <div className="dropdown_box">
            <p>Anti Corrosives</p>
            <div className="dropdown">
              <span>Select Anti Corrosives Product</span>
              <IoMdArrowDropdown />
            </div>
          </div>
          <div className="dropdown_box">
            <p>Fertilizers</p>
            <div className="dropdown">
              <span>Select Fertilizers Product</span>
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFinder;
