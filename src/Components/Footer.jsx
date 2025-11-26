import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0F0E]/95 backdrop-blur-md text-white pt-14 pb-6 mt-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Logo + About */}
        <div>
          <img src="Images/logo1.png" alt="Logo" className="h-20 mb-4 opacity-90" />
          <p className="text-gray-300 leading-relaxed">
            Relax, Refresh & Rejuvenate ✨  
            We provide premium massage therapy services with trained professionals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#6FDCE3]">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-[#0A9396] transition">Home</a></li>
            <li><a href="/about" className="hover:text-[#0A9396] transition">About Us</a></li>
            <li><a href="/services" className="hover:text-[#0A9396] transition">Our Services</a></li>
            <li><a href="/gallery" className="hover:text-[#0A9396] transition">Gallery</a></li>
            <li><a href="/contact" className="hover:text-[#0A9396] transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info + Social Icons */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#6FDCE3]">Contact</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>📍 Bhubaneswar, Odisha</li>
            <li>📞 +91 89175 01160</li>
            <li>✉️ bkbodymassage@gmail.com</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            
            {/* Facebook */}
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-white/10 border border-[#0A9396]/30 
                        flex items-center justify-center transition-all duration-300 
                        hover:bg-[#0A9396] hover:scale-110 hover:shadow-xl"
            >
              <Facebook className="text-[#6FDCE3]" size={22} />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/bkbodymassage7?igsh=MWJsbGoyMzVwcnVqaQ=="
              className="w-12 h-12 rounded-xl bg-white/10 border border-[#0A9396]/30 
                        flex items-center justify-center transition-all duration-300 
                        hover:bg-[#0A9396] hover:scale-110 hover:shadow-xl"
            >
              <Instagram className="text-[#6FDCE3]" size={22} />
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-white/10 border border-[#0A9396]/30 
                        flex items-center justify-center transition-all duration-300 
                        hover:bg-[#0A9396] hover:scale-110 hover:shadow-xl"
            >
              <Youtube className="text-[#6FDCE3]" size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} BK Body Massage. All Rights Reserved.
      </div>
    </footer>
  );
}

