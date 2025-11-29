import Image from "next/image";
import React from "react";

const ApplicationCard = ({ data, index }) => {
  return (
      <>
        <div className="application_card_title">
          <Image width={1000} height={1000} src={data.image} alt={data.title} />
          <span>{data.title}</span>
        </div>
        <div className="application_details">
          <p>{data.description}</p>
          <div className="tags">
            {data.tags.map((tag, index) => (
              <div className="tag" key={index}>
                <span></span> {tag}
              </div>
            ))}
          </div>
        </div>
      </>
  );
};

export default ApplicationCard;
