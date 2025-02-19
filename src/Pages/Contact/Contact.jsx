import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="mb-10">
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('./contact.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
       <div className="section-container">
       <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold uppercase tracking-wide">Contact Us</h1>
          <p className="text-lg mt-3 max-w-2xl mx-auto">We'd love to hear from you! Feel free to reach out for any inquiries or support.</p>
        </div>
       </div>
      </section>

      {/* Contact Information */}
      <section className="py-10 section-container">
        <h2 className="text-3xl font-bold text-[#e57339]">Get in Touch</h2>
        <div className="flex flex-wrap justify-between gap-10 mt-8">
          {[
            { icon: <FaPhoneAlt className="text-[#e57339] text-3xl" />, title: "Call Us", text: "01302633568" },
            { icon: <FaEnvelope className="text-[#e57339] text-3xl" />, title: "Email Us", text: "sohelf131@gmail.com" },
            { icon: <FaMapMarkerAlt className="text-[#e57339] text-3xl" />, title: "Visit Us", text: "Dhaka, Bangladesh" },
          ].map((item, index) => (
            <div key={index} className="w-64 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              {item.icon}
              <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-10 section-container px-6  bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-[#e57339]">Send a Message</h2>
        <form className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg focus:outline-[#e57339]" required />
            <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border rounded-lg focus:outline-[#e57339]" required />
          </div>
          <textarea placeholder="Your Message" rows="5" className="w-full mt-4 px-4 py-3 border rounded-lg focus:outline-[#e57339]" required></textarea>
          <button type="submit" className="w-full mt-4 bg-[#e57339] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#cc6633] transition">
            Send Message
          </button>
        </form>
      </section>

    </div>
  );
}
