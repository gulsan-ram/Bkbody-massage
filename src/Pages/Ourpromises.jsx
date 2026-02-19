import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  Leaf,
  Sparkles,
  Smile,
  HandHeart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { COLORS } from "../Constants/Colors";
import Grainient from "../Components/Granient";
import SpotlightCard from "../Components/SpotlightCard";
import ParallaxCard from "../Components/ParallaxCard";

const promises = [
  {
    icon: <ShieldCheck size={45} />,
    title: "100% Hygiene Assured",
    desc: "Fresh towels, sanitized tools & professional-grade products for total safety.",
  },
  {
    icon: <Heart size={45} />,
    title: "Care With Love",
    desc: "Genuine care, personalized massage focused on your relaxation & comfort.",
  },
  {
    icon: <Leaf size={45} />,
    title: "Pure Organic Oils",
    desc: "Premium essential oils that nourish skin & calm the senses deeply.",
  },
  {
    icon: <Sparkles size={45} />,
    title: "Luxury Spa Experience",
    desc: "Premium hospitality & soothing service delivered right at your home.",
  },
  {
    icon: <Smile size={45} />,
    title: "Customer Satisfaction",
    desc: "Your happiness matters. We ensure a refreshing & pleasant experience.",
  },
  {
    icon: <HandHeart size={45} />,
    title: "Professional Therapists",
    desc: "Certified massage experts trained in multiple wellness therapies.",
  },
];

export default function OurPromises() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Responsive cardsPerView based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1280) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(3); // Desktop: 3 cards
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Measure container width for mobile calculations
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const maxIndex = Math.max(0, promises.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Fixed translate logic for both mobile and desktop
  const slideWidth = containerWidth / (cardsPerView || 1);
  const translateX = currentIndex * slideWidth;
  const maxTranslate = maxIndex * slideWidth;
  return (
    <section className="relative w-full px-4 md:px-6 lg:px-10 xl:px-12 py-12 md:py-16">
      {/* Grainient Background */}
      <div className="absolute inset-0 h-full w-full z-0">
        <Grainient
          color1="#77B103"
          color2="#88E8E5"
          color3="#0A9396"
          timeSpeed={0.12}
          warpStrength={0.6}
          contrast={1.1}
          saturation={0.95}
        />
      </div>

      <div className=" mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
            Our Promise To You 🌸
          </h2>

          <p className="text-white text-sm md:text-lg max-w-3xl mx-auto opacity-90">
            We bring wellness to your doorstep with reliable, premium care for
            mind, body & soul.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          <motion.button
            onPointerUp={prevSlide}
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} color="#003844" />
          </motion.button>

          <motion.button
            onPointerUp={nextSlide}
            disabled={currentIndex >= maxIndex}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight size={20} color="#003844" />
          </motion.button>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-3xl">
          <motion.div
            ref={containerRef}
            animate={{ x: -translateX }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            drag={maxIndex > 0 ? "x" : false}
            dragElastic={0.12}
            dragMomentum={false}
            dragConstraints={{ left: -maxTranslate, right: 0 }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x < -50 || (velocity.x < -400 && offset.x < 0)) {
                if (currentIndex < maxIndex) nextSlide();
              } else if (offset.x > 50 || (velocity.x > 400 && offset.x > 0)) {
                if (currentIndex > 0) prevSlide();
              }
            }}
            // CHANGE 1: Reduced gap from gap-6 to gap-2
            className="flex gap-1 md:gap-2 lg:gap-3 p-1 md:p-2"
          >
            {promises.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                // CHANGE 2: Reduced horizontal padding from px-2 to px-0.5
                className="shrink-0 px-0.5 md:px-1"
                style={{
                  flex: `0 0 ${100 / cardsPerView}%`,
                  maxWidth: cardsPerView === 1 ? "100%" : "auto",
                }}
              >
                <SpotlightCard
                  tailwindColor={"#7FE7EB"}
                  alpha={0.5}
                  radius={200}
                  // CHANGE 3: Changed h-full to h-auto to keep height tight
                  className="h-[200px]"
                >
                  <ParallaxCard
                    dataImage=""
                    header={
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        // CHANGE 4: Reduced margin below icon
                        className="text-[#00797E] mb-1 flex justify-center"
                      >
                        {item.icon}
                      </motion.div>
                    }
                    content={
                      <>
                        {/* CHANGE 5: Reduced margin below title */}
                        <h3 className="text-sm md:text-base font-semibold text-[#003844] mb-0.5 text-center">
                          {item.title}
                        </h3>

                        <p className="text-[#005F73] text-[10px] md:text-xs leading-tight line-clamp-2 text-center">
                          {item.desc}
                        </p>
                      </>
                    }
                  />
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="text-center mt-6 text-white">
          <p className="text-xs md:text-sm font-medium">
            {currentIndex + 1} -{" "}
            {Math.min(currentIndex + cardsPerView, promises.length)} of{" "}
            {promises.length} promises
          </p>
        </div>
      </div>
    </section>
  );
}
