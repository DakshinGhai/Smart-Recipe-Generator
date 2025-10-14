
// src/App.jsx

import React, { useState, useRef } from 'react';

// Component Imports
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';

// API Helper
import { fetchRecipes } from './api';

// Asset Imports
import BannerBackground from './assets/home-banner-background.png';

export default function App() {
  // Existing State
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // --- NEW STATE FOR FAVORITES ---
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('all'); // Can be 'all' or 'favorites'

  /**
   * Toggles a recipe in and out of the favorites list.
   * @param {number} recipeId - The ID of the recipe to toggle.
   */
  const toggleFavorite = (recipeId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(recipeId)) {
       
        return prevFavorites.filter((id) => id !== recipeId);
      } else {
       
        return [...prevFavorites, recipeId];
      }
    });
  };

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setView('all'); 
    try {
      const results = await fetchRecipes(searchParams);
      setRecipes(results);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  
  const allRecipesFromSearch = hasSearched ? recipes : [];
  const favoriteRecipes = allRecipesFromSearch.filter((r) => favorites.includes(r.id));
  const recipesToDisplay = view === 'favorites' ? favoriteRecipes : allRecipesFromSearch;

  return (
    <div className="bg-light min-h-screen font-sans text-secondary relative overflow-hidden">
      <div className="fixed -top-40 -right-40 w-[700px] -z-10">
        <img src={BannerBackground} alt="Decorative background shape" />
      </div>

      <Header
        onShowFavorites={() => setView('favorites')}
        onShowAll={() => setView('all')}
      />

      <main className="max-w-7xl mx-auto p-4 md-p-8 relative z-10 pt-24 md-pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-1">Find Your Recipe</h2>
              <p className="text-gray-600 mb-4">Let's get cooking!</p>
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <RecipeList
              recipes={recipesToDisplay}
              isLoading={isLoading}
              error={error}
              hasSearched={hasSearched || view === 'favorites'} // Show content if searching or viewing favorites
              onSelectRecipe={setSelectedRecipe}
              // Pass favorites state and toggle function down
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </main>

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}