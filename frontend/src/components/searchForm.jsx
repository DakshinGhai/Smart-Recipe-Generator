// src/components/SearchForm.jsx
import React, { useState } from 'react';
import { X, Search, Leaf, BarChart3, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchForm({ onSearch, isLoading }) {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [diet, setDiet] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [maxTime, setMaxTime] = useState('');

  const handleAddIngredient = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && currentIngredient) {
      e.preventDefault();
      const newIngredient = currentIngredient.trim().toLowerCase();
      if (newIngredient && !ingredients.includes(newIngredient)) {
        setIngredients([...ingredients, newIngredient]);
      }
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter((ing) => ing !== ingredientToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      ingredients: ingredients.join(','),
      diet,
      difficulty,
      maxTime,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      {/* 1. Enhanced Ingredient Input */}
      <div>
        <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-800 mb-2">
          Available Ingredients
        </label>
        <div className="flex flex-wrap items-center gap-2 p-2 bg-light rounded-md focus-within:ring-2 focus-within:ring-primary-light transition-shadow">
          {ingredients.map((ing) => (
            <span key={ing} className="flex items-center bg-white border border-primary text-primary text-sm font-bold px-3 py-1 rounded-full shadow-sm">
              {ing}
              <button
                type="button"
                onClick={() => handleRemoveIngredient(ing)}
                className="ml-2 text-primary hover:text-red-500 transition-colors"
                aria-label={`Remove ${ing}`}
              >
                <X size={16} />
              </button>
            </span>
          ))}
          <input
            id="ingredients"
            type="text"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyDown={handleAddIngredient}
            placeholder="Type & press Enter..."
            className="flex-grow p-1 outline-none bg-transparent text-secondary"
          />
        </div>
      </div>

      {/* 2. Guided Filter Selection with Icons */}
      <div className="space-y-4">
        {/* Dietary Needs */}
        <div className="relative">
          <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select id="diet" value={diet} onChange={(e) => setDiet(e.target.value)} className="w-full pl-10 p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
            <option value="">Any Dietary Needs</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
          </select>
        </div>
        {/* Difficulty & Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full pl-10 p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
              <option value="">Any Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input id="maxTime" type="number" value={maxTime} onChange={(e) => setMaxTime(e.target.value)} placeholder="Max Time (mins)" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
          </div>
        </div>
      </div>

      {/* 3. Action-Oriented Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-amber-400  text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search size={20} />
        {isLoading ? 'Searching...' : 'Find Recipes'}
      </motion.button>
    </form>
  );
}