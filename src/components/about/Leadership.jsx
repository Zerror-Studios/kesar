import React from "react";
import LeaderCard from "./LeaderCard";

const Leadership = () => {
  const leaders = [
    {
      id: 1,
      name: "Shri. Dinesh Sharma",
      position: "Founder, Chairman & Managing Director",
      description:
        "Law graduate & Chartered Accountant. Champion of cost-effective, sustainable manufacturing and timely dispatches.",
      image: "/images/about/dinesh.webp",
    },
    {
      id: 2,
      name: "Shreyas Sharma",
      position: "Chief Executive Officer",
      description:
        `B.Tech. (Dyestuff Technology), ICT (UDCT), hands‑on experience across dyes, pigments and intermediates,
Leads Technical ‑ Commercial Strategy and International Growth.`,
      image: "/images/about/shreyas.webp",
    },
    {
      id: 3,
      name: "Ms. Shruti Sharma",
      position: "Vice President (Business Development)",
      description:
        `MBA; global business development and partnerships; focuses on distributor ecosystems and key accounts.`,
      image: "/images/about/user.png",
    },
    {
      id: 4,
      mentors: [
        {
          name: "Mr. K. D. Fatnani",
          position: "Chemical Engineer, 35+ years in pigments",
          image: "/images/about/user.png",
          tag:"Mentors (advisory)"
        },
        {
          name: "Prof. (Dr.) V. R. Kanetkar",
          position: "Ex‑Head, Dyestuff Tech, ICT/UDCT",
          image: "/images/about/user.png",
        },
      ],
    },
  ];

  return (
    <div id="leadership_section">
      <div id="leadership_section_container">
        <div id="leadership_section_header">
          <div>
            <h4>Leadership & Founders</h4>
            <p>
              Committed to responsible manufacturing with measurable
              environmental stewardship.
            </p>
          </div>
        </div>
        <div id="leadership_section_cards">
          {leaders.map((leader) => (
            <LeaderCard key={leader.id} {...leader} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
