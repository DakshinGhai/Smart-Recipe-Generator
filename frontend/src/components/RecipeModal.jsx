// src/components/RecipeModal.jsx (New File)
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ChefHat, Users, Leaf, WheatOff } from 'lucide-react';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-50px", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          variants={modal}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary-dark">{recipe.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={28} /></button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
              <div className="bg-light p-3 rounded-lg"><Clock className="mx-auto mb-1 text-primary"/>{recipe.time} mins</div>
              <div className="bg-light p-3 rounded-lg"><ChefHat className="mx-auto mb-1 text-primary"/>{recipe.difficulty}</div>
              <div className="bg-light p-3 rounded-lg"><Users className="mx-auto mb-1 text-primary"/>Serves {recipe.servings}</div>
              <div className="bg-light p-3 rounded-lg"><span className="font-bold text-primary">{recipe.nutrition.calories}</span> kcal</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2 border-b-2 border-primary-light pb-1">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 border-b-2 border-primary-light pb-1">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {recipe.steps.map(step => <li key={step}>{step}</li>)}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}