import ProductHero from "@/components/product/ProductHero";
import ProductList from "@/components/product/ProductList";
import SeoHeader from "@/components/seo/SeoHeader";
import { categories } from "@/helpers/productData";
import React, { useState, useEffect } from "react";

const Product = ({ categoriesData, meta }) => {
  const [application, setApplication] = useState("");
  const [colourIndex, setColourIndex] = useState("");
  const [antiCorrosive, setAntiCorrosive] = useState("");
  const [fertilizer, setFertilizer] = useState("");

  const [filteredData, setFilteredData] = useState(categoriesData);

  useEffect(() => {
    // If no filter applied -> show all categories
    const hasFilters =
      application || colourIndex || antiCorrosive || fertilizer;

    if (!hasFilters) {
      setFilteredData(categoriesData);
      return;
    }

    // Flatten all products with references to their category
    const allProducts = categoriesData.flatMap((c) =>
      c.products.map((p) => ({ ...p, __category: c.category }))
    );

    let result = [];

    // category (application) -> match p.category
    if (application) {
      result.push(
        ...allProducts.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase() === application.toLowerCase()
        )
      );
    }

    // tag (colourIndex) -> match p.tags includes
    if (colourIndex) {
      result.push(
        ...allProducts.filter((p) =>
          p.tags?.some((t) =>
            t.toLowerCase().includes(colourIndex.toLowerCase())
          )
        )
      );
    }

    // antiCorrosive -> match inside name
    if (antiCorrosive) {
      result.push(
        ...allProducts.filter((p) =>
          p.name.toLowerCase().includes(antiCorrosive.toLowerCase())
        )
      );
    }

    // fertilizer -> match inside name
    if (fertilizer) {
      result.push(
        ...allProducts.filter((p) =>
          p.name.toLowerCase().includes(fertilizer.toLowerCase())
        )
      );
    }

    // Deduplicate by slug (keep first occurrence)
    const deduped = Array.from(
      new Map(result.map((p) => [p.slug, p])).values()
    );

    // Group deduped products back into categories array format
    const groupedMap = new Map();
    deduped.forEach((p) => {
      const cat = p.__category || p.category || "Uncategorized";
      if (!groupedMap.has(cat)) groupedMap.set(cat, []);
      // remove the __category helper before pushing (optional)
      const { __category, ...prod } = p;
      groupedMap.get(cat).push(prod);
    });

    const groupedCategories = Array.from(groupedMap.entries()).map(
      ([category, products]) => ({ category, products })
    );

    setFilteredData(groupedCategories);
  }, [application, colourIndex, antiCorrosive, fertilizer, categoriesData]);

  return (
    <>
      <SeoHeader meta={meta} />

      <ProductHero
        application={application}
        setApplication={setApplication}
        colourIndex={colourIndex}
        setColourIndex={setColourIndex}
        antiCorrosive={antiCorrosive}
        setAntiCorrosive={setAntiCorrosive}
        fertilizer={fertilizer}
        setFertilizer={setFertilizer}
        clearFilters={() => {
          setApplication("");
          setColourIndex("");
          setAntiCorrosive("");
          setFertilizer("");
        }}
      />

      <ProductList categories={filteredData} />
    </>
  );
};

export default Product;

// ----------------------------
// SEO & STATIC PROPS
// ----------------------------
export const getStaticProps = async () => {
  const meta = {
    title:
      "Kesar Petroproducts Ltd. – Our Products: Phthalic Anhydride, Plasticizers, Resins & Petrochemicals",
    description:
      "Explore Kesar Petroproducts' complete range of industrial petrochemical products including phthalic anhydride, CPW, plasticizers, alkyd resins, and more. Quality engineered for industrial applications.",
    keywords:
      "Kesar products, phthalic anhydride, CPW, alkyd resins, plasticizers, petrochemical products, chemical manufacturer, industrial chemicals",
    author: "Kesar Petroproducts Ltd.",
    robots: "index,follow",
  };

  return {
    props: {
      categoriesData: categories,
      meta,
    },
  };
};
