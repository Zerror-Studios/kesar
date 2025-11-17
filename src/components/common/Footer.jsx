import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiEnvelopeFill, PiPhoneFill, PiTwitterLogoFill } from "react-icons/pi";
import { RiFacebookFill, RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { GrFormNext, GrNext } from "react-icons/gr";
import Button from "./Button";

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
            <Link href="/">PB 15.0, 15.1, 15.3</Link>
            <Link href="/">Pigment Green 7</Link>
            <Link href="/">Anti Corrosives</Link>
            <Link href="/">Fertilizers</Link>
            <Link href="/">CPC Blue</Link>
            <Link href="/">Technical Downloads</Link>
          </div>
          <div>
            <h5>Applications</h5>
            <Link href="/">Inks</Link>
            <Link href="/">Coatings</Link>
            <Link href="/">Plastics (Master Batch)</Link>
            <Link href="/">Offset</Link>
          </div>
          <div>
            <h5>Company</h5>
            <Link href="/">About Us</Link>
            <Link href="/">Leadership</Link>
            <Link href="/">Global Presence</Link>
            <Link href="/">Certifications</Link>
            <Link href="/">Careers</Link>
          </div>
          <div>
            <h5>Support</h5>
            <Link href="/">Quality</Link>
            <Link href="/">Sustainability</Link>
            <Link href="/">Investor Relations</Link>
            <Link href="/">News</Link>
            <Link href="/">Contact</Link>
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
          <div className="newsletter">
            <input type="text" placeholder="Enter your email id" />
            <Button title={"Subscribe"} icon={<GrFormNext />} />
          </div>
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
