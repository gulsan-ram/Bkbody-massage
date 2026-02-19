import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { COLORS } from "../Constants/Colors";
import Grainient from "../Components/Granient";
import SpotlightCard from "../Components/SpotlightCard";
import ParallaxCard from "../Components/ParallaxCard";

const services = [
  {
    title: "Sport Massage",
    desc: "Relieves muscle tightness & boosts recovery for active bodies.",
    img: "/Images/sportsmassage.webp",
    pricing: [{ duration: "90 Minutes", price: "2000" }],
  },
  {
    title: "Deep Tissue Massage",
    desc: "Targets deep stress, tension & stiffness for long relief.",
    img: "/Images/deep.webp",
    pricing: [{ duration: "60 Minutes", price: "1500" }],
  },
  {
    title: " Oil Massage",
    desc: "Premium hot oil therapy for relaxation & full body wellness.",
    img: "/Images/hotoil.jpg",
    pricing: [{ duration: "60 Minutes", price: "999" }],
  },
  {
    title: "Cupping Therapy",
    desc: "Relax together & refresh your bond with premium spa.",
    img: "/Images/couple.jpg",
    pricing: [{ duration: "30 Minutes", price: "1200" }],
  },
  {
    title: "Male&Female Massage",
    desc: "Relax together & refresh your bond with premium spa.",
    img: "/Images/couple.jpg",
    pricing: [{ duration: "45 Minutes", price: "899" }],
  },
  {
    title: "Special Child Massage",
    desc: "Relax together & refresh your bond with premium spa.",
    img: "/Images/couple.jpg",
    pricing: [{ duration: "45 Minutes", price: "699" }],
  },
];

export default function OurServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet
      } else {
        setCardsPerView(4); // Desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const maxIndex = Math.max(0, services.length - cardsPerView);

  const handleServiceClick = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Logic to move the carousel
  const slideWidth = containerWidth / (cardsPerView || 1);
  const translateX = currentIndex * slideWidth;
  const maxTranslate = maxIndex * slideWidth;

  return (
    <section className="relative w-full px-4 md:px-6 lg:px-10 xl:px-12 py-12 md:py-16 overflow-hidden">
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

      <div className="mx-auto relative z-10">
        {/* Header with Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h3 className="text-lg tracking-widest text-white font-medium uppercase mb-2">
            Our Massage Services
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Reduce Your Daily Stress
          </h2>

          <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
            <motion.button
              onPointerUp={prevSlide}
              disabled={currentIndex === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={20} style={{ color: COLORS.PRIMARY }} />
            </motion.button>

            {/* Service Selector Pills - Hidden on Mobile */}
            <div className="hidden lg:flex gap-2 flex-wrap justify-center">
              {services.map((service, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleServiceClick(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap"
                  style={{
                    backgroundColor:
                      currentIndex <= idx && idx < currentIndex + cardsPerView
                        ? COLORS.PRIMARY
                        : "rgba(255,255,255,0.2)",
                    color: "white",
                    border: `2px solid ${currentIndex <= idx && idx < currentIndex + cardsPerView ? COLORS.PRIMARY : "rgba(255,255,255,0.3)"}`,
                  }}
                >
                  {service.title.substring(0, 15)}
                </motion.button>
              ))}
            </div>

            <motion.button
              onPointerUp={nextSlide}
              disabled={currentIndex >= maxIndex}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight size={20} style={{ color: COLORS.PRIMARY }} />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative overflow-visible">
          <motion.div
            ref={containerRef}
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
            animate={{ x: -translateX }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 px-2 md:px-4"
                style={{
                  width: `${100 / cardsPerView}%`,
                }}
              >
                {/* YOUR ORIGINAL DESIGN STARTS HERE */}
                <SpotlightCard
                  tailwindColor={COLORS.PRIMARY}
                  alpha={0.5}
                  radius={280}
                  className="h-full"
                >
                  <ParallaxCard
                    dataImage={service.img}
                    header={
                      <div className="mb-4">
                        <img
                          src={service.img}
                          alt={service.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3
                          className="font-bold text-xl text-center"
                          style={{ color: COLORS.PRIMARY }}
                        >
                          {service.title}
                        </h3>
                      </div>
                    }
                    content={
                      <>
                        <p className="text-gray-600 text-sm text-center mb-4">
                          {service.desc}
                        </p>

                        <div className="border-b border-gray-300 w-12 mx-auto mb-3"></div>

                        <ul className="text-left space-y-1 mb-4 text-xs">
                          {service.pricing.map((p, idx) => (
                            <li key={idx} className="text-gray-700">
                              <span
                                className="font-semibold"
                                style={{ color: COLORS.PRIMARY }}
                              >
                                {p.duration}:
                              </span>{" "}
                              ₹{p.price}
                            </li>
                          ))}
                        </ul>

                        <motion.a
                          href="https://wa.me/918917501160"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-block px-8 py-3 rounded-full font-bold text-white uppercase tracking-wider overflow-hidden shadow-lg"
                          style={{ backgroundColor: COLORS.PRIMARY }}
                          initial="rest"
                          whileHover="hover"
                          whileTap="hover"
                        >
                          <motion.div
                            className="absolute inset-0 z-0"
                            style={{ backgroundColor: COLORS.SECONDARY }}
                            variants={{
                              rest: { x: "-100%" },
                              hover: { x: 0 },
                            }}
                            transition={{
                              type: "tween",
                              ease: "circOut",
                              duration: 0.4,
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 z-10 pointer-events-none"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                              width: "50%",
                            }}
                            variants={{
                              rest: { x: "-150%", skewX: -20 },
                              hover: { x: "250%", skewX: -20 },
                            }}
                            transition={{ duration: 0.75, ease: "easeInOut" }}
                          />
                          <motion.span
                            className="relative z-20 flex items-center justify-center gap-2"
                            variants={{
                              rest: { scale: 1 },
                              hover: { scale: 1.05 },
                            }}
                          >
                            Book Now
                            <motion.span
                              variants={{
                                rest: { x: 0 },
                                hover: { x: 5 },
                              }}
                            >
                              →
                            </motion.span>
                          </motion.span>
                          <motion.div
                            className="absolute inset-0 rounded-full border-2"
                            style={{ borderColor: COLORS.PRIMARY }}
                            variants={{
                              rest: { scale: 1, opacity: 0 },
                              hover: {
                                scale: 1.2,
                                opacity: [0, 0.5, 0],
                                transition: { repeat: Infinity, duration: 1.5 },
                              },
                            }}
                          />
                        </motion.a>
                      </>
                    }
                  />
                </SpotlightCard>
                {/* YOUR ORIGINAL DESIGN ENDS HERE */}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="text-center mt-6 text-white">
          <p className="text-sm">
            {currentIndex + 1} -{" "}
            {Math.min(currentIndex + cardsPerView, services.length)} of{" "}
            {services.length} services
          </p>
        </div>
      </div>
    </section>
  );
}