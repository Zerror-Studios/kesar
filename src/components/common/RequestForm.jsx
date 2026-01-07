import React, { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import Button from "./Button";
import { categories } from "@/helpers/productData";
import { toast } from "react-hot-toast";
import { useModalStore } from "@/stores/modalStore";
import { IoCloseSharp } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const RequestForm = ({ open, setOpen }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const { requestedProduct } = useModalStore();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [productQuery, setProductQuery] = useState("");

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (open && requestedProduct) {
      setSelectedProducts([requestedProduct]);
    } else if (!open) {
      setSelectedProducts([]);
    }
  }, [open, requestedProduct]);

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

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "" });
    setSelectedProducts([]);
    setErrors({});
    setProductQuery("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      resetForm();
      setOpen();
    }
  };

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (productDropdownOpen && !e.target.closest(".product_multiselect")) {
        setProductDropdownOpen(false);
        setProductQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [productDropdownOpen]);

  /* ================= FILTER ================= */
  const filteredCategories = categories
    .map((cat) => {
      const q = productQuery.toLowerCase();
      const categoryMatch = cat.category.toLowerCase().includes(q);

      const matchedProducts = cat.products
        .map((p) => {
          if (!q) return { ...p, _match: null };

          const nameMatch = p.name?.toLowerCase().includes(q);
          const matchedTag = Array.isArray(p.tags)
            ? p.tags.find((tag) => tag.toLowerCase().includes(q))
            : null;

          const matchedApplication = Array.isArray(p.application)
            ? p.application.find((app) =>
                app.application?.toLowerCase().includes(q)
              )
            : null;

          if (nameMatch) return { ...p, _match: null };
          if (matchedTag)
            return { ...p, _match: { type: "tag", value: matchedTag } };
          if (matchedApplication)
            return {
              ...p,
              _match: {
                type: "application",
                value: matchedApplication.application,
              },
            };

          return null;
        })
        .filter(Boolean);

      if (!q || categoryMatch)
        return {
          ...cat,
          products: cat.products.map((p) => ({ ...p, _match: null })),
        };

      if (matchedProducts.length > 0)
        return { ...cat, products: matchedProducts };

      return null;
    })
    .filter(Boolean);

  /* ================= PRODUCT ================= */
  const toggleProduct = (product) => {
    if (selectedProducts.find((p) => p.slug === product.slug)) {
      setSelectedProducts(
        selectedProducts.filter((p) => p.slug !== product.slug)
      );
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
    setProductDropdownOpen(false);
    setProductQuery("");
  };

  const removeProduct = (slug) => {
    setSelectedProducts(
      selectedProducts.filter((p) => p.slug !== slug)
    );
  };

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(form.phone))
      newErrors.phone = "Invalid phone number";
    if (selectedProducts.length === 0)
      newErrors.products = "Select at least one product";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    const formData = {
      ...form,
      phone: `+${form.phone}`,
      products: selectedProducts.map((p) => p.name),
    };

    try {
      const response = await fetch("/api/submitEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!");
        resetForm();
        setOpen();
      } else {
        toast.error("Submission failed");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
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
        <div id="form_header">
          <h2>Request Quotation</h2>
          <span
            id="close_btn"
            onClick={() => {
              resetForm();
              setOpen();
            }}
          >
            <IoCloseSharp />
          </span>
        </div>

        <p>
          Please fill the details below for further communication.
          <br />
          Our team will get back to you soon.
        </p>

        {/* NAME */}
        <div className="input-wrapper">
          <label>Name</label>
          <input
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* EMAIL */}
        <div className="input-wrapper">
          <label>Email</label>
          <input
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* PHONE */}
        <div className="input-wrapper">
          <label>Phone</label>
          <PhoneInput
            country="in"
            enableSearch
            value={form.phone}
            onChange={(phone) => {
              setForm({ ...form, phone });
              setErrors({ ...errors, phone: "" });
            }}
            inputStyle={{
              width: "100%",
              height: "38px",
              fontSize: "0.8rem",
              borderRadius: "10px",
              border: "1px solid #00000033",
              paddingLeft: "60px",
              
              
            }}
            buttonStyle={{
            padding: "0 5px",
            borderRadius: "10px 0 0 10px",
            background: "white",
          }}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* PRODUCT */}
        <div className="input-wrapper select-pro-input">
          <label>Select Product</label>
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
                <input
                  id="dropdown_menu_search"
                  placeholder="Search product"
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                />

                {filteredCategories.map((cat) => (
                  <div key={cat.category}>
                    <strong>{cat.category}</strong>
                    <ul>
                      {cat.products.map((prod) => (
                        <li
                          key={prod.slug}
                          onClick={() => toggleProduct(prod)}
                          className={
                            selectedProducts.find(
                              (p) => p.slug === prod.slug
                            )
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

            {errors.products && (
              <p className="error">{errors.products}</p>
            )}
          </div>
        </div>

        {/* SELECTED */}
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
          title={loading ? "Submitting..." : "Submit"}
          color="blue"
          icon={<MdArrowOutward />}
          width="full"
          onClick={handleSubmit}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default RequestForm;
