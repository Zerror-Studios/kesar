import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { categories } from "@/helpers/productData";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  // ---------------- FILTER LOGIC ----------------
  const filtered = categories
    .map((cat) => {
      const q = query.toLowerCase();

      const categoryMatch = cat.category.toLowerCase().includes(q);

      const matchedProducts = cat.products
        .map((p) => {
          const nameMatch = p.name?.toLowerCase().includes(q);

          // tag match
          const matchedTag = Array.isArray(p.tags)
            ? p.tags.find((tag) =>
                tag.toLowerCase().includes(q)
              )
            : null;

          // application match
          const matchedApplication = Array.isArray(p.application)
            ? p.application.find((app) =>
                app.application?.toLowerCase().includes(q)
              )
            : null;

          if (nameMatch) {
            return { ...p, _match: null };
          }

          if (matchedTag) {
            return {
              ...p,
              _match: {
                type: "tag",
                value: matchedTag,
              },
            };
          }

          if (matchedApplication) {
            return {
              ...p,
              _match: {
                type: "application",
                value: matchedApplication.application,
              },
            };
          }

          return null;
        })
        .filter(Boolean);

      if (categoryMatch) {
        return {
          category: cat.category,
          products: cat.products.map((p) => ({ ...p, _match: null })),
        };
      }

      if (matchedProducts.length > 0) {
        return {
          category: cat.category,
          products: matchedProducts,
        };
      }

      return null;
    })
    .filter(Boolean);

  const hasResults = filtered.length > 0;

  // ---------------- CLICK OUTSIDE ----------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------- BACKGROUND DIM ----------------
  useEffect(() => {
    const contentWrapper = document.getElementById("content_wrapper");
    const root = document.documentElement;

    if (query) {
      if (contentWrapper) {
        contentWrapper.style.filter = "brightness(0.7)";
        contentWrapper.style.transition = "filter 0.3s ease";
      }
      root.style.setProperty("--background-color", "#B2B2B2");
    } else {
      if (contentWrapper) contentWrapper.style.filter = "brightness(1)";
      root.style.setProperty("--background-color", "#f3f3f3");
    }
  }, [query]);

  // ---------------- UI ----------------
  return (
    <div
      ref={searchRef}
      className={`input-container ${query ? "open" : ""} ${
        query && !hasResults ? "no-data" : ""
      }`}
    >
      <BiSearch />

      <input
        type="text"
        placeholder="Search Products here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="search-container-dropdown" data-lenis-prevent>
          <div className="search-dropdown-wrapper">
            {hasResults ? (
              filtered.map((cat) => {
                const matchedProduct = cat.products.find(
                  (p) => p._match
                );

                return (
                  <div className="category_box" key={cat.category}>
                    <p>
                      {cat.category.toUpperCase()}
                      {matchedProduct?._match && (
                        <span className="match-label">
                          {" "}
                          ({matchedProduct._match.value})
                        </span>
                      )}
                    </p>

                    <ul>
                      {cat.products.map((product) => (
                        <li key={product.slug}>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setQuery("")}
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })
            ) : (
              <p className="no-data-text">No data found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
