import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({ label = "Select", options = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const dropdownRef = useRef(null);

  // click outside to close
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onSelect) onSelect(option); // send selected value to parent
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
