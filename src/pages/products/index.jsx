import ProductFinder from "@/components/home/ProductFinder";
import ProductCard from "@/components/product/ProductCard";
import SeoHeader from "@/components/seo/SeoHeader";
import { categories } from "@/helpers/productData";
import { useRouter } from "next/router";

export default function ResultPage({ meta }) {
  const router = useRouter();
  const { category, tag, antiCorrosive, fertilizer } = router.query;
  const applicationOptions = [
    "All",
    "Ink",
    "Coating",
    "Plastic",
    "Offset",
    "Universal",
  ];
  const indexOptions = [
    "All",
    "PB 15.0",
    "PB 15.1",
    "PB 15.3",
    "PB 15.4",
    "PG 7",
  ];
  const allProducts = categories.flatMap((c) => c.products);
  const normalCategories = ["ink", "coating", "plastic", "offset", "universal"];

  // Helper: filter normal products (ink, coating, etc.)
  const filterNormalProducts = () => {
    let products = allProducts.filter((p) =>
      normalCategories.includes(p.category.toLowerCase())
    );

    if (category && category.toLowerCase() !== "all") {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag && tag.toLowerCase() !== "all") {
      products = products.filter((p) =>
        p.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    return products;
  };

  // Helper: group products by category
  const groupByCategory = (list) => {
    const map = new Map();
    list.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    });
    return Array.from(map, ([category, products]) => ({ category, products }));
  };

  // Helper: filter AntiCorrosives/Fertilizer
  const filterSpecialCategory = (type, value) => {
    if (!value) return [];
    let products = allProducts.filter((p) => p.category === type);
    if (value.toLowerCase() !== "all") {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    return products;
  };

  // Build grouped data
  let groupedData = [];

  const hasQuery = Object.keys(router.query).length > 0;

  if (!hasQuery) {
    // No query → show all
    const normalProducts = allProducts.filter((p) =>
      normalCategories.includes(p.category.toLowerCase())
    );
    groupedData.push(...groupByCategory(normalProducts));

    groupedData.push({
      category: "Anti Corrosives",
      products: allProducts.filter((p) => p.category === "Anti Corrosives"),
    });
    groupedData.push({
      category: "Fertilizers",
      products: allProducts.filter((p) => p.category === "Fertilizers"),
    });
  } else {
    // Query exists → show only products for non-empty queries
    const normalProducts = filterNormalProducts();
    if (normalProducts.length && (category || tag)) {
      if (tag && tag.toLowerCase() !== "all") {
        groupedData.push({
          category: tag,
          products: normalProducts,
        });
      } else {
        groupedData.push(...groupByCategory(normalProducts));
      }
    }

    const antiProducts = filterSpecialCategory(
      "Anti Corrosives",
      antiCorrosive
    );
    if (antiProducts.length) {
      groupedData.push({ category: "Anti Corrosives", products: antiProducts });
    }

    const fertilizerProducts = filterSpecialCategory("Fertilizers", fertilizer);
    if (fertilizerProducts.length) {
      groupedData.push({
        category: "Fertilizers",
        products: fertilizerProducts,
      });
    }
  }

  // Render
  return (
    <>
      <SeoHeader meta={meta} />
      <ProductFinder
        title={"Product Families"}
        description={
          "Comprehensive range of Phthalocyanine Pigments Blue and Green engineered for your specific applications."
        }
        isHero={true}
        application={applicationOptions}
        index={indexOptions}
        initialValues={{ category, tag, antiCorrosive, fertilizer }}
      />
      {groupedData.map((group, idx) => (
        <div key={idx} className="product_list">
          <h5>{group.category}</h5>
          <div className="product_list_container">
            {group.products.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

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
