import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import ImageCarousel from "../Components/ImageCarousel";
import { COLORS } from "../Constants/Colors";
import WavyText from "../Components/WavyText";
import FluidButton from "../Components/FluidButton";
import useTypewriter from "../Hooks/useTypewriter";

import slide1 from "../Assets/slide1.png";
import slide2 from "../Assets/slide2.png";
import slide3 from "../Assets/slide3.png";

const slides = [
  {
    image: slide1,
    heading: "Relax",
    subheading:
      "Take a pause from the rush and let your mind unwind in calm comfort.",
  },
  {
    image: slide2,
    heading: "Recharge",
    subheading:
      "Restore your energy and refocus your strength for what lies ahead.",
  },
  {
    image: slide3,
    heading: "Refresh",
    subheading:
      "Embrace a renewed sense of balance and vitality for body and soul.",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const typewriterText = useTypewriter({
    words: [slides[activeIndex].heading],
    loop: true,
    typeSpeed: 140,
    deleteSpeed: 60,
  });

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        <ImageCarousel
          images={slides.map((slide) => slide.image)}
          interval={5000}
          autoPlay
          onSlideChange={setActiveIndex}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Text Content */}
      <div className="relative z-10 max-w-4xl xl:max-w-6xl px-4 text-white space-y-6 md:space-y-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            {/* Heading with Typewriter Effect */}
            <h1
              className="text-4xl md:text-6xl xl:text-7xl font-bold drop-shadow-lg min-h-20 flex items-center justify-center"
              style={{ color: COLORS.PRIMARY }}
            >
              {typewriterText}
              <span className="animate-pulse ml-1">|</span>
            </h1>

            {/* Wavy Text Subheading */}
            <motion.p
              className="md:mt-4 text-xl md:text-4xl xl:text-5xl drop-shadow-lg  tracking-wide leading-snug"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <WavyText text={slides[activeIndex].subheading} delay={0.03} />
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Fluid Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FluidButton
            href="https://wa.me/918917501160?text=I%20want%20to%20book%20a%20home%20massage"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Appointment
          </FluidButton>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-6 text-sm md:text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span>
            <Check
              style={{ color: COLORS.PRIMARY }}
              className="mr-1 w-6 h-6 inline-block"
            />{" "}
            Doorstep Service
          </span>
          <span>
            <Check
              style={{ color: COLORS.PRIMARY }}
              className="mr-1 w-6 h-6 inline-block"
            />{" "}
            Certified Therapists
          </span>
          <span>
            <Check
              style={{ color: COLORS.PRIMARY }}
              className="mr-1 inline-block w-6 h-6"
            />{" "}
            Same Day Booking
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
