import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const layoutRef = useRef(null);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const router = useRouter();
  const isTransitioning = useRef(false);

  // Prevent auto scroll
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Handle route change start (fade out)
  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      // Fade out current page
      gsap.to(layoutRef.current, {
        autoAlpha: 0,
        y: -40,
        duration: 0.6,
        ease: "power2.inOut",
      });
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.events]);

  // Fade-in new children when children prop changes
  useEffect(() => {
    if (!isTransitioning.current) return;

    // GSAP timeline for controlled sequence
    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
      },
    });

    // Step 1: Small gap after fade-out
    tl.to({}, { duration: 0.15 });

    // Step 2: Swap children
    tl.add(() => {
      setDisplayedChildren(children);
    });

    // Step 3: Fade-in new page
    tl.fromTo(
      layoutRef.current,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [children]);

  // Initial page load animation
  useEffect(() => {
    gsap.fromTo(
      layoutRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={layoutRef}
      id="content_wrapper"
      style={{
        opacity: 0,
        willChange: "opacity, transform",
      }}
    >
      {displayedChildren}
    </div>
  );
};

export default Layout;
