import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import img from "../assets/Open_Food_Facts_logo_2022.svg.png";
import img2 from "../assets/icons8-github.svg";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative z-50">
      {/* Top Information Section */}
      <section className="w-full bg-[#007bff] text-white py-2 px-4 lg:px-10 neu-brutal">
        <div className="flex justify-between items-center">
          <p className="text-sm">
            <strong className="lg:mx-3">Address: Indira Nagar, Bengaluru</strong>
            <strong className="lg:mx-3">Contact No: 9109011964</strong>
          </p>
          <div className="space-x-4 md:absolute md:right-10 flex items-center max-md:ml-auto">
            {/* Social Media Icons */}
            <div className="w-7 h-7 flex items-center justify-center rounded-md">
              <img src={img2} alt="GitHub" className="cursor-pointer hover:bg-transparent" />
            </div>
            <div className="w-7 h-7 flex items-center justify-center rounded-md text-gray-800 hover:bg-blue-600 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z" />
              </svg>
            </div>
            <div className="w-7 h-7 flex items-center justify-center rounded-md text-gray-800 hover:bg-black hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-5 h-5 fill-current" viewBox="0 0 1226.37 1226.37">
                <path d="M727.348 519.284 1174.075 0h-105.86L680.322 450.887 370.513 0H13.185l468.492 681.821L13.185 1226.37h105.866l409.625-476.152 327.181 476.152h357.328L727.322 519.284zM582.35 687.828l-47.468-67.894-377.686-540.24H319.8l304.797 435.991 47.468 67.894 396.2 566.721H905.661L582.35 687.854z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-10 bg-white neu-brutal min-h-[70px]">
        {/* Logo */}
        <img src={img} alt="logo" className="w-36 neu-brutal" />

        {/* Navigation Menu */}
        <div className={`lg:block ${isMenuOpen ? "block" : "max-lg:hidden"}`}>
          <ul
            className={`lg:flex lg:gap-x-5 lg:space-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full z-50 transition-all ease-in-out duration-300 ${isMenuOpen ? 'max-lg:block' : 'max-lg:hidden'}`}
          >
            <li className="max-lg:border-b max-lg:py-3 px-3 neu-brutal">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#007bff] font-bold" : "text-[#333] font-bold"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3 neu-brutal">
              <NavLink
                to="/category"
                className={({ isActive }) =>
                  isActive ? "text-[#007bff] font-bold" : "text-[#333] font-bold"
                }
              >
                Category
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3 neu-brutal">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-[#007bff] font-bold" : "text-[#333] font-bold"
                }
              >
                About
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3 neu-brutal">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-[#007bff] font-bold" : "text-[#333] font-bold"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden neu-brutal p-3 bg-[#007bff] rounded-md text-white hover:bg-[#0056b3] transition-all duration-200 ease-in-out"
        >
          ☰
        </button>
      </div>
    </header>
  );
}
export default Nav;
