import React, { useState } from 'react';

// Component Imports
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';

// API Helper
import { fetchRecipes } from './api';

// Asset Imports for Decorative Backgrounds
import BannerBackground from './assets/home-banner-background.png';
import BannerBackground2 from './assets/about-background.png'; // Assuming you have a second image, or reusing the first

export default function App() {
  // State for managing recipe data and API status
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for tracking UI behavior
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
    // The main container is the anchor for positioning and hides scrollbars from oversized elements.
    <div className="bg-light min-h-screen font-sans text-secondary relative overflow-hidden">
      
      {/* Decorative Background Images */}
      {/* Using 'fixed' positioning to lock them to the viewport, so they don't move on scroll. */}
      <div className="fixed -top-40 -right-40 w-[700px] -z-10">
          <img src={BannerBackground} alt="Decorative background shape" />
      </div>
      {/* <div className="fixed -bottom-100 -left-40 w-[700px] -z-10">
          <img src={BannerBackground2} alt="Decorative background shape" />
      </div> */}
      
      {/* The header component, which is now transparent-on-top. */}
      <Header />

      {/* The main content area.
        - `z-10` ensures it sits above the fixed backgrounds.
        - `pt-24 md:pt-32` is crucial padding to push the content down so it doesn't get hidden by the transparent fixed header.
      */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 relative z-10 pt-24 md:pt-32">
        {/* Main layout grid: 1 column on mobile, 3 on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Search & Filters */}
          <div className="lg:col-span-1">
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
              onSelectRecipe={setSelectedRecipe} // Pass function to set the selected recipe
            />
          </div>

        </div>
      </main>

      {/* The Recipe Detail Modal - Rendered on top of everything when a recipe is selected. */}
      <RecipeModal 
        recipe={selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} // Pass function to close the modal
      />
    </div>
  );
}