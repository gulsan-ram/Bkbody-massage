import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FluidButton = ({ children, href = "#", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const touchTimerRef = useRef(null);
  const primaryColor = "rgb(119, 177, 3)"; // #77B103

  useEffect(() => {
    return () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, []);

  const handlePointerDown = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    setIsHovered(true);
  };

  const handlePointerUp = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative inline-flex items-center justify-center px-4 py-3 md:px-10 md:py-4 rounded-full font-bold overflow-hidden transition-all duration-300 border-2"
      style={{
        borderColor: primaryColor,
        backgroundColor: "transparent", // Start transparent to see the fill
        color: isHovered ? "white" : primaryColor, // Text color flip
      }}
      {...props}
    >
      {/* Wave Liquid Fill Container */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ y: "100%" }}
        animate={{
          y: isHovered ? "0%" : "100%",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          backgroundColor: primaryColor,
        }}
      >
        {/* Animated Wave SVG - Sits on top of the rising background */}
        <motion.svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute left-0 w-[200%] h-20"
          style={{ 
            top: "-60px", // Sits just above the rising fill color
            fill: primaryColor,
          }}
          animate={{ 
            x: isHovered ? ["0%", "-50%"] : "0%",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path d="M0,60 C300,0 300,120 600,60 C900,0 900,120 1200,60 V120 H0 Z" />
        </motion.svg>
      </motion.div>

      {/* Button Content */}
      <motion.div
        className="relative z-10 flex items-center gap-2"
        animate={{
          color: isHovered ? "#ffffff" : primaryColor,
        }}
      >
        <span className="tracking-wide text-sm font-semibold">{children}</span>
        <motion.div
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight size={20} strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isHovered 
            ? `0 0 20px rgba(119, 177, 3, 0.4)` 
            : "0 0 0px rgba(119, 177, 3, 0)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default FluidButton;