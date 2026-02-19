import React from "react";

export default function Gallery() {
  const images = [
    "/Images/1.jpg",
    "/Images/2.jpg",
    "/Images/3.jpg",
    "/Images/4.jpg",
    "/Images/5.jpg",
    "/Images/hotoil.jpg",
    "/Images/gallery1.png",
    "/Images/gallery8.png", 
  ];
  
  return (
    <div className="bg-gradient-to-b from-[#6FDCE3] to-white min-h-screen px-6 md:px-20 py-14">
      
      <h2 className="text-center text-4xl md:text-5xl font-bold text-[#003844] mt-12 mb-10">
        Our Gallery ✨
      </h2>

      <p className="text-center text-[#005F73] text-lg max-w-2xl mx-auto mb-12">
        Experience premium home spa services — Relax your body, refresh your soul. 💚  
        Every picture reflects comfort, hygiene & luxury wellness.
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl shadow-xl group"
          >
            <img
              src={src}
              alt="massage"
              className="w-full h-44 md:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0A9396]/0 group-hover:bg-[#0A9396]/40 transition"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

