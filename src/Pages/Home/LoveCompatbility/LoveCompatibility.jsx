import { useState } from "react";
import { GiLovers } from "react-icons/gi";

export default function LoveCompatibility() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);

  const calculateCompatibility = () => {
    if (name1 && name2) {
      const percentage = Math.floor(Math.random() * (99 - 50 + 1)) + 50;
      setResult(`${name1} ❤️ ${name2}: ${percentage}% Compatible!`);
    }
  };

  return (
    <section className="bg-[#e57339] text-white py-10 mt-10 px-6 md:px-12 text-center">
      <h2 className="text-3xl font-bold flex justify-center items-center gap-2"> <GiLovers />Check Your Love Compatibility</h2>
      <p className="mt-4 text-lg">Enter your names and see if you're a perfect match!</p>

      {/* Input Fields */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
        <input 
          type="text" 
          placeholder="Your Name" 
          className="px-4 py-2 rounded-md text-gray-800"
          value={name1} 
          onChange={(e) => setName1(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Partner’s Name" 
          className="px-4 py-2 rounded-md text-gray-800"
          value={name2} 
          onChange={(e) => setName2(e.target.value)} 
        />
      </div>

      {/* Calculate Button */}
      <button 
        onClick={calculateCompatibility} 
        className="cursor-pointer bg-white text-[#e57339] rounded-lg flex items-center justify-center gap-2 py-2 px-7 shadow-md mx-auto mt-7 font-bold"
      >
        Check Now
      </button>

      {/* Display Result */}
      {result && <p className="mt-6 text-xl font-semibold">{result}</p>}
    </section>
  );
}
