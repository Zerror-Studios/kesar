import ProductFinder from "@/components/home/ProductFinder";
import ProductCard from "@/components/product/ProductCard";
import SeoHeader from "@/components/seo/SeoHeader";
import { categories } from "@/helpers/productData";
import { useRouter } from "next/router";

export default function ResultPage({ meta }) {
  const router = useRouter();
  const { category, tag, antiCorrosive, fertilizer } = router.query;

  // Check if user applied any filter
  const hasFilters =
    category || tag || antiCorrosive || fertilizer;

  // Flatten products
  const allProducts = categories.flatMap((c) => c.products);

  // FILTERING LOGIC
  const filtered = hasFilters
    ? allProducts.filter((p) => {
        let ok = true;

        if (category) {
          ok = ok && p.category.toLowerCase() === category.toLowerCase();
        }

        if (tag) ok = ok && p.tags?.includes(tag);
        if (antiCorrosive)
          ok =
            ok &&
            p.name.toLowerCase().includes(antiCorrosive.toLowerCase());
        if (fertilizer)
          ok = ok && p.name.toLowerCase().includes(fertilizer.toLowerCase());

        return ok;
      })
    : []; // no filters → no results

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
          RESULTS AREA (conditional)
      ================================= */}
      {hasFilters ? (
        <div className="product_list">
          <h5>
            Results <sup>({filtered.length})</sup>
          </h5>

          <div className="product_list_container">
            {filtered.map((item, idx) => (
              <ProductCard key={idx} product={item} />
            ))}
          </div>
        </div>
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
      "Product Finder – Search Industrial Petrochemical Products | Kesar Petroproducts Ltd.",
    description:
      "Use the Kesar Petroproducts Product Finder to quickly search, filter, and discover phthalic anhydride, plasticizers, CPW, alkyd resins, and other industrial petrochemical solutions.",
    keywords:
      "product finder, chemical product search, petrochemical finder, phthalic anhydride, plasticizers, CPW, alkyd resins, industrial chemicals",
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
