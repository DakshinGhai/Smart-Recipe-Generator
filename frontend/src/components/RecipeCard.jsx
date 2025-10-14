// src/components/RecipeCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChefHat, CircleAlert, Soup } from 'lucide-react';

const getMatchColor = (score) => {
  if (score > 0.85) return 'bg-green-500';
  if (score > 0.60) return 'bg-primary'; // Use brand color for medium match
  return 'bg-red-500';
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function RecipeCard({ recipe, onSelectRecipe }) {
  const matchPercentage = (recipe.matchScore || 0) * 100;

  return (
    <motion.div
      // 1. Add the onClick handler to the main card container
      onClick={() => onSelectRecipe(recipe)}
      // 2. Add cursor-pointer to indicate the whole card is clickable
      className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <img
        src={recipe.imageUrl || `https://placehold.co/600x400/F97316/white?text=${recipe.title.split(' ').join('+')}`}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
          <Soup size={14} /> {recipe.cuisine}
        </p>
        
        <h3 className="text-xl font-bold text-secondary mt-1 mb-3">{recipe.title}</h3>

        <div className="flex justify-between text-sm text-gray-600 border-t pt-3 mb-4">
          <span className="flex items-center gap-1.5"><Clock size={16} /> {recipe.time} mins</span>
          <span className="flex items-center gap-1.5"><ChefHat size={16} /> {recipe.difficulty}</span>
        </div>

        <div className="flex-grow" />

        <div className="space-y-3">
          {recipe.matchScore !== undefined && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-700">Ingredient Match</span>
                <span className={`font-bold text-sm ${getMatchColor(recipe.matchScore).replace('bg', 'text')}`}>
                  {matchPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${getMatchColor(recipe.matchScore)} h-2.5 rounded-full`}
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>
            </div>
          )}

          {recipe.missing && recipe.missing.length > 0 && (
            <p className="text-xs text-red-600 flex items-start gap-1.5 mt-2">
              <CircleAlert size={14} className="flex-shrink-0 mt-px" />
              <span>Missing: {recipe.missing.slice(0, 3).join(', ')}</span>
            </p>
          )}
        </div>
      </div>

      <div className="p-4 border-t mt-auto">
        {/* 3. The button is now just a visual element, so we remove its onClick handler */}
        <div
          className="w-full bg-primary text-black font-bold py-2.5 px-4 rounded-lg text-center"
        >
          View Recipe
        </div>
      </div>
    </motion.div>
  );
}