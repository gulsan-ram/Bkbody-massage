import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({
  images = [],
  interval = 5000,
  autoPlay = true,
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length;
        onSlideChange?.(next);
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, images.length, interval, onSlideChange]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    onSlideChange?.(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const next = prev === 0 ? images.length - 1 : prev - 1;
      onSlideChange?.(next);
      return next;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % images.length;
      onSlideChange?.(next);
      return next;
    });
  };

  if (!images.length) return null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white p-3 rounded-full hover:scale-110 transition"
      >
        <ChevronLeft className="w-4 h-4 md:w-8 md:h-8" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white p-3 rounded-full hover:scale-110 transition"
      >
        <ChevronRight className="w-4 h-4 md:w-8 md:h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "bg-[#77B103] w-8 h-3"
                : "bg-white/50 w-3 h-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
