import React from "react";
import { motion } from "framer-motion";

export default function Aboutus() {
  return (
    <section
      id="about"
      className="w-full py-20 bg-gradient-to-b from-white to-[#e3faf8]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#004B50]"
        >
          About{" "}
          <span className="text-[#0A9396]">
            BK Body Massage
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto"
        >
          Experience premium relaxation at your home. Certified therapists provide
          body pain relief, stress reduction & improved sleep with complete privacy.
        </motion.p>

        {/* Feature Cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white shadow-xl p-6 rounded-2xl border border-[#c7f3ef] hover:shadow-[#0A9396]/40 transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-[#0A9396] mb-3">
              Home Service Only
            </h3>
            <p className="text-gray-600">
              Enjoy massage therapy at home—no travel required.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-xl p-6 rounded-2xl border border-[#c7f3ef] hover:shadow-[#0A9396]/40 transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-[#0A9396] mb-3">
              Certified Therapists
            </h3>
            <p className="text-gray-600">
              Trained professionals ensuring safe & relaxing therapy.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="bg-white shadow-xl p-6 rounded-2xl border border-[#c7f3ef] hover:shadow-[#0A9396]/40 transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-[#0A9396] mb-3">
              Premium Experience
            </h3>
            <p className="text-gray-600">
              Soft oils, gentle music & pure spa luxury at home.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

