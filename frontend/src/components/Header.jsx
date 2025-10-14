
// src/components/Header.jsx

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';
import logo from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import AboutModal from './AboutModal';
import HowItWorksModal from './HowItWorksModal';

export default function Header({ onShowFavorites, onShowAll }) { // Accept new props
  const scrollY = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isHowItWorksModalOpen, setHowItWorksModalOpen] = useState(false);

  const isScrolled = scrollY > 50;
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navLinkClasses = (scrolled) =>
    `text-md font-medium transition-colors duration-300 cursor-pointer ${
      scrolled
        ? 'text-gray-600 hover:text-primary'
        : 'text-white hover:text-primary-light'
    }`;

  const handleOpenAboutModal = () => setAboutModalOpen(true);
  const handleCloseAboutModal = () => setAboutModalOpen(false);
  const handleOpenHowItWorksModal = () => setHowItWorksModalOpen(true);
  const handleCloseHowItWorksModal = () => setHowItWorksModalOpen(false);

  return (
    <>
      <header /* ... */ >
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {}
          <button onClick={onShowAll} className="flex items-center gap-3 cursor-pointer ml-10">
            <img src={logo} alt="Smart Recipe Logo" className="h-15 w-auto" />
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={handleOpenAboutModal} className={navLinkClasses(isScrolled)}>About</button>
            {}
            <button onClick={onShowFavorites} className={navLinkClasses(isScrolled)}>Favorites</button>
            <button onClick={handleOpenHowItWorksModal} className="bg-white text-amber-500 font-bold py-2 px-5 rounded-full hover:bg-primary-dark transition-colors">
              Get Started
            </button>
          </nav>
          
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}><Menu size={28} className={isScrolled ? 'text-secondary' : 'text-white'} /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div /* ... */ >
            <div className="flex justify-end mb-8"><button onClick={toggleMobileMenu}><X size={30} className="text-gray-700" /></button></div>
            <nav className="flex flex-col items-center gap-8">
              <button onClick={() => { handleOpenAboutModal(); toggleMobileMenu(); }} className="text-2xl font-semibold text-gray-700 hover:text-primary">About</button>
              {/* Mobile favorites link */}
              <button onClick={() => { onShowFavorites(); toggleMobileMenu(); }} className="text-2xl font-semibold text-gray-700 hover:text-primary">Favorites</button>
              <button onClick={() => { handleOpenHowItWorksModal(); toggleMobileMenu(); }} className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-dark transition-colors mt-4">
                Get Started
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AboutModal isOpen={isAboutModalOpen} onClose={handleCloseAboutModal} />
      <HowItWorksModal isOpen={isHowItWorksModalOpen} onClose={handleCloseHowItWorksModal} />
    </>
  );
}