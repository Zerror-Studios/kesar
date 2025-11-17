import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuData } from "@/helpers/MenuData";
import Image from "next/image";

const Menu = () => {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    if (window.innerWidth <= 768) return;
    setIsOpen(!isOpen);
  };

  const toggleMenuMobile = () => {
    if (window.innerWidth >= 768) return;
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  // Close menu on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dim content and change root variable when menu is open
  useEffect(() => {
    const contentWrapper = document.getElementById("content_wrapper");
    const root = document.documentElement;

    if (isOpen) {
      if (contentWrapper) {
        contentWrapper.style.filter = "brightness(0.7)";
        contentWrapper.style.transition = "filter 0.3s ease";
      }
      // Change root CSS variable
      root.style.setProperty("--background-color", "#B2B2B2");
    } else {
      if (contentWrapper) contentWrapper.style.filter = "brightness(1)";
      // Reset root CSS variable
      root.style.setProperty("--background-color", "#f3f3f3");
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`menu-container ${isOpen ? "open" : ""}`}
      onClick={toggleMenu}
    >
      <p id="menu_text">Menu</p>

      <Link href="/">
        <Image
          id="mobile_logo"
          src="/kesar-logo.webp"
          alt="Kesar"
          priority
          width={1000}
          height={1000}
        />
      </Link>

      <div id="menu-icon" onClick={toggleMenuMobile}>
        <span className="m-line"></span>
        <span className="m-line"></span>
        <span className="m-line"></span>
      </div>

      <div className="menu-container-dropdown">
        <ul>
          {MenuData.map((item, index) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li
                key={index}
                className={isActive ? "active" : ""}
                onClick={handleLinkClick}
              >
                <Link href={item.path}>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
