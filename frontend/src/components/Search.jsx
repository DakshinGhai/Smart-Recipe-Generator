import React, { useState } from 'react';

export default function Search({ onSearch }) {
  const [ingredients, setIngredients] = useState('');
  const [diet, setDiet] = useState('');
  const [maxTime, setMaxTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ ingredients, diet, maxTime });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label htmlFor="ingredients" className="block text-sm font-medium text-slate-700">
            Available Ingredients
          </label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, tomato, basil"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="diet" className="block text-sm font-medium text-slate-700">
            Dietary Preference
          </label>
          <select
            id="diet"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          >
            <option value="">Any</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-600 transition"
        >
          Find Recipes
        </button>
      </form>
    </div>
  );
}