import Link from "next/link";
import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { MdArrowOutward, MdOutlineFileDownload } from "react-icons/md";
import Button from "../common/Button";

const ProductInformation = ({ product, previousSlug, nextSlug }) => {
  const handleOnClick = (link) => {
    if (typeof window === "undefined") return; // safety check
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="product_info_section">
      <div id="product_info_section_container">
        <div id="change_product">
          {previousSlug && (
            <Link href={`/products/${previousSlug}`}>
              <span>
                <GrFormPrevious /> Previous
              </span>
            </Link>
          )}
          {nextSlug && (
            <Link href={`/products/${nextSlug}`}>
              <span>
                Next <GrFormNext />
              </span>
            </Link>
          )}
        </div>

        <div id="product_content">
          {/* Product preview shades */}
          <div id="product_preview">
            {product?.shades?.map((shade, idx) => (
              <div
                key={idx}
                className={`product_sample ${product.style ? "center" : ""}`}
                style={{ backgroundColor: shade }}
              >
                <span>{idx === 0 ? "FT Shade" : "RT Shade"}</span>
              </div>
            ))}
          </div>

          {/* Product title and description */}
          <div className="product_title_box">
            <h5>{product?.name}</h5>
            <p>{product?.desc}</p>
          </div>

          {/* Tags and applications */}
          <div className="product_tags_container">
            <div className="product_card_desc">
              {product?.tags?.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>

            {product?.application && (
              <div className="product_application">
                <span>Application:</span>
                {product?.application?.map((app, idx) => (
                  <span key={idx}>
                    <IoIosCheckmarkCircle /> {app}
                  </span>
                ))}
              </div>
            )}
            {product?.decorative && (
              <div className="product_application">
                <span>Decorative Paint:</span>
                {product?.decorative?.map((app, idx) => (
                  <span key={idx}>
                    <IoIosCheckmarkCircle /> {app}
                  </span>
                ))}
              </div>
            )}
            {product?.industrial && (
              <div className="product_application">
                <span>Industrial Coating:</span>
                {product?.industrial?.map((app, idx) => (
                  <span key={idx}>
                    <IoIosCheckmarkCircle /> {app}
                  </span>
                ))}
              </div>
            )}

            {product?.Properties && (
              <div className="product_application properties">
                <span>Properties:</span>
                {product?.Properties?.map((pro, idx) => (
                  <span key={idx}>{pro}</span>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="product_btns">
              <Button
                title={"Request Quotation"}
                color={"blue"}
                width={"size"}
                icon={<MdArrowOutward />}
              />
              {product?.msds && (
                <Button
                  title={"MSDS Download"}
                  color={"blue-border"}
                  width={"size"}
                  icon={<MdOutlineFileDownload />}
                  link={product?.msds}
                  newTab={true}
                />
              )}
              {product?.tds && (
                <Button
                  title={"TDS Download"}
                  color={"blue-border"}
                  width={"size"}
                  icon={<MdOutlineFileDownload />}
                  link={product?.tds}
                  newTab={true}
                />
              )}
            </div>
            {product?.use && (
              <div className="product_application use">
                {product?.use?.map((u, idx) => (
                  <span key={idx}>
                    {idx === 0 && <IoIosCheckmarkCircle />}
                    {idx === 1 && <IoIosCheckmarkCircleOutline />}
                    {u}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
