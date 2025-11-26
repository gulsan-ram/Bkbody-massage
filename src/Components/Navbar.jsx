import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Our Services", to: "/services" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact Us", to: "/contact" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 shadow-md bg-white/60 backdrop-blur-xl animate-navbarSlide">
      <nav className="flex justify-between items-center px-8 py-4">
        
        {/* Logo */}
        <img
          src="/Images/logo1.png"
          alt="Logo"
          className="h-12 object-cover cursor-pointer"
        />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 font-medium text-[#005F73]">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                className="relative hover:text-[#0A9396] transition-colors duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-[#005F73]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <ul className="md:hidden bg-white/90 backdrop-blur-xl w-full text-center py-4 space-y-5 font-medium text-[#005F73] animate-fadeIn">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className="block hover:text-[#0A9396] transition-all"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

