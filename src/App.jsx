
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import WhatsApp from "./Components/WhatsApp";
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen font-sans">
        <Navbar />

        <AppRoutes />
        
        <Footer/>
        <WhatsApp/>
      </div>
    </Router>
  );
}


