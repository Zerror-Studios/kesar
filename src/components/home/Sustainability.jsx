import React from "react";
import Image from "next/image";

const Sustainability = () => {
  return (
    <div id="sustainable_section">
      <div id="sustainable_section_container">
        <div id="sustainable_section_header">
          <div>
            <h4>Sustainability Snapshot</h4>
            <p>
              Committed to responsible manufacturing with measurable
              environmental stewardship.
            </p>
          </div>
        </div>
        <div id="sustainable_section_cards">
          <div className="sustainable_section_card">
            <h5>Waste Minimisation</h5>
            <Image
              width={1000}
              height={1000}
              src="/images/home/waste.webp"
              alt="image"
            />
            <p>Circular processes reducing environmental impact</p>
          </div>
              <div className="sustainable_section_card">
            <h5>Stewardship Targets</h5>
            <Image
              width={1000}
              height={1000}
              src="/images/home/stewardship.webp"
              alt="image"
            />
            <p>Measurable ESG goals with quarterly tracking</p>
          </div>
              <div className="sustainable_section_card">
            <h5>Circular Manufacturing</h5>
            <Image
              width={1000}
              height={1000}
              src="/images/home/circular.webp"
              alt="image"
            />
            <p>By-products valorised into valuable end products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
