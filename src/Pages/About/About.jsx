import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('./about.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative section-container z-10 text-center">
          <h1 className="text-5xl font-bold uppercase tracking-wide">About Us</h1>
          <p className="text-lg mt-3 max-w-2xl mx-auto">Connecting hearts, creating lifelong stories. Join us and experience a journey of love and commitment.</p>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-10 section-container">
        <h2 className="text-3xl font-bold text-[#e57339]">Our Mission & Values</h2>
        <div className="flex flex-wrap justify-between mt-8">
          {[
            { icon: "💖", title: "Authenticity", text: "Real people, real connections. We prioritize genuine relationships." },
            { icon: "🔐", title: "Privacy", text: "Your data is safe with us. Security is our top priority." },
            { icon: "🌍", title: "Inclusivity", text: "Love knows no boundaries. We welcome everyone." },
            { icon: "🎯", title: "Commitment", text: "Helping you find lasting love and companionship." },
          ].map((item, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-6 bg-white shadow-lg rounded-lg">
              <div className="text-5xl">{item.icon}</div>
              <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Statistics */}
      <section className="bg-[#e57339] text-white py-10">
       <div className="section-container">
       <h2 className="text-3xl font-bold">Our Impact</h2>
        <div className="flex flex-wrap justify-between gap-10 mt-8">
          {[
            { number: "50K+", label: "Successful Matches" },
            { number: "10K+", label: "Happy Marriages" },
            { number: "95%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-3xl font-semibold">
              <h3 className="text-5xl">{stat.number}</h3>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
       </div>
      </section>


      {/* Call to Action */}
      <section className="py-10 section-container text-center">
        <h2 className="text-3xl font-bold">Join Us and Start Your Journey!</h2>
        <p className="mt-2 text-lg">Let us help you find your perfect match.</p>
        <button className="mt-6 bg-[#e57339] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#cc6633] transition">
          <Link to='/biodatas'>Get Started Now</Link>
        </button>
      </section>
    </div>
  );
}
