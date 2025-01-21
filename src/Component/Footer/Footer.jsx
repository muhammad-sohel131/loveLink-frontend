import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaXbox } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-purple-900 text-white py-10">
      <div className="section-container mx-auto px-5">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white pb-8">

          {/* About Us */}
          <div>
            <h2 className="text-xl font-bold mb-3">💖 About LoveLink</h2>
            <p className="text-gray-200">
              Connecting hearts and building beautiful stories. Join us to find your perfect match today!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-3">📌 Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-bold mb-3">🌍 Follow Us</h2>
            <div className="flex space-x-4">
              <Link to='/' className="text-2xl hover:text-yellow-300"><FaFacebook /></Link>

              <Link to='/' className="text-2xl hover:text-yellow-300">
                <FaInstagram />
              </Link>
              <Link to='/' className="text-2xl hover:text-yellow-300">
                <FaTwitter />
              </Link>
              <Link to='/' className="text-2xl hover:text-yellow-300">
                <FaLinkedin />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-xl font-bold mb-3">📩 Subscribe</h2>
            <p className="text-gray-200">Stay updated with our latest matches & success stories.</p>
            <div className="mt-3 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md w-full text-black"
              />
              <button className="bg-yellow-400 px-4 py-2 rounded-r-md font-semibold hover:bg-yellow-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center pt-6">
          <p className="text-gray-300 text-sm">© 2025 Matrimony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
