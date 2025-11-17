import React, { useEffect, useState } from "react";
import Dropdown from "../common/Dropdown";
import { BiFilter } from "react-icons/bi";
import Button from "../common/Button";
import { useRouter } from "next/router";

const ProductFinder = ({ isHero, initialValues = {} }) => {
  const router = useRouter();

  const [category, setCategory] = useState(initialValues.category || "");
  const [tag, setTag] = useState(initialValues.tag || "");
  const [antiCorrosive, setAntiCorrosive] = useState(
    initialValues.antiCorrosive || ""
  );
  const [fertilizer, setFertilizer] = useState(initialValues.fertilizer || "");
  useEffect(() => {
    if (isHero) {
      setCategory(initialValues.category || "");
      setTag(initialValues.tag || "");
      setAntiCorrosive(initialValues.antiCorrosive || "");
      setFertilizer(initialValues.fertilizer || "");
    }
  }, [initialValues]);

  const handleApply = () => {
    router.push({
      pathname: "/result",
      query: {
        category,
        tag,
        antiCorrosive,
        fertilizer,
      },
    });
  };
  const handleClear = () => {
    // Reset all values
    setCategory("");
    setTag("");
    setAntiCorrosive("");
    setFertilizer("");

    // Remove all query params → go to /result clean
    router.push("/result");
  };

  return (
    <div id="product_finder" className={`${isHero ? "hero" : ""}`}>
      <div id="product_finder_container">
        <h4>Product Finder</h4>
        <p>
          Comprehensive range of Phthalocyanine Pigments Blue and Green
          engineered for your specific applications.
        </p>

        <div id="dropdown_container">
          {/* ---- 1: Category + Tag ---- */}
          <div className="dropdown_box">
            <p>Phthalocyanine Pigments</p>

            <div id="dropdown_wrapper">
              <Dropdown
                label="Select Application"
                options={["Ink", "Coating", "Plastic", "Offset"]}
                value={category} // 👈 added
                onSelect={(value) => setCategory(value)}
              />

              <Dropdown
                label="Select Colour Index"
                options={["PB 15.0", "PB 15.1", "PB 15.3", "PG 7"]}
                value={tag} // 👈 added
                onSelect={(value) => setTag(value)}
              />
            </div>
          </div>

          {/* ---- 2: Anti Corrosive Products ---- */}
          <div className="dropdown_box">
            <p>Anti Corrosives</p>

            <Dropdown
              label="Select Anti Corrosives Product"
              options={["Zinc Phosphate", "Zinc Oxide", "Zinc Carbonate"]}
              value={antiCorrosive} // 👈 added
              onSelect={(value) => setAntiCorrosive(value)}
            />
          </div>

          {/* ---- 3: Fertilizer Products ---- */}
          <div className="dropdown_box">
            <p>Fertilizers</p>

            <Dropdown
              label="Select Fertilizers Product"
              options={[
                "Diammonium Phosphate",
                "Mono Ammonium Phosphate",
                "Zinc Sulphate",
              ]}
              value={fertilizer} // 👈 added
              onSelect={(value) => setFertilizer(value)}
            />
          </div>
        </div>

        <div className="button_wrapper_filter">
          <Button
            title={"Apply Filters"}
            color={"blue"}
            icon={<BiFilter />}
            onClick={handleApply}
          />
          <Button title={"Clear Filter"} onClick={handleClear}  />
        </div>
      </div>
    </div>
  );
};

export default ProductFinder;
