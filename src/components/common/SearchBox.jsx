import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { categories } from "@/helpers/productData";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  // --- Filter Logic ---
  const filtered = categories
    .map((cat) => {
      const q = query.toLowerCase();

      // match category name
      const categoryMatch = cat.category.toLowerCase().includes(q);

      // match product name
      const matchedProducts = cat.products.filter((p) =>
        p.name.toLowerCase().includes(q)
      );

      // If category matches → return entire category
      if (categoryMatch) {
        return {
          category: cat.category,
          products: cat.products,
        };
      }

      // If no category match but some products match → return filtered ones
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery(""); // close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dim background and change root variable when dropdown is open
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

  return (
    <div
      ref={searchRef}
      className={`input-container ${query ? "open" : ""} ${
        query && !hasResults ? "no-data" : ""
      }`}
    >
      <BiSearch />

      {/* Input */}
      <input
        type="text"
        placeholder="Search Products here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Dropdown */}
      {query && (
        <div className="search-container-dropdown" data-lenis-prevent>
          <div className="search-dropdown-wrapper">
            {hasResults ? (
              filtered.map((cat) => (
                <div className="category_box" key={cat.category}>
                  <p>{cat.category.toUpperCase()}</p>
                  <ul>
                    {cat.products.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setQuery("")} // close on click
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
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
