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
            <a
              target="_blank"
              href="https://www.linkedin.com/company/kesar-petroproducts-limited/"
            >
              <BsLinkedin />
            </a>
          </div>
          <div className="socail-footer">
            <Image
              style={{ width: "60px", height: "auto", marginTop:"20px" }}
              width={1000}
              height={1000}
              src="/reach-compliance.png"
              alt="reach-compliance"
            />
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
            <Link href="/about#leadership_section">Team</Link>
            {/* <Link href="/investors">Investors</Link> */}
            <Link href="/gallery">Gallery</Link>
            {/* <Link href="/#latest-news-section">News</Link> */}
            <Link href="/contact">Contact</Link>
            {/* <Link href="/contact">Careers</Link> */}
          </div>
          <div>
            <h5>Downloads</h5>
            <a href="/footer-pdf/Kesar-Corporate-Ppt.pdf" target="_blank">
              Corporate Presentation
            </a>
            <a href="/footer-pdf/E-brochure.pdf" target="_blank">
              E Brochure
            </a>
            <a href="/footer-pdf/ISO-certificate.pdf" target="_blank">
              ISO Certificate
            </a>
            <a
              href="/footer-pdf/REACH registration for Phthalo Blues.pdf"
              target="_blank"
            >
              REACH registration for <br /> Phthalo Blues
            </a>
            <a
              href="/footer-pdf/REACH Registration for Pigment Green 7.pdf"
              target="_blank"
            >
              REACH Registration for : <br /> Pigment Green 7
            </a>
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
            <a href="tel:+91 (22) 6123-4567">
              <PiPhoneFill /> +91 (22) 6123-4567
            </a>
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
            {/* <Link href="/">Terms & Conditions</Link>| */}
            <Link href="/privacy-policy">Privacy Policy</Link>|
            <Link href="/legal-notice">Legal Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
