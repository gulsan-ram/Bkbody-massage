// import React from "react";
// import { motion } from "framer-motion";
// import { Home, BadgeCheck, Sparkles } from "lucide-react";
// import { COLORS } from "../Constants/Colors";
// import WavyText from "../Components/WavyText";
// import Grainient from "../Components/Granient";
// import SpotlightCard from "../Components/SpotlightCard";
// import ParallaxCard from "../Components/ParallaxCard";

// export default function Aboutus() {
//   const cards = [
//     {
//       id: 1,
//       title: "Home Service Only",
//       description:
//         "Enjoy professional massage therapy in the comfort of your home—no travel, no waiting. We bring everything needed for a calm and relaxing experience.",
//       icon: Home,
//     },
//     {
//       id: 2,
//       title: "Certified Therapists",
//       description:
//         "Our therapists are professionally trained, certified, and experienced, ensuring safe, hygienic, and deeply relaxing therapy every session.",
//       icon: BadgeCheck,
//     },
//     {
//       id: 3,
//       title: "Premium Experience",
//       description:
//         "Experience spa-level comfort with premium oils, soothing music, clean equipment, and personalized care—designed for complete relaxation at home.",
//       icon: Sparkles,
//     },
//   ];

//   return (
//     <section
//       id="about"
//       className="w-full px-4 md:px-6 lg:px-10 xl:px-12 py-8 md:py-12 relative "
//     >
//       {/* Grainient Background */}
//       <div className="absolute inset-0 h-full w-full z-0">
//         <Grainient
//           color1="#60b103"
//           color2="#88E8E5"
//           color3="#77B103"
//           timeSpeed={0.8}
//           warpStrength={0.5}
//           contrast={1.2}
//           saturation={0.9}
//         />
//       </div>

//       <div className=" mx-auto relative z-10 ">
//         {/* Heading */}
//         <motion.h2
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="text-4xl text-white  md:text-5xl font-bold text-center"
//         >
//           <div className="hidden md:block">
//             <WavyText text="About BK Body Massage" delay={0.03} />
//           </div>
//           <div className="md:hidden">
//             <WavyText text="About BK " delay={0.3} />
//             <br />
//             <WavyText text="Body Massage " delay={0.3} />
//           </div>
//         </motion.h2>

//         {/* Description */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//           className="mt-6 text-lg md:text-xl text-white text-center max-w-3xl mx-auto"
//         >
//           <WavyText
//             text="Experience premium relaxation at your home. Certified therapists provide body pain relief, stress reduction & improved sleep with complete privacy."
//             delay={0.02}
//           />
//         </motion.p>

//         {/* Feature Cards */}
//         <div className="mt-4 grid md:grid-cols-3 md:gap-4 gap-2 xl:gap-8">
//           {cards.map((card, index) => {
//             const Icon = card.icon;
//             return (
//               <motion.div
//                 key={card.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7 + index * 0.1 }}
//               >
//                 <SpotlightCard
//                   tailwindColor={COLORS.PRIMARY}
//                   alpha={0.6}
//                   radius={300}
//                   className="h-full"
//                 >
//                   <ParallaxCard
//                     header={
//                       <div className="mb-6 flex justify-center">
//                         <motion.div
//                           className="relative cursor-pointer"
//                           initial="rest"
//                           whileHover="hover" // This triggers 'hover' variants in all children
//                           animate="rest"
//                         >
//                           {/* Animated Ring (Optional Glow Effect) */}
//                           <motion.div
//                             className="absolute inset-0 rounded-full"
//                             variants={{
//                               rest: { scale: 1, opacity: 0 },
//                               hover: {
//                                 scale: 1.4,
//                                 opacity: [0, 0.3, 0],
//                                 transition: { repeat: Infinity, duration: 1.5 },
//                               },
//                             }}
//                             style={{ border: `2px solid ${COLORS.PRIMARY}` }}
//                           />

