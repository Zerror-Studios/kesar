import React, { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import Button from "./Button";
import { categories } from "@/helpers/productData";
import { toast } from "react-hot-toast";
import { useModalStore } from "@/stores/modalStore";
import { IoCloseSharp } from "react-icons/io5";

const RequestForm = ({ open, setOpen }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const { requestedProduct } = useModalStore();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      setForm({ name: "", email: "", phone: "" });
      setSelectedProducts([]);
      setErrors({});
      setOpen();
    }
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
    setErrors({ ...errors, [e.target.id]: "" });
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

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    const productNames = selectedProducts.map((p) => p.name);
    const formData = { ...form, products: productNames };

    try {
      const response = await fetch("/api/submitEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setForm({ name: "", email: "", phone: "" });
        setSelectedProducts([]);
        setErrors({});
        toast.success("Form submitted successfully!");
        setOpen();
      } else {
        toast.error(data.error || "Submission failed");
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        <div id="form_header">
          <h2>Request Quotation</h2>
          <span
            id="close_btn"
            onClick={() => {
              setForm({ name: "", email: "", phone: "" });
              setSelectedProducts([]);
              setErrors({});
              setOpen(); 
            }}
          >
            {" "}
            <IoCloseSharp />
          </span>
        </div>
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
    </div>
  );
};

export default RequestForm;
