// src/components/Header.jsx
import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react'; // Added Menu and X icons
import { useScroll } from '../hooks/useScroll';
import logo from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion'; // For animations

export default function Header() {
  const scrollY = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Header becomes solid and blurred after scrolling 50px
  const isScrolled = scrollY > 50;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinkClasses = (scrolled) => 
    `text-md font-medium transition-colors duration-300 ${
      scrolled 
      ? 'text-gray-600 hover:text-primary' 
      : 'text-white hover:text-primary-light'
    }`;
  
  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-30 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/80 shadow-md backdrop-blur-sm' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 cursor-pointer ml-10">
            <img src={logo} alt="Smart Recipe Logo" className="h-15 w-auto" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className={navLinkClasses(isScrolled)}>About</a>
            <a href="#favorites" className={navLinkClasses(isScrolled)}>Favorites</a>
            <button className="bg-white text-amber-500 font-bold py-2 px-5 rounded-full hover:bg-primary-dark transition-colors">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              <Menu size={28} className={isScrolled ? 'text-secondary' : 'text-white'} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 p-6"
          >
            <div className="flex justify-end mb-8">
              <button onClick={toggleMobileMenu}>
                <X size={30} className="text-gray-700" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8">
              <a href="#about" onClick={toggleMobileMenu} className="text-2xl font-semibold text-gray-700 hover:text-primary">About</a>
              <a href="#favorites" onClick={toggleMobileMenu} className="text-2xl font-semibold text-gray-700 hover:text-primary">Favorites</a>
              <button className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-dark transition-colors mt-4">
                Get Started
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}