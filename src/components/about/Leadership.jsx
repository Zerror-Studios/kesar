import React, { useEffect, useRef } from "react";
import LeaderCard from "./LeaderCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

const Leadership = () => {
  const cardsRef = useRef(null);

  const leadershipSections = [
    {
      title: "Leadership & Founders",
      description:
        "Committed to responsible manufacturing with measurable environmental stewardship.",
      cards: [
        {
          id: 1,
          name: "Shri. Dinesh Sharma",
          position: "Founder, Chairman & Managing Director",
          description:
            "Law graduate & Chartered Accountant. Champion of cost-effective, sustainable manufacturing and timely dispatches.",
          image: "/images/about/dinesh.webp",
          className:"profile"
        },
        {
          id: 2,
          name: "Shreyas Sharma",
          position: "Chief Executive Officer",
          description:
            "B.Tech graduate from UDCT (2008), specializing in dyes & pigments with 15+ years of industry experience.",
          image: "/images/about/shreyas.webp",
          className:"profile"
        },
        {
          id: 3,
          name: "Ms. Shruti Sharma",
          position: "Vice President (Business Development)",
          description:
            "MBA; global business development and partnerships; focuses on distributor ecosystems and key accounts.",
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
      ],
    },

    {
      title: "Board of Directors",
      cards: [
        {
          id: 1,
          name: "Satish Chand Mathur",
          position: "Non - Executive Director DIN : 03641285",
          description: `Mr. Satish Chand Mathur is a 1981-batch
Indian Police Service (IPS) officer. His service duration was
37 years.`,
readMore:<>
Mr. Satish Chand Mathur is a 1981-batch
Indian Police Service (IPS) officer. His service duration was
37 years. Prior to joining the Company, he was serving as
Maharashtra’s Director General of Police. <br />
Moreover, he served the Central Government, i.e. the
Central Bureau of Investigation from 1996 to 2003 and held
the post of Director, Security, Air India, Director Vigilance
and Executive Director, Ground Handling, Air India from
2007 to 2012. <br />
He has left his indelible mark on each aspect of police and
general administration. His firm and tactful handling of
sensitive and tricky issues has seen organisation emerge a
winner at all times; his rigorous training at Louisiana State
University in handling and countering explosives and
commando training at our very own National Security
Guard, Manesar, Haryana sowed the seeds of his success in
handling both urban terrorism and the naxal challenge.
</>,
          image: "/images/about/user.png",
        },
        {
          id: 2,
          mentors: [
            {
              name: "Jignesh Dinesh Desai - CFO",
              position: "Chemical Engineer, 35+ years in pigments",
              image: "/images/about/user.png",
            },
          ],
        },
      ],
    },

    {
      title: "Audit Committee",
      grid: "grid3",
      cards: [
        {
          id: 1,
          mentors: [
            {
              name: "Kanayo Dayaram Fatani",
              position: "Chairperson",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 2,
          mentors: [
            {
              name: "Neelam Yashpal Arora",
              position: "Member",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 3,
          mentors: [
            {
              name: "Ramjam Kadar Shaikh",
              position: "Member",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 4,
          mentors: [
            {
              name: "Nainesh Sumant Rai Desai",
              position: "Member",
              image: "/images/about/user.png",
            },
          ],
        },
      ],
    },

    {
      title: "Nomination and remuneration committee",
      grid: "grid3",
      cards: [
        {
          id: 1,
          mentors: [
            {
              name: "Kanayo Dayaram Fatani",
              position: "Chairperson",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 2,
          mentors: [
            {
              name: "Neelam Yashpal Arora",
              position: "Member",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 3,
          mentors: [
            {
              name: "Nainesh Sumant Rai Desai",
              position: "Member",
              image: "/images/about/user.png",
            },
          ],
        },
      ],
    },

    {
      title: "Stakeholders Relationship Committee",
      grid: "grid3",
      cards: [
        {
          id: 1,
          mentors: [
            {
              name: "Kanayo Dayaram Fatani",
              position: "Chairperson",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 2,
          mentors: [
            {
              name: "Neelam Yashpal Arora",
              position: "Member",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 3,
          mentors: [
            {
              name: "Ramjam Kadar Shaikh",
              position: "Member",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 4,
          mentors: [
            {
              name: "Nainesh Sumant Rai Desai",
              position: "Member",
              image: "/images/about/user.png",
            },
          ],
        },
      ],
    },

    {
      title: "Disclosure of content details of Key Managerial personnel:",
      grid: "grid3",
      cards: [
        {
          id: 1,
          mentors: [
            {
              name: "Ramjam Kadar Shaikh",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 2,
          mentors: [
            {
              name: "Jignesh Dinesh Desai",
              image: "/images/about/user.png",
            },
          ],
        },
        {
          id: 3,
          mentors: [
            {
              name: "Shreyas Dinesh Sharma",
              position: "",
              image: "/images/about/user.png",
            },
          ],
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
        {leadershipSections.map((section, index) => (
          <div key={index}>
            {/* Header (only for first section or when needed) */}
            {section.description && (
              <div id="leadership_section_header">
                <div>
                  <h4>{section.title}</h4>
                  <p>{section.description}</p>
                </div>
              </div>
            )}

            {!section.description && <span className="leader_subheading">{section.title}</span>}

            <div
              id="leadership_section_cards"
              ref={index === 0 ? cardsRef : null}
              className={section.grid || ""}
            >
              {section.cards.map((card) => (
                <div className="leader_card" key={card.id}>
                  <LeaderCard {...card} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
