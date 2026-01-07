import React from "react";
import dynamic from "next/dynamic";
import ProductInformation from "@/components/productDetail/ProductInformation";
import SeoHeader from "@/components/seo/SeoHeader";
import { categories } from "@/helpers/productData";

/* ================= SAFE OPTIMIZATION ================= */
// Flatten once (instead of every page build)
const allProducts = categories.flatMap(
  (category) => category.products
);

// Dynamically load ProductList (NO SSR, same UI)
const ProductList = dynamic(
  () => import("@/components/product/ProductList"),
  { ssr: false }
);

const ProductDetail = ({
  meta,
  product,
  categoriesData,
  previousSlug,
  nextSlug,
}) => {
  return (
    <>
      <SeoHeader meta={meta} />

      <ProductInformation
        product={product}
        previousSlug={previousSlug}
        nextSlug={nextSlug}
      />

      <ProductList
        categories={categoriesData}
        currentSlug={product?.slug}
      />
    </>
  );
};

export default ProductDetail;

/* ================= STATIC PATHS ================= */
export const getStaticPaths = async () => {
  const paths = allProducts.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: false, // ✅ SAFE & FAST (you already know all products)
  };
};

/* ================= STATIC PROPS ================= */
export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  const currentIndex = allProducts.findIndex(
    (p) => p.slug === slug
  );

  if (currentIndex === -1) return { notFound: true };

  const productData = allProducts[currentIndex];

  const previousIndex =
    currentIndex === 0 ? allProducts.length - 1 : currentIndex - 1;

  const nextIndex =
    currentIndex === allProducts.length - 1 ? 0 : currentIndex + 1;

  return {
    props: {
      product: productData,
      meta: productData?.meta || null,
      categoriesData: categories,
      previousSlug: allProducts[previousIndex].slug,
      nextSlug: allProducts[nextIndex].slug,
    },
  };
};
