import Image from "next/image";
import React, { useState } from "react";

const LeaderCard = ({
  image,
  name,
  position,
  description,
  readMore,
  mentors,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`leadership_section_card ${mentors ? "last" : ""}`}>
      {mentors ? (
        mentors.map((m, i) => (
          <div key={i} className="leader_profile_wrap">
            <div className="leader_profile">
              <Image
                width={1000}
                height={1000}
                src={m.image}
                alt={m.name || "profile"}
              />
            </div>
            <div className="profile_name">
              <p>{m.name}</p>
              <span>{m.position}</span>
            </div>
            {m.tag && <span className="mentor">{m.tag}</span>}
          </div>
        ))
      ) : (
        <>
          <div className="leader_profile_wrap">
            <div className="leader_profile">
              <Image
                width={1000}
                height={1000}
                src={image}
                alt={name || "profile"}
                className={className || ""}
              />
            </div>
            <div className="profile_name">
              <p>{name}</p>
              <span>{position}</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="leader_description">
            {expanded && readMore ? readMore : description}
            {readMore && (
              <span
              id="read-more"
                style={{ cursor: "pointer" }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? " Read less" : " Read more"}
              </span>
            )}
          </p>

        </>
      )}
    </div>
  );
};

export default LeaderCard;
