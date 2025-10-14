
import React from 'react';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';
import { CookingPot } from 'lucide-react';

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Make sure to accept the new props here
export default function RecipeList({ recipes, isLoading, error, hasSearched, onSelectRecipe, favorites, onToggleFavorite }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-xl font-semibold text-red-700">Oops! Something Went Wrong</h3>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  if (hasSearched && recipes.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-800">No Recipes Found</h3>
        <p className="text-yellow-700 mt-2">Try adjusting your filters or search for all recipes.</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <motion.div
        className="text-center bg-white rounded-2xl shadow-lg border border-gray-100 p-8 py-16 flex flex-col items-center justify-center h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CookingPot className="h-24 w-24 text-primary-light mb-4" />
        <h3 className="text-2xl font-bold text-secondary">Ready to Cook?</h3>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
          Enter your ingredients in the form to discover delicious new recipes!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSelectRecipe={onSelectRecipe}
          // --- ADD THESE TWO LINES ---
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          // --------------------------
        />
      ))}
    </motion.div>
  );
}