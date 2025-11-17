import React from "react";
import { useRouter } from "next/navigation";

const Button = ({ title, color, width, link, onClick, newTab, icon }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (!link) return;

    if (newTab) {
      // open in new tab without 
      const a = document.createElement("a");
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();
    } else {
      router.push(link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`button ${color ? color : ""} ${width ? width : ""}`}
    >
      <div className="btn-text">
        <div className="btn-text-wrap">
          <h6>{title}</h6>
          {icon && icon}
        </div>
        <div className="btn-text-wrap">
          <h6>{title}</h6>
          {icon && icon}
        </div>
      </div>
    </div>
  );
};

export default Button;
