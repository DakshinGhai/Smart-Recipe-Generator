// src/components/HowItWorksModal.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, UploadCloud, CookingPot } from 'lucide-react';

// Animation variants for consistency
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "-50px", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};

export default function HowItWorksModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6"
            variants={modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-bold text-secondary">How It Works</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-800"><X size={24} /></button>
            </div>

            {/* Steps Content */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary-light text-primary rounded-full p-3">
                  <Type size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">1. Enter Your Ingredients</h3>
                  <p className="text-gray-600">Type the ingredients you have at home into the search box. Press Enter or a comma after each one to add it to your list.</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary-light text-primary rounded-full p-3">
                  <UploadCloud size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">2. Or, Use AI Recognition</h3>
                  <p className="text-gray-600">Click the "Recognize from Image" button and upload a photo of your ingredients. Our AI will automatically identify them for you!</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary-light text-primary rounded-full p-3">
                  <CookingPot size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">3. Find Your Recipe</h3>
                  <p className="text-gray-600">Click "Find Recipes" to see all the meals you can create, sorted by the best match to your available ingredients.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}