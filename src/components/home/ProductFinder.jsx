import React, { useEffect, useState, useMemo } from "react";
import Dropdown from "../common/Dropdown";
import Button from "../common/Button";
import { useRouter } from "next/router";
import { categories } from "@/helpers/productData";

const MAIN_CATEGORIES = categories.slice(0, -2);

// Fixed Order (requested)
const FIXED_CATEGORY_ORDER = [
  "All",
  "Ink",
  "Coating",
  "Plastic",
  "Offset",
  "Universal",
];

const FIXED_TAG_ORDER = [
  "All",
  "Phthalocyanine Pigment Blue 15.0",
  "Phthalocyanine Pigment Blue 15.1",
  "Phthalocyanine Pigment Blue 15.3",
  "Phthalocyanine Pigment Blue 15.4",
  "PG 7",
];

// Sort helper
const sortByFixedOrder = (list, fixed) => {
  const ordered = fixed.filter((x) => list.includes(x));
  const rest = list.filter((x) => !fixed.includes(x));
  return [...ordered, ...rest];
};

// ALL categories (clean)
const ALL_CATEGORIES = MAIN_CATEGORIES.map((c) => c.category);

// ALL tags (only first tag)
const ALL_TAGS = [
  ...new Set(
    MAIN_CATEGORIES.flatMap((c) => c.products.map((p) => p.tags?.[0] || ""))
  ),
];

// CATEGORY → TAG (only 0th)
const CATEGORY_TO_TAG_MAP = {};
MAIN_CATEGORIES.forEach((cat) => {
  CATEGORY_TO_TAG_MAP[cat.category] = [
    ...new Set(cat.products.map((p) => p.tags?.[0] || "")),
  ];
});

// TAG → CATEGORY
const TAG_TO_CATEGORY_MAP = {};
MAIN_CATEGORIES.forEach((cat) => {
  cat.products.forEach((p) => {
    const first = p.tags?.[0] || "";
    if (!TAG_TO_CATEGORY_MAP[first]) TAG_TO_CATEGORY_MAP[first] = [];
    if (!TAG_TO_CATEGORY_MAP[first].includes(cat.category)) {
      TAG_TO_CATEGORY_MAP[first].push(cat.category);
    }
  });
});

/* ===========================================================
   🔥 COMPONENT
=========================================================== */
const ProductFinder = ({ isHero, title, description, initialValues = {} }) => {
  const router = useRouter();

  const [category, setCategory] = useState(initialValues.category || "");
  const [tag, setTag] = useState(initialValues.tag || "");
  const [antiCorrosive, setAntiCorrosive] = useState(
    initialValues.antiCorrosive || ""
  );
  const [fertilizer, setFertilizer] = useState(initialValues.fertilizer || "");

  /* ===========================================================
     🔥 DYNAMIC OPTIONS
  ============================================================ */

  const applicationOptions = useMemo(() => {
    let opts =
      tag && TAG_TO_CATEGORY_MAP[tag]
        ? ["All", ...TAG_TO_CATEGORY_MAP[tag]]
        : ["All", ...ALL_CATEGORIES];

    return sortByFixedOrder(opts, FIXED_CATEGORY_ORDER);
  }, [tag]);

  const tagOptions = useMemo(() => {
    let opts =
      category && CATEGORY_TO_TAG_MAP[category]
        ? ["All", ...CATEGORY_TO_TAG_MAP[category]]
        : ["All", ...ALL_TAGS];

    return sortByFixedOrder(opts, FIXED_TAG_ORDER);
  }, [category]);

  /* ===========================================================
     🔥 RESET INVALID SELECTIONS
  ============================================================ */
  useEffect(() => {
    if (tag && !tagOptions.includes(tag)) setTag("");
  }, [category, tagOptions]);

  useEffect(() => {
    if (category && !applicationOptions.includes(category)) setCategory("");
  }, [tag, applicationOptions]);

  /* ===========================================================
     🔥 APPLY & CLEAR
  ============================================================ */

  const handleApply = () => {
    router.push({
      pathname: "/products",
      query: {
        ...(category && { category }),
        ...(tag && { tag }),
        ...(antiCorrosive && { antiCorrosive }),
        ...(fertilizer && { fertilizer }),
      },
    });
  };

  const handleClear = () => {
    // Clear local state
    setCategory("");
    setTag("");
    setAntiCorrosive("");
    setFertilizer("");

    // Only update URL if we're on /products
    if (router.pathname === "/products") {
      router.replace({ pathname: "/products", query: {} }, undefined, {
        shallow: true,
      });
    }
  };

  /* ===========================================================
     🔥 UI
  ============================================================ */

  return (
    <div id="product_finder" className={`${isHero ? "hero" : ""}`}>
      <div id="product_finder_container">
        <h4>{title ?? "Product Finder"}</h4>

        <p>
          {description ??
            "Comprehensive range of Phthalocyanine Pigments engineered for your specific applications."}
        </p>

        <div id="dropdown_container">
          {/* 🔵 PHATHALOCYANINE SECTION */}
          <div className="dropdown_box">
            <p>Phthalocyanine Pigments</p>

            <div id="dropdown_wrapper">
              <Dropdown
                label="Select Application"
                options={applicationOptions}
                value={category}
                className={`option${applicationOptions.length}`}
                onSelect={(v) => {
                  setCategory(v);

                  // Only clear tag if it is invalid for selected category
                  const validTags = CATEGORY_TO_TAG_MAP[v] || [];

                  if (!validTags.includes(tag)) {
                    setTag("");
                  }
                }}
              />

              <Dropdown
                label="Select Colour Index"
                options={tagOptions}
                value={tag}
                className={`option${tagOptions.length}`}
                onSelect={setTag}
              />
            </div>
          </div>

          {/* 🔵 ANTI CORROSIVES */}
          <div className="dropdown_box">
            <p>Anti Corrosives</p>
            <Dropdown
              label="Select Anti Corrosive Product"
              options={[
                "All",
                "Zinc Phosphate",
                "Zinc Oxide",
                "Zinc Carbonate",
              ]}
              value={antiCorrosive}
              onSelect={setAntiCorrosive}
              className="option4"
            />
          </div>

          {/* 🔵 FERTILIZERS */}
          <div className="dropdown_box">
            <p>Fertilizers</p>
            <Dropdown
              label="Select Fertilizer"
              options={[
                "All",
                "Diammonium Phosphate",
                "Mono Ammonium Phosphate",
                "Zinc Sulphate",
              ]}
              value={fertilizer}
              onSelect={setFertilizer}
              className="option4"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="button_wrapper_filter">
          <Button
            title="Search"
            color="blue"
            onClick={handleApply}
            disabled={!category && !tag && !antiCorrosive && !fertilizer}
          />
          <Button
            title="Clear"
            onClick={handleClear}
            disabled={!category && !tag && !antiCorrosive && !fertilizer}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFinder;
