import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Dropdown from "../common/Dropdown";
import { BiFilter } from "react-icons/bi";
import Button from "../common/Button";

const ProductFinder = ({ isHero }) => {
  return (
    <div id="product_finder" className={`${isHero ? "hero" : ""}`}>
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
              <Dropdown
                label="Select Application"
                options={[
                  "Inks",
                  "Coatings",
                  "Plastic (Master Batch)",
                  "Offset",
                ]}
              />
              <Dropdown
                label="Select Colour Index"
                options={["PB 15.0", "PB 15.1", "PB 15.3", "PG 7"]}
              />
            </div>
          </div>
          <div className="dropdown_box">
            <p>Anti Corrosives</p>
            <Dropdown
              label="Select Anti Corrosives Product"
              options={["Zinc Phosphate", "Zinc Oxide", "Zinc Carbonate"]}
            />
          </div>
          <div className="dropdown_box">
            <p>Fertilizers</p>
            <Dropdown
              label="Select Fertilizers Product"
              options={[
                "Diammonium Phosphate",
                "Mono Ammonium Phosphate",
                "Zinc Sulphate",
              ]}
            />
          </div>
        </div>
        {!isHero && (
          <Button title={"Apply Filters"} color={"blue"} icon={<BiFilter />} />
        )}
      </div>
    </div>
  );
};

export default ProductFinder;
