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

  // Form fields
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  /* ================= ANIMATION ================= */
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

  /* ================= CLOSE DROPDOWN OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (productDropdownOpen && !e.target.closest(".product_multiselect")) {
        setProductDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [productDropdownOpen]);

  /* ================= PRODUCT SELECTION ================= */
  const toggleProduct = (product) => {
    if (selectedProducts.find((p) => p.slug === product.slug)) {
      setSelectedProducts(
        selectedProducts.filter((p) => p.slug !== product.slug)
      );
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
    setProductDropdownOpen(false);
  };
  const removeProduct = (slug) => {
    setSelectedProducts(selectedProducts.filter((p) => p.slug !== slug));
  };

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Invalid phone number";
    if (selectedProducts.length === 0)
      newErrors.products = "Select at least one product";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Extract only the names of the selected products
    const productNames = selectedProducts.map((p) => p.name);

    console.log("Form Submitted:", { ...form, products: productNames });
    alert("Request submitted successfully!");

    setForm({ name: "", email: "", phone: "" });
    setSelectedProducts([]);
    setOpen(false);
  };

  return (
    <div
      id="request_form"
      ref={overlayRef}
      style={{ display: "none", opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <div
        id="request_form_container"
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Request Quotation</h2>
        <p>
          Please fill the details below for further communication.
          <br />
          Our team will get back to you soon.
        </p>

        <div>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Your Phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="input-wrapper">
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
              {errors.products && <p className="error">{errors.products}</p>}
            </div>
          </div>

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

          {/* ================= CUSTOM BUTTON ================= */}
          <Button
            title={"Submit"}
            color={"blue"}
            icon={<MdArrowOutward />}
            width={"full"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
