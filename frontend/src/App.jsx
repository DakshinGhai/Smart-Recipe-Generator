import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import RecipeList from './components/RecipeList';

// The base URL for your backend API
const API_URL = 'http://localhost:5000/api';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // This function will fetch recipes from your backend
  const fetchRecipes = async (searchParams = {}) => {
    setIsLoading(true);
    setError(null);

    // Build the query string from search parameters
    const query = new URLSearchParams(searchParams).toString();
    
    try {
      const response = await fetch(`${API_URL}/recipes?${query}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes. The server might be down.');
      }

      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  // Use useEffect to fetch all data once when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []); // The empty array [] means this effect runs only once

  const handleRateRecipe = (recipeId, rating) => {
    console.log(`User rated recipe ${recipeId} with ${rating} stars!`);
    // FUTURE: Here you would make a POST request to a backend endpoint like /api/recipes/:id/rate
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <Search onSearch={fetchRecipes} />
        
        {isLoading && <p className="text-center text-slate-600">Loading recipes...</p>}
        {error && <p className="text-center text-red-500 font-semibold">{error}</p>}
        {!isLoading && !error && (
          <RecipeList recipes={recipes} onRate={handleRateRecipe} />
        )}
      </main>
    </div>
  );
}

export default App;