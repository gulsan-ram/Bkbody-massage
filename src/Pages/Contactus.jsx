import React from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-[#6FDCE3] to-white min-h-screen flex flex-col items-center px-6 py-14 md:px-20">
      
      {/* Heading */}
      <div className="text-center  mt-12 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#003844] mb-4">
          Contact Us 
        </h2>
        <p className="text-lg text-[#005F73]">
          Reach out to book a luxurious home massage experience.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-4xl bg-white bg-opacity-50 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-14 flex flex-col md:flex-row gap-10">
        
        {/* Contact Info */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <Phone className="text-[#0A9396]" size={28} />
            <a href="tel:+918917501160" className="text-[#003844] text-lg font-medium hover:text-[#0A9396]">
              +91 89175 01160
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-[#0A9396]" size={28} />
            <a href="mailto:contact@bkbodymassage.com" className="text-[#003844] text-lg font-medium hover:text-[#0A9396]">
              contact@bkbodymassage.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-[#0A9396]" size={28} />
            <p className="text-[#003844] text-lg font-medium">
              Bhubaneswar — Doorstep Service
            </p>
          </div>

          <a
            href="https://wa.me/918917501160"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-3 rounded-full bg-[#0A9396] text-white font-semibold shadow-lg hover:scale-105 transition-all text-center"
          >
            WhatsApp • Book Now
          </a>
        </div>

        {/* Contact Form */}
        <form className="flex-1 space-y-5">
          <input 
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-white/70 border border-[#6FDCE3] rounded-xl outline-none focus:ring-2 focus:ring-[#0A9396]"
          />

          <input 
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-white/70 border border-[#6FDCE3] rounded-xl outline-none focus:ring-2 focus:ring-[#0A9396]"
          />

          <input 
            type="text"
            placeholder="Phone Number"
            className="w-full px-4 py-3 bg-white/70 border border-[#6FDCE3] rounded-xl outline-none focus:ring-2 focus:ring-[#0A9396]"
          />

          <textarea 
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-3 bg-white/70 border border-[#6FDCE3] rounded-xl outline-none focus:ring-2 focus:ring-[#0A9396]"
          ></textarea>

          <button className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-[#0A9396] text-white font-semibold shadow-lg hover:scale-105 transition-all">
            Send Message <Send size={20} />
          </button>
        </form>

      </div>
    </div>
  );
}

