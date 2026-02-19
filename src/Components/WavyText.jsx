import React, { useMemo } from "react";
import { motion } from "framer-motion";

// 1. Move variants outside the component to prevent re-creation on every render
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (delayOffset) => ({
    opacity: 1,
    transition: {
      staggerChildren: delayOffset,
    },
  }),
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotate: 45,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
      mass: 0.8,
    },
  },
};

const WavyText = ({ 
  text, 
  className = "", 
  delayOffset = 0.02,
  viewportAmount = 0.5
}) => {
  // 2. Memoize the split text so it only recalculates if the text string changes
  const characters = useMemo(() => Array.from(text), [text]);

  return (
    <motion.span
      variants={containerVariants}
      custom={delayOffset} // Pass dynamic values to variants via 'custom'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      className={`inline-block ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`} // 3. Slightly more unique key
          variants={childVariants}
          className="inline-block origin-center" // 'origin-center' ensures clean scaling/rotation
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// 4. Use React.memo to prevent re-renders unless props actually change
export default React.memo(WavyText);