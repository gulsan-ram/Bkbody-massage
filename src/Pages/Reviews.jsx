import React from "react";
import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      name: "Priya Sharma",
      text: "Absolutely amazing experience! Therapist was very professional and the home spa setup was so relaxing.",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      text: "Best massage I’ve had in a long time. On-time service, clean setup and total comfort!",
      rating: 5,
    },
    {
      name: "Sneha Patnaik",
      text: "Very soothing and luxurious. Perfect for stress relief after work. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-[#6FDCE3]/40 px-6 py-20 md:px-20">
      
      {/* Heading */}
      <h2 className="text-center text-4xl md:text-5xl font-bold text-[#003844] mb-6">
        Customer Reviews 🌟
      </h2>

      <p className="text-center text-[#005F73] text-lg max-w-2xl mx-auto mb-14">
        Here’s what our happy clients say about their home spa experience.
      </p>

      {/* Reviews Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-[#6FDCE3]/50 hover:scale-[1.02] transition-all"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {Array(review.rating)
                .fill()
                .map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className="text-yellow-500 fill-yellow-400"
                  />
                ))}
            </div>

            {/* Text */}
            <p className="text-[#003844] text-base leading-relaxed mb-4">
              “{review.text}”
            </p>

            {/* Name */}
            <h4 className="text-[#0A9396] font-semibold text-lg">{review.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
