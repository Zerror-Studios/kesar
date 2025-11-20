import Image from "next/image";
import React from "react";

const LeaderCard = ({ image, name, position, description, mentors }) => {
  return (
    <div  className={`leadership_section_card ${mentors ? "last":""}`}>
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
              />
            </div>
            <div className="profile_name">
              <p>{name}</p>
              <span>{position}</span>
            </div>
          </div>
          <p className="leader_description">{description}</p>
        </>
      )}
    </div>
  );
};

export default LeaderCard;
