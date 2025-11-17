import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({ label = "Select", options = [], value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || label);
  const dropdownRef = useRef(null);

  // update internal state when parent value changes
  useEffect(() => {
    setSelected(value || label);
  }, [value, label]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    if (onSelect) onSelect(opt);
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${open ? "open" : ""}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <span>{selected}</span>
      <IoMdArrowDropdown />

      <div className="dropdown_items" data-lenis-prevent>
        {options.map((opt, idx) => (
          <h5
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(opt);
            }}
          >
            {opt}
          </h5>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
