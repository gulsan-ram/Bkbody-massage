
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import WhatsApp from "./Components/WhatsApp";

// Pages
import Home from "./Pages/Home";
import About  from "./Pages/Aboutus";
import Services from "./Pages/Ourservices";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contactus";


export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen font-sans">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer/>
        <WhatsApp/>
      </div>
    </Router>
  );
}


