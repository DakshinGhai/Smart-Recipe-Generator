// src/components/SearchForm.jsx

import React, { useState, useRef } from 'react'; // 1. Import useRef
import { X, Search, Leaf, BarChart3, Clock, UploadCloud, Loader } from 'lucide-react'; // 2. Import new icons
import { motion } from 'framer-motion';
import axios from 'axios'; // 3. Import axios to make API calls

export default function SearchForm({ onSearch, isLoading }) {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [diet, setDiet] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [maxTime, setMaxTime] = useState('');

  // --- NEW STATE FOR IMAGE RECOGNITION ---
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionError, setRecognitionError] = useState(null);
  const fileInputRef = useRef(null); // To trigger file input click

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

  // --- NEW FUNCTION TO HANDLE IMAGE RECOGNITION ---
  const handleImageRecognition = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsRecognizing(true);
    setRecognitionError(null);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Make sure your backend is running on the correct port (e.g., 5000)
      const response = await axios.post('https://smart-recipe-generator-h0c8.onrender.com/api/recognize', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Add new ingredients, avoiding duplicates
      const recognizedIngredients = response.data.ingredients;
      setIngredients(prev => {
        const newIngredients = recognizedIngredients.filter(ing => !prev.includes(ing));
        return [...prev, ...newIngredients];
      });

    } catch (error) {
      console.error('Image recognition failed:', error);
      setRecognitionError('Could not recognize ingredients. Please try another image.');
    } finally {
      setIsRecognizing(false);
      // Reset file input so the same file can be selected again
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
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

      {/* --- NEW IMAGE UPLOAD SECTION --- */}
      <div className="text-center">
        <p className="text-sm text-gray-500 my-2">OR</p>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageRecognition}
          disabled={isRecognizing}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={isRecognizing}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 text-gray-500 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
        >
          {isRecognizing ? (
            <>
              <Loader size={20} className="animate-spin" />
              Recognizing...
            </>
          ) : (
            <>
              <UploadCloud size={20} />
              Recognize from Image
            </>
          )}
        </button>
        {recognitionError && <p className="text-red-500 text-xs mt-2">{recognitionError}</p>}
      </div>

      {/* 2. Guided Filter Selection with Icons */}
      <div className="space-y-4">
        {/* ... (rest of the form is unchanged) ... */}
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