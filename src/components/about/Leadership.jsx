import React, { useEffect, useRef } from "react";
import LeaderCard from "./LeaderCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

const Leadership = () => {
  const cardsRef = useRef(null);

  const leaders = [
    {
      id: 1,
      name: "Shri. Dinesh Sharma",
      position: "Founder, Chairman & Managing Director",
      description:
        "Law graduate & Chartered Accountant. Champion of cost‑effective, sustainable manufacturing and timely dispatches.",
      image: "/images/about/dinesh.webp",
    },
    {
      id: 2,
      name: "Shreyas Sharma",
      position: "Chief Executive Officer",
      description: `Mr. Shreyas Sharma, B. Tech Graduate from UDCT in the year 2008 with specialization in dyes & pigments and has 15+ years of experience in the dying and
pigmentation industry.`,
      image: "/images/about/shreyas.webp",
    },
    {
      id: 3,
      name: "Ms. Shruti Sharma",
      position: "Vice President (Business Development)",
      description: `MBA; global business development and partnerships; focuses on distributor ecosystems and key accounts.`,
      image: "/images/about/user.png",
    },
    {
      id: 4,
      mentors: [
        {
          name: "Mr. K. D. Fatnani",
          position: "Chemical Engineer, 35+ years in pigments",
          image: "/images/about/user.png",
          tag: "Mentors (advisory)",
        },
      ],
    },
  ];

  // Animation effect
  useEffect(() => {
    if (cardsRef.current) {
      const cards = gsap.utils.toArray(".leader_card", cardsRef.current);

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, rotation: 1.5 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1, // slightly faster duration
          ease: "ease-secondary",
          stagger: {
            amount: 0.8, // faster cascading
          },
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 20%",
            scrub: 0.07,
          },
        }
      );
    }
  }, []);

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

        <div id="leadership_section_cards" ref={cardsRef}>
          {leaders.map((leader) => (
            <div className="leader_card" key={leader.id}>
              <LeaderCard {...leader} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
