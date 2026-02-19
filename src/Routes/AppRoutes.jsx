import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../Pages/Home";
import About from "../Pages/Aboutus";
import Services from "../Pages/Ourservices";
import Gallery from "../Pages/Gallery";
import Contact from "../Pages/Contactus";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
