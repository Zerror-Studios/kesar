import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const CircleSlider = () => {
  const containerRef = useRef();

  useEffect(() => {
    const circles = Array.from(
      containerRef.current.querySelectorAll(".circle_wrapper")
    );

    const animate = () => {
      // Re-read positions every loop
      const c1 = circles[0].getBoundingClientRect();
      const c2 = circles[1].getBoundingClientRect();
      const c3 = circles[2].getBoundingClientRect();

      const center1 = c1.left + c1.width / 2;
      const center2 = c2.left + c2.width / 2;
      const center3 = c3.left + c3.width / 2;

      const xValCircle2 = center1 - center2;
      const xValCircle3 = center2 - center3;

      const xCircle1To3 = center3 - center1;
      const xCircle2To3 = center3 - center2;
      const xValCircle3To1 = center1 - center3;

      const tl = gsap.timeline({
        repeat: -1, // infinite loop
        repeatDelay: 0, // optional
      });

      tl.add(() => {
        gsap.set(circles[0], { x: 0 });
      })
        .to(circles[0], {
          scale: 0,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 1,
        })
        .to(
          circles[1],
          {
            scale: "var(--scale)",
            x: xValCircle2,
            background: "var(--previous-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        )
        .to(
          circles[2],
          {
            scale: 1,
            x: xValCircle3,
            background: "var(--center-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        )
        .to(
          circles[3],
          {
            scale: "var(--scale)",
            background: "var(--next-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        )

        // moved 1 to 3rd place
        .to(circles[0], {
          scale: 0,
          x: xCircle1To3,
          duration: 0.8,
          ease: "power2.inOut",
        })

        .to(circles[1], {
          scale: 0,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(
          circles[2],
          {
            scale: "var(--scale)",
            x: xValCircle3To1,
            background: "var(--previous-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        )
        .to(
          circles[3],
          {
            scale: 1,
            x: xValCircle3,
            background: "var(--center-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        )
        .to(
          circles[4],
          {
            scale: "var(--scale)",
            background: "var(--next-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        )

        // moved 2 to 3rd place
        .to(circles[1], {
          scale: 0,
          x: xCircle2To3,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(circles[2], {
          scale: 0,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(
          circles[3],
          {
            scale: "var(--scale)",
            x: xValCircle3To1,
            background: "var(--previous-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        )
        .to(
          circles[4],
          {
            scale: 1,
            x: xValCircle3,
            background: "var(--center-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        )
        .to(
          circles[5],
          {
            scale: "var(--scale)",
            background: "var(--next-gradient)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.7"
        );
    };

    animate();
  }, []);

  return (
    <div className="circle_container" ref={containerRef}>
      <div className="circle_wrapper circle1">
        Backward <br /> Integration
      </div>
      <div className="circle_wrapper circle2">
        Phthalocyanine <br /> Pigments
      </div>
      <div className="circle_wrapper circle3">
        Forward <br /> Integration
      </div>
      <div className="circle_wrapper circle11">
        Backward <br />
        Integration
      </div>
      <div className="circle_wrapper circle22">
        Phthalocyanine <br /> Pigments
      </div>
      <div className="circle_wrapper circle33">
        Forward <br /> Integration
      </div>
    </div>
  );
};

export default CircleSlider;
