import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Leaf, Sparkles, Smile, HandHeart } from "lucide-react";

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
  return (
    <section className="bg-gradient-to-b from-[#7FE7EB] to-white min-h-screen px-6 md:px-20 py-20">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-bold text-[#003844] mb-4"
      >
        Our Promise To You 🌸
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center text-[#005F73] text-lg max-w-3xl mx-auto mb-14"
      >
        We bring wellness to your doorstep with reliable, premium care for mind,
        body & soul.
      </motion.p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {promises.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="p-10 bg-white rounded-3xl shadow-xl border border-[#96F3E5]/40
            text-center transition-all hover:-translate-y-3 hover:shadow-2xl"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#00797E] mb-4"
            >
              {item.icon}
            </motion.div>

            <h3 className="text-2xl font-semibold text-[#003844] mb-3">
              {item.title}
            </h3>

            <p className="text-[#005F73] text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
