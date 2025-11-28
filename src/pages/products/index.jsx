import ProductFinder from "@/components/home/ProductFinder";
import ProductCard from "@/components/product/ProductCard";
import SeoHeader from "@/components/seo/SeoHeader";
import { categories } from "@/helpers/productData";
import { useRouter } from "next/router";

export default function ResultPage({ meta }) {
  const router = useRouter();
  const { category, tag, antiCorrosive, fertilizer } = router.query;

  const hasFilters = category || tag || antiCorrosive || fertilizer;

  const allProducts = categories.flatMap((c) => c.products);

  let filtered = [];

  // Helper functions to group results
  function groupByCategory(list) {
    const map = new Map();
    list.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    });
    return Array.from(map, ([category, products]) => ({ category, products }));
  }

  const tagOrder = ["PB 15.0", "PB 15.1", "PB 15.3", "PB 15.4", "PG 7"];

  const groupByTag = (data) => {
    const grouped = {};

    data.forEach((item) => {
      if (
        item.category === "Anti Corrosives" ||
        item.category === "Fertilizers"
      )
        return;

      const mainTag = item.tags?.[0];
      if (!mainTag) return;

      if (!grouped[mainTag]) grouped[mainTag] = [];
      grouped[mainTag].push(item);
    });

    // Convert to array and sort by tagOrder
    const groupedArray = Object.keys(grouped)
      .map((tag) => ({ category: tag, products: grouped[tag] }))
      .sort(
        (a, b) => tagOrder.indexOf(a.category) - tagOrder.indexOf(b.category)
      );

    return groupedArray;
  };

  if (hasFilters) {
    let result = [];

    // CATEGORY FILTER
    if (category) {
      if (category.toLowerCase() === "all") {
        result.push(...allProducts);
      } else {
        result.push(
          ...allProducts.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          )
        );
      }
    }

    // TAG FILTER
    if (tag) {
      console.log(tag);

      if (tag.toLowerCase() === "all") {
        result.push(...allProducts);
      } else {
        result.push(
          ...allProducts.filter((p) =>
            p.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
          )
        );
      }
    }

    // ANTI CORROSIVE
    if (antiCorrosive) {
      if (antiCorrosive.toLowerCase() === "all") {
        result.push(
          ...allProducts.filter((p) => p.category === "Anti Corrosives")
        );
      } else {
        result.push(
          ...allProducts.filter((p) =>
            p.name.toLowerCase().includes(antiCorrosive.toLowerCase())
          )
        );
      }
    }

    // FERTILIZER
    if (fertilizer) {
      if (fertilizer.toLowerCase() === "all") {
        result.push(...allProducts.filter((p) => p.category === "Fertilizers"));
      } else {
        result.push(
          ...allProducts.filter((p) =>
            p.name.toLowerCase().includes(fertilizer.toLowerCase())
          )
        );
      }
    }

    // Remove duplicates
    filtered = Array.from(new Map(result.map((p) => [p.slug, p])).values());
  }

  // GROUPED RESULT
  let groupedData = [];

  if (tag) {
    if (tag.toLowerCase() === "all") {
      // Show all products grouped by tag[0]
      groupedData = groupByTag(filtered);
    } else {
      // Filter by single tag
      const selectedTag = tag.toLowerCase();
      const tagProducts = allProducts.filter(
        (p) => p.tags?.[0].toLowerCase() === selectedTag
      );
      groupedData = [
        {
          category: tag, // use the tag name as the group header
          products: tagProducts,
        },
      ];
    }
  } else if (category || antiCorrosive || fertilizer) {
    groupedData = groupByCategory(filtered);
  } else {
    groupedData = groupByCategory(filtered);
  }

  return (
    <>
      <SeoHeader meta={meta} />

      <ProductFinder
        isHero={true}
        initialValues={{
          category,
          tag,
          antiCorrosive,
          fertilizer,
        }}
      />

      {/* ================================
          RESULTS
      ================================== */}
      {hasFilters ? (
        groupedData.map((group, idx) => (
          <div key={idx} className="product_list">
            <h5>{group.category || group.tag}</h5>

            <div className="product_list_container">
              {group.products.map((item, i) => (
                <ProductCard key={i} product={item} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="product_list">
          <h5>No filters applied</h5>
        </div>
      )}
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
