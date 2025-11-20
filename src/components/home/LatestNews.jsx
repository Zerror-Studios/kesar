import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiFillCaretRight } from "react-icons/ai";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dynamic News Data (you will replace later)
const newsData = [
  {
    title: "New Sustainable Pigment Series Launched for Packaging Industry",
    date: "March 15, 2024",
    description:
      "Revolutionary eco-friendly formulations reduce environmental impact while maintaining superior performance standards.",
    image: "/images/home/news.webp",
  },
  {
    title: "Global Expansion: New Manufacturing Facility in Southeast Asia",
    date: "April 20, 2024",
    description:
      "A major step toward increasing production capacity with a new strategic facility.",
    image: "/images/home/news.webp",
  },
  {
    title: "Partnership with Leading Automotive OEM for Next-Gen Coatings",
    date: "May 8, 2024",
    description:
      "Collaborating on advanced coating technologies designed for high-performance vehicles.",
    image: "/images/home/news.webp",
  },
];

const LatestNews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  // GSAP Image animation
  useEffect(() => {
    const image = imageRef.current;
    const section = sectionRef.current;

    const tl = gsap.fromTo(
      image,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [activeIndex]);

  return (
    <div id="latest_news_section">
      <div id="latest_news_section_container">
        <div className="latest_news_dets">
          <div>
            <h4>Latest News</h4>

            {/* LEFT NEWS LIST */}
            {newsData.map((item, index) => (
              <div
                key={index}
                className={`news_arrow ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <AiFillCaretRight />
                <p>
                  {item.title.split(" ").slice(0, 5).join(" ")} <br />
                  {item.title.split(" ").slice(5).join(" ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="latest_news_card">
          <div className="latest_news_card_dets">
            <div>
              <h5>{newsData[activeIndex].title}</h5>
              <p>{newsData[activeIndex].date}</p>
            </div>

            <p>{newsData[activeIndex].description}</p>
          </div>

          <div className="latest_news_card_img" ref={sectionRef}>
            <Image
              ref={imageRef}
              width={1000}
              height={1000}
              src={newsData[activeIndex].image}
              alt="image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
