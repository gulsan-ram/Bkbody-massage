import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Sport Massage",
    desc: "Relieves muscle tightness & boosts recovery for active bodies.",
    img: "/Images/sportsmassage.webp",
    pricing: [
      { duration: "90 Minutes", price: "2000" },
      
    ]
  },
  {
    title: "Deep Tissue Massage",
    desc: "Targets deep stress, tension & stiffness for long relief.",
    img: "/Images/deep.webp",
    pricing: [
      { duration: "60 Minutes", price: "1500" },
    
    ]
  },
  {
    title: " Oil Massage",
    desc: "Premium hot oil therapy for relaxation & full body wellness.",
    img: "/Images/hotoil.jpg",
    pricing: [
      { duration: "60 Minutes", price: "999" },
    
    ]
  },
  {
    title: "Cupping Therapy",
    desc: "Relax together & refresh your bond with premium spa.",
    img: "/Images/couple.jpg",
    pricing: [
      { duration: "30 Minutes", price: "1200" },
    
    ]
  },
  {
    title: "Male&Female Massage",
    desc: "Relax together & refresh your bond with premium spa.",
    img: "/Images/couple.jpg",
    pricing: [
      { duration: "45 Minutes", price: "899" },
    
    ]
  },
   {
    title: "Special Child Massage",
    desc: "Relax together & refresh your bond with premium spa.",
    img: "/Images/couple.jpg",
    pricing: [
      { duration: "45 Minutes", price: "699" },
    
    ]
  },
];

export default function OurServices() {
  return (
    <section className="py-20 bg-[#E4FBFF]">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h3 className="text-lg tracking-widest text-[#007A94] font-medium uppercase mb-2">
          Our Massage Services
        </h3>
        <h2 className="text-4xl font-bold text-[#0F3F43] mb-12">
          Reduce Your Daily Stress With Our Services
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_6px_28px_rgba(0,0,0,0.1)]
  hover:shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 border border-[#D8F9FF]"
            >
              <div className="relative">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-56 w-full object-cover rounded-t-3xl"
                />
                <div className="absolute top-3 right-3 bg-[#00BBD4] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Premium
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-[#0F3F43] tracking-wide">
                  {s.title}
                </h3>

                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {s.desc}
                </p>

                <div className="border-b border-[#C8EEF3] w-16 my-3 mx-auto"></div>

                <ul className="text-left space-y-1 mb-6 text-sm">
                  {s.pricing.map((p, idx) => (
                    <li key={idx}>
                      <span className="font-medium text-[#0F3F43]">{p.duration} :</span>{" "}
                      {p.price}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/918917501160"
                  target="_blank"
                  className="block w-full text-center py-2.5 rounded-xl font-semibold
      bg-gradient-to-r from-[#00BBD4] to-[#0097A8] text-white tracking-wide
      hover:opacity-90 transition duration-300 shadow-md"
                >
                  Book Now
                </a>
              </div>
            </motion.div>

          ))}
        </div>
      </div>
    </section>
  );
}

