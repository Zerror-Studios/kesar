import ProductList from "@/components/product/ProductList";
import ProductInformation from "@/components/productDetail/ProductInformation";
import SeoHeader from "@/components/seo/SeoHeader";
import { categories } from "@/helpers/productData";
import React from "react";

const ProductDetail = ({ meta, product, categoriesData, previousSlug, nextSlug }) => {
  return (
    <>
    <SeoHeader meta={meta} />
      <ProductInformation
        product={product}
        previousSlug={previousSlug}
        nextSlug={nextSlug}
      />
      <ProductList categories={categoriesData} currentSlug={product?.slug} />
    </>
  );
};

export default ProductDetail;

export const getStaticPaths = async () => {
  const paths = categories.flatMap((category) =>
    category.products.map((product) => ({
      params: { slug: product.slug },
    }))
  );

  return {
    paths,
    fallback: true, // still allows new slugs to render dynamically
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  // Flatten all products
  const allProducts = categories.flatMap((category) => category.products);

  // Find current product index
  const currentIndex = allProducts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) return { notFound: true };

  const productData = allProducts[currentIndex];

  // Circular navigation
  const previousIndex =
    currentIndex === 0 ? allProducts.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex === allProducts.length - 1 ? 0 : currentIndex + 1;

  return {
    props: {
      product: productData,
      meta:productData?.meta,
      categoriesData: categories,
      previousSlug: allProducts[previousIndex].slug,
      nextSlug: allProducts[nextIndex].slug,
    },
  };
};
