import React from "react";
import { motion } from "framer-motion";
import Aboutus from "./Aboutus";
import OurServices from "./Ourservices";
import OurPromises from "./Ourpromises";
import Reviews from "./Reviews";
import Hero from "./Hero";
export default function Home() {
  return (
    <>
      {/* Full-Screen Hero Section */}
      <Hero />

      {/* Other Sections */}
      <Aboutus />
      <OurServices />
      <OurPromises />
      <Reviews />
    </>
  );
}
