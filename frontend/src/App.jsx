// src/App.jsx

import React, { useState, useRef } from 'react'; // Import useRef

// Component Imports
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';

// API Helper
import { fetchRecipes } from './api';

// Asset Imports for Decorative Backgrounds
import BannerBackground from './assets/home-banner-background.png';

export default function App() {
  // State for managing recipe data and API status
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for tracking UI behavior
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Create a ref for the search section of the page
  const searchSectionRef = useRef(null);

  /**
   * Smoothly scrolls the user to the search form section.
   */
  const handleGetStarted = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Handles the search request from the SearchForm component.
   * It calls the API, manages loading/error states, and updates the recipe list.
   * @param {object} searchParams - The search criteria from the form.
   */
  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true); // Mark that a search has been attempted
    try {
      const results = await fetchRecipes(searchParams);
      setRecipes(results);
    } catch (err) {
      setError(err.message);
      setRecipes([]); // Clear previous results on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-light min-h-screen font-sans text-secondary relative overflow-hidden">
      {/* Decorative Background Images */}
      <div className="fixed -top-40 -right-40 w-[700px] -z-10">
        <img src={BannerBackground} alt="Decorative background shape" />
      </div>

      {/* Pass the scroll handler function to the Header */}
      <Header onGetStartedClick={handleGetStarted} />

      <main className="max-w-7xl mx-auto p-4 md:p-8 relative z-10 pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attach the ref to the div containing the search form */}
          <div className="lg:col-span-1" ref={searchSectionRef}>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-1">Find Your Recipe</h2>
              <p className="text-gray-600 mb-4">Let's get cooking!</p>
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>

          {/* Right Column: Recipe Results */}
          <div className="lg:col-span-2">
            <RecipeList
              recipes={recipes}
              isLoading={isLoading}
              error={error}
              hasSearched={hasSearched}
              onSelectRecipe={setSelectedRecipe}
            />
          </div>
        </div>
      </main>

      {/* The Recipe Detail Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}