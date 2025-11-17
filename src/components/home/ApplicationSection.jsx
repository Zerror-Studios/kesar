import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import ApplicationCard from "./ApplicationCard";
import { GrNext } from "react-icons/gr";

const ApplicationSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect width (no SSR issues)
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkWidth(); // initial load

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const applications = [
    {
      id: 1,
      title: "Inks",
      image: "/images/home/ink.webp",
      description:
        "High-quality Phthalocyanine pigments for printing inks with excellent color strength and stability",
      tags: ["Color Strength", "Lightfastness", "Chemical Resistance"],
    },
    {
      id: 2,
      title: "Coatings",
      image: "/images/home/coatings.webp",
      description:
        "Durable Phthalocyanine pigments for industrial and architectural coatings applications",
      tags: ["Weather Resistance", "UV Stability", "Heat Resistance"],
    },
    {
      id: 3,
      title: "Plastics (Master Batch)",
      image: "/images/home/plastic.webp",
      description:
        "Heat-stable pigments for polymer applications and processing",
      tags: ["Heat Stability", "Lightfastness", "Chemical Resistance"],
    },
    {
      id: 4,
      title: "Offset",
      image: "/images/home/offset.webp",
      description:
        "Concentrated Phthalocyanine pigment preparations for plastic coloration",
      tags: ["Weather Resistance", "UV Stability", "Heat Resistance"],
    },
  ];

  return (
    <div id="application_section">
      <div id="application_section_container">

        <div id="application_section_header">
          <div>
            <h4>Applications & Industries</h4>
            <p>
              Specialized solutions for diverse industrial applications with
              proven performance
            </p>
          </div>

          {/* Desktop button */}
          {!isMobile && (
            <Button title="Explore more Products" icon={<GrNext />} />
          )}
        </div>

        <div id="application_section_cards">
          {applications.map((data, index) => (
            <ApplicationCard key={index} data={data} index={index} />
          ))}
        </div>

        {/* Mobile button */}
        {isMobile && (
           <div className="btn_wrap_mobile">
             <Button title="Explore more Products" icon={<GrNext />} />
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationSection;
