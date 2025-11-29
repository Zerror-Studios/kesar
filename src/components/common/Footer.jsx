import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiEnvelopeFill, PiPhoneFill, PiTwitterLogoFill } from "react-icons/pi";
import { RiFacebookFill, RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { GrFormNext, GrNext } from "react-icons/gr";
import Button from "./Button";
import { productCards } from "@/helpers/homeProducts";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  return (
    <footer>
      <div id="footer-top">
        <div className="footer-left">
          <Link href="/">
            <Image
              src="/kesar-logo.webp"
              alt="Kesar"
              width={1000}
              height={1000}
            />
          </Link>
          <p>
            India's leading manufacturer of phthalocyanine blue pigments, <br />
            serving customers globally with integrated value chain solutions.
          </p>
          <div className="socail-footer">
            <a href="/">
              <PiTwitterLogoFill />
            </a>
            <a href="/">
              <RiFacebookFill />
            </a>
            <a href="/">
              <BsLinkedin />
            </a>
            <a href="/">
              <RiInstagramFill />
            </a>
          </div>
        </div>
        <div className="footer-right">
          <div>
            <h5>Products</h5>
            {productCards.map((product, i) => (
              <Link key={i} href={product.slug}>
                {product.name}
              </Link>
            ))}
          </div>
          <div>
            <h5>Company</h5>
            <Link href="/about">About Us</Link>
            <Link href="/about">Team</Link>
            <Link href="/investors">Investors</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/#latest-news-section">News</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/">Careers</Link>
          </div>
        </div>
      </div>
      <div id="footer-mid">
        <div className="footer-left">
          <h5>CORPORATE ADDRESS:</h5>
          <a href="/">
            404, Naman Centre, C - 31/ G Block, BKC, Bandra (East), <br />{" "}
            Mumbai - 400051, Maharashtra, India
          </a>
          <div className="footer_numbers">
            <a href="tel:+91-22-49637498">
              <PiPhoneFill /> +91-22-49637498
            </a>
            |<a href="tel:+91-22-59637448">+91-22-59637448</a>
          </div>

          <a href="mailto:info@kesarpetroproducts.com">
            <PiEnvelopeFill /> info@kesarpetroproducts.com
          </a>
          <h5 className="factory">Factory:</h5>
          <a href="tel:+919156018271">
            <PiPhoneFill /> +919156018271
          </a>
          <a href="mailto:kesar.factory@gmail.com ">
            <PiEnvelopeFill /> kesar.factory@gmail.com
          </a>
        </div>
        <div className="footer-right">
          <h5>Stay Updated</h5>
          <p>
            Subscribe to our newsletter for the latest industry insights, <br />
            product updates, and technical innovations delivered directly to
            your inbox.
          </p>
          <NewsLetter />
        </div>
      </div>
      <div id="footer-btm">
        <div className="footer-left">
          <p>
            <span>Registered Address:</span> MIDC Lote Parshuram, Taluka - Khed,
            District - Ratnagiri, Maharashtra - 415722
          </p>
        </div>
        <div className="footer-right">
          <p> © 2024 Kesar Petroproducts Ltd. All rights reserved.</p>
          <div>
            <Link href="/">Terms & Conditions</Link>|
            <Link href="/">Privacy Policy</Link>|
            <Link href="/">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
