// src/components/AboutModal.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import logo from '../assets/logo.png'; // Import your logo

// Animation variants for the backdrop and modal
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-50px", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};

export default function AboutModal({ isOpen, onClose }) {
  // Use AnimatePresence to animate the modal in and out
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal when clicking the background
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-8 text-center flex flex-col items-center"
            variants={modal}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Content of the Modal */}
            <img src={logo} alt="Smart Recipe Logo" className="h-16 w-auto mb-4" />
            <h2 className="text-3xl font-bold text-secondary mb-2">
              Dakshin Ghai
            </h2>
            <p className="text-lg text-gray-500 font-mono bg-gray-100 px-4 py-1 rounded-md">
              22BRS1073
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}