//                           {/* Icon Circle */}
//                           <motion.div
//                             className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
//                             style={{ backgroundColor: COLORS.PRIMARY }}
//                             variants={{
//                               rest: {
//                                 scale: 1,
//                                 backgroundColor: COLORS.PRIMARY,
//                               },
//                               hover: {
//                                 scale: 1.1,
//                                 backgroundColor: COLORS.SECONDARY,
//                                 transition: {
//                                   type: "spring",
//                                   stiffness: 400,
//                                   damping: 10,
//                                 },
//                               },
//                             }}
//                           >
//                             <motion.div
//                               variants={{
//                                 rest: { rotate: 0, scale: 1 },
//                                 hover: {
//                                   rotate: 360,
//                                   scale: 1.2,
//                                   transition: {
//                                     duration: 0.6,
//                                     ease: "easeInOut",
//                                   },
//                                 },
//                               }}
//                             >
//                               <Icon
//                                 size={40}
//                                 className="text-white"
//                                 // We handle color changes via the motion variants above for smoother transitions
//                               />
//                             </motion.div>
//                           </motion.div>
//                         </motion.div>
//                       </div>
//                     }
//                     content={
//                       <>
//                         <h1
//                           className="text-2xl md:text-3xl font-semibold text-center mb-4"
//                           style={{ color: COLORS.PRIMARY }}
//                         >
//                           {card.title}
//                         </h1>
//                         <p className="text-gray-600 px-4 text-md xl:text-lg text-center">
//                           <WavyText text={card.description} delay={0.04} />
//                         </p>
//                       </>
//                     }
//                   />
//                 </SpotlightCard>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Home, BadgeCheck, Sparkles } from "lucide-react";
import { COLORS } from "../Constants/Colors";
import WavyText from "../Components/WavyText";
import Grainient from "../Components/Granient";
import SpotlightCard from "../Components/SpotlightCard";
import ParallaxCard from "../Components/ParallaxCard";

export default function Aboutus() {
  const [activeCardId, setActiveCardId] = useState(null);
  const tapTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    };
  }, []);

  const triggerTap = (id) => {
    setActiveCardId(id);
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      setActiveCardId(null);
    }, 700);
  };

  const cards = [
    {
      id: 1,
      title: "Home Service Only",
      description:
        "Enjoy professional massage therapy in the comfort of your home—no travel, no waiting. We bring everything needed.",
      icon: Home,
    },
    {
      id: 2,
      title: "Certified Therapists",
      description:
        "Our therapists are professionally trained, certified, and experienced, ensuring safe, hygienic, and deeply relaxing therapy.",
      icon: BadgeCheck,
    },
    {
      id: 3,
      title: "Premium Experience",
      description:
        "Experience spa-level comfort with premium oils, soothing music, clean equipment, and personalized care.",
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="about"
      className="w-full px-4 md:px-12 py-12 relative overflow-hidden"
    >
      {/* Background with optimized light settings */}
      <div className="absolute inset-0 h-full w-full z-0">
        <Grainient
          color1="#60b103"
          color2="#03b13d"
          color3="#77B103"
          timeSpeed={0.8}
          warpStrength={0.5}
          contrast={1.2}
          saturation={0.9}
          gamma={1.2}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        <motion.h2
          className="text-4xl text-white md:text-5xl font-bold text-center "
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="hidden md:block">
            <WavyText text="About BK Body Massage" delay={0.03} />
          </div>
          <div className="md:hidden">
            <WavyText text="About BK " delay={0.3} />
            <br />
            <WavyText text="Body Massage " delay={0.3} />
          </div>
        </motion.h2>
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className=" text-lg md:text-xl text-white text-center max-w-3xl mx-auto"
        >
          <WavyText
            text="Experience premium relaxation at your home. Certified therapists provide body pain relief, stress reduction & improved sleep with complete privacy."
            delay={0.02}
          />
        </motion.p>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial="rest"
                whileHover="hover" // Master trigger for all nested variants
                animate={activeCardId === card.id ? "hover" : "rest"}
                whileTap="hover"
                onTap={() => triggerTap(card.id)}
                className="h-full"
                variants={{
                  hover: { y: -5 }, // Slight lift on the whole card
                }}
              >
                <SpotlightCard
                  spotlightColor={COLORS.PRIMARY}
                  alpha={0.2}
                  radius={350}
                  className="h-full"
                >
                  <ParallaxCard
                    header={
                      <div className="mb-6 flex justify-center">
                        <div className="relative">
                          {/* Animated Pulse Ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            variants={{
                              rest: { scale: 1, opacity: 0 },
                              hover: {
                                scale: 1.5,
                                opacity: [0, 0.4, 0],
                                transition: { repeat: Infinity, duration: 1.2 },
                              },
                            }}
                            style={{ border: `2px solid ${COLORS.PRIMARY}` }}
                          />

                          {/* Icon Circle */}
                          <motion.div
                            className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
                            style={{ backgroundColor: COLORS.PRIMARY }}
                            variants={{
                              rest: { scale: 1 },
                              hover: {
                                scale: 1.1,
                                backgroundColor: COLORS.SECONDARY,
                                transition: {
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 10,
                                },
                              },
                            }}
                          >
                            {/* Spinning Icon */}
                            <motion.div
                              variants={{
                                rest: { rotate: 0 },
                                hover: {
                                  rotate: 360,
                                  transition: {
                                    duration: 0.8,
                                    ease: "anticipate",
                                  },
                                },
                              }}
                            >
                              <Icon size={40} className="text-white" />
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                    }
                    content={
                      <div className="text-center px-4">
                        <h3
                          className="text-2xl font-bold mb-3"
                          style={{ color: COLORS.PRIMARY }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    }
                  />
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
