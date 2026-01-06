import { reportData } from "@/helpers/investorsData";
import React, { useState } from "react";
import Dropdown from "../common/Dropdown";

const ReportSection = () => {
  const categoryKeys = Object.keys(reportData);

  const [activeCategory, setActiveCategory] = useState(categoryKeys[0]);
  const [activeSub, setActiveSub] = useState(
    reportData[categoryKeys[0]].subCategories[0].key
  );

  const currentCategory = reportData[activeCategory];
  const currentSub = currentCategory.subCategories.find(
    (sub) => sub.key === activeSub
  );

  // Dropdown options (titles shown, keys used internally)
  const categoryOptions = categoryKeys.map(
    (key) => reportData[key].title
  );

  const handleCategoryChange = (selectedTitle) => {
    const selectedKey = categoryKeys.find(
      (key) => reportData[key].title === selectedTitle
    );

    if (selectedKey) {
      setActiveCategory(selectedKey);
      setActiveSub(reportData[selectedKey].subCategories[0].key);
    }
  };

  return (
    <div id="report_section">
      {/* ================= MAIN CATEGORY DROPDOWN ================= */}
      <div id="investor_filter_wrap">
        <Dropdown
          label="Select Category"
          options={categoryOptions}
          value={reportData[activeCategory].title}
          onSelect={handleCategoryChange}
          classNameMain="dropdown3"
          className="option4"
        />
      </div>

      {/* ================= SUB CATEGORY HEADER ================= */}
      <div id="report_header">
        <h5>{currentSub.title}</h5>

        {currentSub?.description && (
          <div id="report_header_desc">{currentSub.description}</div>
        )}
      </div>

      {/* ================= UNIVERSAL REPORT RENDERER ================= */}
      <div id="report_table">
        {currentSub.data && currentSub.data.length > 0 ? (
          currentSub.data.map((block, idx) => (
            <div key={idx} className="report_block">
              {/* ===== BLOCK TITLE ===== */}
              {block.title && (
                <div className="report_row_title">{block.title}</div>
              )}

              {/* ===== HTML LABEL ===== */}
              {block.label && (
                <div className="report_row fullwidth">
                  <div
                    className="html_label"
                    dangerouslySetInnerHTML={{ __html: block.label }}
                  />
                </div>
              )}

              {/* ===== YEAR → SUB CATEGORIES ===== */}
              {block.subCategories &&
                block.subCategories.map((subCat, subIdx) => (
                  <div key={subIdx} className="report_sub_block">
                    <div className="report_sub_title">{subCat.title}</div>

                    {subCat.reports?.map((report, i) => (
                      <div
                        key={i}
                        className={`report_row ${
                          i % 2 !== 0 ? "transparent" : ""
                        }`}
                      >
                        <a
                          href={report.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{report.label}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                ))}

              {/* ===== NORMAL REPORT LIST ===== */}
              {block.reports &&
                block.reports.map((report, i) => (
                  <div
                    key={i}
                    className={`report_row ${
                      i % 2 !== 0 ? "transparent" : ""
                    }`}
                  >
                    <a
                      href={report.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{report.label}</span>
                    </a>
                  </div>
                ))}

              {/* ===== SIMPLE YEAR → LINK ===== */}
              {block.year && (
                <div
                  className={`report_row ${
                    idx % 2 !== 0 ? "transparent" : ""
                  }`}
                >
                  <a
                    href={block.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{block.year}</span>
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="report_row">
            <span>No data available.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportSection;
