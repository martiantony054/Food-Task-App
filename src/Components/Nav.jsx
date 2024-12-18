import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import img from "../assets/Open_Food_Facts_logo_2022.svg.png";
import img2 from "../assets/icons8-github.svg";
import { SiNetlify } from "react-icons/si";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a navigation link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Information Section */}
      <section className="w-full bg-[#007bff] text-white py-2 px-4 lg:px-10 neu-brutal">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <p className="text-xs sm:text-sm">
            <strong className="mr-2 sm:mx-3">Address: Indira Nagar, Bengaluru</strong>
            <strong className="mr-2 sm:mx-3">Contact No: 9109011964</strong>
          </p>
          <div className="flex items-center space-x-3 ">
            {/* Social Media Icons */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md neu-brutal hover:bg-white">
              <a href="https://github.com/martiantony054" target="_blank" rel="noopener noreferrer">
                <img
                  src={img2}
                  alt="GitHub"
                  className="w-5 h-5 cursor-pointer hover:opacity-75"
                />
              </a>
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md neu-brutal hover:bg-blue-900">
              <a href="https://www.linkedin.com/in/martin-antony-78065a241" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" />
                </svg>
              </a>
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md neu-brutal hover:bg-black">
              <a href="https://app.netlify.com/teams/martiantony054/sites" target="_blank" rel="noopener noreferrer">
                <SiNetlify className="text-xl sm:text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-10 neu-brutal ">
          {/* Logo */}
          <img src={img} alt="logo" className="w-28 sm:w-36" />

          {/* Mobile Overlay */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40" 
              onClick={closeMenu}
            />
          )}

          {/* Navigation Menu */}
          <div 
            className={`
              fixed top-0 left-0 w-64 h-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 
              lg:static lg:w-auto lg:bg-none lg:h-auto lg:block
              transform transition-transform duration-300 ease-in-out z-50
              ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:translate-x-0
            `}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-5 h-full lg:h-auto">
              {/* Close button for mobile */}
              <li className="lg:hidden text-right p-4">
                <button 
                  onClick={closeMenu} 
                  className="text-2xl font-bold text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </li>

              {/* Navigation Links */}
              {['Home', 'Category', 'About', 'Contact'].map((link) => (
                <li 
                  key={link} 
                  className="lg:inline-block border-b lg:border-b-0 border-blue-400 lg:border-none"
                >
                  <NavLink
                    to={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-4 py-3 lg:py-0 ${
                        isActive 
                          ? 'text-[#007bff] font-bold' 
                          : 'text-[#333] font-bold hover:bg-blue-200 lg:hover:bg-transparent lg:hover:text-[#007bff]'
                      }`
                    }
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 bg-[#007bff] rounded-md text-white hover:bg-[#0056b3]"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Nav;