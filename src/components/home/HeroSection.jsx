import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const containerRef = useRef(null);
  const circlesRef = useRef([]);

  // Define different speed factors for each circle
  const speedFactors = [0.5, 0.8, 1.2, 1.5, 2];

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = (e) => {
      const { width, height, left, top } = container.getBoundingClientRect();
      const mouseX = e.clientX - left; // relative to container
      const mouseY = e.clientY - top;

      const offsetX = (mouseX - width / 2) / width;
      const offsetY = (mouseY - height / 2) / height;

      // Rotate container slightly for 3D feel
      gsap.to(container, {
        rotationY: offsetX * 5,
        rotationX: -offsetY * 5,
        transformPerspective: 800,
        transformOrigin: "center",
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate each circle with a different speed
      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;

        const factor = (index + 1) * 15 * speedFactors[index];
        const scaleFactor = 1 + index * 0.03;

        gsap.to(circle, {
          x: offsetX * factor,
          y: offsetY * factor,
          scale: scaleFactor,
          duration: 0.8 * speedFactors[index],
          ease: "power3.out",
        });
      });
    };

    const handleMouseLeave = () => {
      // subtle shift instead of full reset
      const subtleOffset = 0.1; // 10% of max movement
      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;
        const factor = (index + 1) * 15 * speedFactors[index];
        const scaleFactor = 1 + index * 0.03;

        gsap.to(circle, {
          x: factor * subtleOffset,
          y: factor * subtleOffset,
          scale: scaleFactor,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      gsap.to(container, {
        rotationX: subtleOffset * 5,
        rotationY: subtleOffset * 5,
        duration: 1,
        ease: "power3.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div id="home_hero_section">
      <div
        id="home_hero_container"
        ref={containerRef}
        style={{ perspective: "800px", position: "relative" }}
      >
        <h1>
          Pioneering <br /> Phthalocyanine Pigments. <br /> Revolutionizing
          Sustainability.
        </h1>
        <p>
          India’s Leading Manufacturer of Phthalocyanine Pigments Blue and
          Green. <br />
          <span>Serving customers across 40+ countries</span> with repeatable
          quality, technical support, and on‑time dispatch.
        </p>

        {[...Array(5)].map((_, i) => (
          <Image
            key={i}
            ref={(el) => (circlesRef.current[i] = el)}
            id={`circle${i + 1}`}
            width={1000}
            height={1000}
            src="/images/home/blue-circle1.webp"
            alt="blue-circle"
            priority
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
