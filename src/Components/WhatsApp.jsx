import React from "react";
import { MessageCircle } from "lucide-react"; // WhatsApp-style icon

export default function WhatsApp() {
  return (
    <a
      href="https://wa.me/918917501160?text=Hello%20I%20want%20to%20book%20a%20home%20massage"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div
        className="w-16 h-16 rounded-full bg-[#0A9396] text-white 
        flex items-center justify-center shadow-xl cursor-pointer 
        transition-all duration-300 hover:scale-110
        animate-pulse border-4 border-white/30"
      >
        <MessageCircle size={34} className="drop-shadow-sm" />
      </div>

      {/* Soft Glow Effect Behind Button */}
      <div className="absolute inset-0 w-16 h-16 rounded-full bg-[#6FDCE3] blur-xl opacity-50 -z-10"></div>
    </a>
  );
}

