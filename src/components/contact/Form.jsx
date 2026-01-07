import React, { useState } from "react";
import Button from "../common/Button";
import { MdArrowOutward } from "react-icons/md";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10,15}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    console.log(
      JSON.stringify({
        ...form,
        phone: `+${form.phone}`, // send with +
      })
    );

    try {
      const res = await fetch("/api/submitcontact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: `+${form.phone}`, // send with +
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.error || "Submission failed");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="">
      <h5>Keep in Touch</h5>

      {/* NAME */}
      <div className="form_group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      {/* EMAIL */}
      <div className="form_group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your mail"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      {/* PHONE (Improved UI) */}
      <div className="form_group">
        <label htmlFor="phone">Phone</label>

        <PhoneInput
          country="in"
          enableSearch
          icon={false}
          value={form.phone}
          onChange={(phone) => {
            setForm({ ...form, phone });
            setErrors({ ...errors, phone: "" });
          }}
          inputProps={{
            name: "phone",
            required: true,
          }}
          containerStyle={{
            width: "100%",
          }}
          inputStyle={{
            width: "100%",
            height: "48px",
            fontSize: "14px",
            borderRadius: "10px",
            border: "1px solid #00000033",
            paddingLeft: "60px", // 🔥 THIS FIXES TEXT HIDING
          }}
          buttonStyle={{
            padding: "0 5px",
            borderRadius: "10px 0 0 10px",
            background: "white",
          }}
        />

        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      {/* MESSAGE */}
      <div className="form_group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Your Message"
          rows="4"
          value={form.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <p className="error">{errors.message}</p>}
      </div>

      {/* BUTTON */}
      <Button
        title={loading ? "Submitting..." : "Submit"}
        color="blue"
        icon={<MdArrowOutward />}
        width="full"
        onClick={handleSubmit}
        disabled={loading}
      />
    </form>
  );
};

export default Form;
