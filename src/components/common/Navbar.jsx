import Image from "next/image";
import React from "react";
import { BiSearch } from "react-icons/bi";
import Menu from "./Menu";
import Link from "next/link";
import RequestBtn from "./RequestBtn";
import SearchBox from "./SearchBox";

const Navbar = () => {
  return (
    <nav>
      <div className="logo-container">
        <Link href="/">
          <Image
            src="/kesar-logo.webp"
            alt="Kesar"
            priority
            width={1000}
            height={1000}
          />
        </Link>
        <p>
          Petro
          <br /> Products
        </p>
      </div>
      <Menu />
      <SearchBox />
      <RequestBtn />
    </nav>
  );
};

export default Navbar;
