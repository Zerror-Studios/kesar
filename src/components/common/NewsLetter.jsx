import React, { useState } from "react";
import Button from "./Button";
import { GrFormNext } from "react-icons/gr";
import { toast } from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(""); // reset error

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        setError(data.error || "Subscription failed");
      }
    } catch {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter">
      <input
        type="text"
        placeholder="Enter your email id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <Button
        title={loading ? "Subscribing..." : "Subscribe"}
        icon={<GrFormNext />}
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
};

export default NewsLetter;
