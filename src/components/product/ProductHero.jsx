import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const ProductHero = ({
  application,
  setApplication,
  colourIndex,
  setColourIndex,
  antiCorrosive,
  setAntiCorrosive,
  fertilizer,
  setFertilizer,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const wrapperRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = [
    {
      label: "Select Application",
      value: application,
      setter: setApplication,
      options: ["Ink", "Coating", "Plastic", "Offset"],
    },
    {
      label: "Select Colour Index",
      value: colourIndex,
      setter: setColourIndex,
      options: ["PB 15.0", "PB 15.1", "PB 15.3", "PG 7"],
    },
    {
      label: "Anti Corrosives",
      value: antiCorrosive,
      setter: setAntiCorrosive,
      options: ["Zinc Phosphate", "Zinc Oxide", "Zinc Carbonate"],
    },
    {
      label: "Fertilizers",
      value: fertilizer,
      setter: setFertilizer,
      options: [
        "Diammonium Phosphate",
        "Mono Ammonium Phosphate",
        "Zinc Sulphate",
      ],
    },
  ];

  return (
    <div id="product_hero">
      <div id="product_hero_container">
        <div id="product_hero_title">
          <h4>Product Families</h4>
          <p>
            Comprehensive range of Phthalocyanine Pigments Blue and Green
            engineered for your specific applications.
          </p>

          <div id="product_filter_wrap" ref={wrapperRef}>
            <div id="product_filters">
              {filterOptions.map((filter, index) => (
                <div
                  key={index}
                  className={`product_filter_drop ${
                    openIndex === index ? "open" : ""
                  }`}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span>{filter.value || filter.label}</span>
                  <IoMdArrowDropdown />

                  <div className="dropdown_items_filter">
                    {filter.options.map((opt, i) => (
                      <h5
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          filter.setter(opt);
                          setOpenIndex(null);
                        }}
                      >
                        {opt}
                      </h5>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <span
            id="clear"
              onClick={() => {
                setApplication("");
                setColourIndex("");
                setAntiCorrosive("");
                setFertilizer("");
              }}
            >
              Clear Filter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
