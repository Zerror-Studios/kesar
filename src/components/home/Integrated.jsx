import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { GrNext } from "react-icons/gr";

const Integrated = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Run only in browser
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkWidth(); // initial

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div id="integrated_section">
      <div id="integrated_container">
        <div id="integrated_details">
          <h4>Integrated Value Chain</h4>
          <p>
            We control CPC crude, cuprous chloride, synergists/additives, and
            captive power; manufacture PB 15:0/1/3 & PG7 (plus Activated CPC);
            and valorise by-products into Zinc Phosphate / ZnO / ZnCO₃ and DAP /
            MAP / Zinc Sulphate - closing the loop for repeatable shade, stable
            pricing, and lower waste.
          </p>

          {/* show button here only when NOT mobile */}
          {!isMobile && (
            <Button
              title="Learn More About our Integration"
              icon={<GrNext />}
              link="/about"
            />
          )}
        </div>

        <div id="integrated_process">
          <div className="process">
            <span>Backward Integration</span>
          </div>
          <div className="process">
            <span>Phthalocyanine Pigments</span>
          </div>
          <div className="process">
            <span>Forward Integration</span>
          </div>
        </div>

        {/* show button here only WHEN mobile */}
        {isMobile && (
          <Button
            title="Learn More About our Integration"
            icon={<GrNext />}
            link="/about"
          />
        )}
      </div>
    </div>
  );
};

export default Integrated;
