import React from "react";
import { motion } from "framer-motion";
import Aboutus from "./Aboutus";
import OurServices from "./Ourservices";
import OurPromises from "./Ourpromises";
import Reviews from "./Reviews";

export default function Hero() {
  return (
    <>
      {/* Full-Screen Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center px-6 md:px-20 overflow-hidden">

        {/* Full-Screen Background Image */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          src="/Images/front.png"
          alt="Spa Massage"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* Soft Transparent Overlay for Premium Look */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] -z-10"></div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            Relax. Recharge. <br />
            <span className="text-[#88E8E5]">Rejuvenate. 🌿</span>
          </h1>

          <p className="mt-4 text-lg drop-shadow-lg">
            Premium home massage service with certified therapists.
            Enjoy a luxury spa experience in your comfort & privacy.
          </p>

          <a
            href="https://wa.me/918917501160?text=I%20want%20to%20book%20a%20home%20massage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-8 py-3 rounded-full bg-[#0A9396] text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Book Appointment 💚
          </a>

          <div className="mt-6 flex gap-6 justify-center text-white text-sm font-medium">
            <span>✔ Doorstep Service</span>
            <span>✔ Certified Therapists</span>
            <span>✔ Same Day Booking</span>
          </div>
        </motion.div>
      </section>

      {/* Other Sections */}
      <Aboutus />
      <OurServices />
      <OurPromises />
      <Reviews/>
    </>
  );
}

