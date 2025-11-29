import React, { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import Button from "./Button";
import { categories } from "@/helpers/productData";

const RequestForm = ({ open, setOpen }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  /* ===========================================================
     ANIMATION
  ============================================================ */
  useEffect(() => {
    if (open) {
      gsap.to(overlayRef.current, {
        duration: 0.4,
        autoAlpha: 1,
        display: "flex",
      });
      gsap.fromTo(
        containerRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(containerRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        duration: 0.4,
        autoAlpha: 0,
        onComplete: () => (overlayRef.current.style.display = "none"),
      });
    }
  }, [open]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) setOpen(false);
  };

  /* ===========================================================
   CLOSE DROPDOWN ON OUTSIDE CLICK
=========================================================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (productDropdownOpen && !e.target.closest(".product_multiselect")) {
        setProductDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [productDropdownOpen]);

  /* ===========================================================
     PRODUCT SELECTION LOGIC
  ============================================================ */
  const toggleProduct = (product) => {
    if (selectedProducts.find((p) => p.slug === product.slug)) {
      setSelectedProducts(
        selectedProducts.filter((p) => p.slug !== product.slug)
      );
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
    // Close the dropdown after selecting
    setProductDropdownOpen(false);
  };
  const removeProduct = (slug) => {
    setSelectedProducts(selectedProducts.filter((p) => p.slug !== slug));
  };

  return (
    <div
      id="request_form"
      ref={overlayRef}
      style={{ display: "none", opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <div id="request_form_container" ref={containerRef}>
        <h2>Request Quotation</h2>
        <p>
          Please fill the details below for further communication.
          <br />
          Our team will get back to you soon.
        </p>

        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your Name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" />

          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" placeholder="Your Phone" />

          {/* ================= PRODUCT MULTISELECT ================= */}
          <label htmlFor="product">Select Product</label>
          <div className="product_multiselect">
            <div
              className="dropdown_input"
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
            >
              {selectedProducts.length === 0
                ? "Select Product(s)"
                : `${selectedProducts.length} Product(s) Selected`}
            </div>

            {productDropdownOpen && (
              <div className="dropdown_menu" data-lenis-prevent>
                {categories.map((cat) => (
                  <div key={cat.category}>
                    <strong>{cat.category}</strong>
                    <ul>
                      {cat.products.map((prod) => (
                        <li
                          key={prod.slug}
                          onClick={() => toggleProduct(prod)}
                          className={
                            selectedProducts.find((p) => p.slug === prod.slug)
                              ? "selected"
                              : ""
                          }
                        >
                          {prod.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= SELECTED PRODUCTS BADGES ================= */}
          {selectedProducts.length > 0 && (
            <div className="selected_products_badges">
              {selectedProducts.map((prod) => (
                <div key={prod.slug} className="badge">
                  {prod.name}
                  <span
                    className="remove"
                    onClick={() => removeProduct(prod.slug)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          )}

          <Button
            title={"Submit"}
            color={"blue"}
            icon={<MdArrowOutward />}
            width={"full"}
          />
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
