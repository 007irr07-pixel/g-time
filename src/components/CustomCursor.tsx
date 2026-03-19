"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Mouse position values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth trailing
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = "none";

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const updateCursorType = () => {
      // Check what we are hovering over
      const hoveredElement = document.elementFromPoint(
        cursorX.get(),
        cursorY.get()
      );
      
      if (!hoveredElement) return;

      const style = window.getComputedStyle(hoveredElement);
      // If the element behaves like a pointer (links, buttons, interactive elements)
      if (
        style.cursor === "pointer" ||
        hoveredElement.tagName.toLowerCase() === "a" ||
        hoveredElement.tagName.toLowerCase() === "button"
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousemove", updateCursorType);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseEnter);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousemove", updateCursorType);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-exclusion flex items-center justify-center overflow-hidden bg-white"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isVisible ? (isPointer ? 2 : 1) : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-black rounded-full"
          animate={{ scale: isPointer ? 1 : 0, opacity: isPointer ? 1 : 0 }}
        />
      </motion.div>
      
      {/* Tiny immediate dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible && !isPointer ? 1 : 0 }}
      />
    </>
  );
}
