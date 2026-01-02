import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  // High-precision mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for that "smooth" delay effect
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Check if user is hovering over a link or project card
    const checkHover = () => {
      const hoveredEl = document.querySelectorAll(":hover");
      const isOverInteractive = Array.from(hoveredEl).some(
        (el) =>
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.classList.contains("group")
      );
      setIsHovered(isOverInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: smoothX,
        translateY: smoothY,
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        opacity: 1,
      }}
    />
  );
}
