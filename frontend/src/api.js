// src/api.js

import allRecipes from "./data/recipes.json";

/**
 * Filters and scores recipes locally from the imported JSON file.
 * This replaces the need for a backend API call for recipes.
 * @param {object} searchParams - The search criteria from the form.
 * @returns {Array} - A sorted array of matching recipes.
 */
export const fetchLocalRecipes = (searchParams) => {
  const { ingredients, diet, maxTime, difficulty } = searchParams;
  let filteredRecipes = allRecipes;

  // --- 1. Apply optional filters first ---
  if (diet) {
    filteredRecipes = filteredRecipes.filter(
      (r) =>
        r.dietary &&
        r.dietary.map((d) => d.toLowerCase()).includes(diet.toLowerCase())
    );
  }
  if (difficulty) {
    filteredRecipes = filteredRecipes.filter(
      (r) => r.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }
  if (maxTime) {
    const time = parseInt(maxTime, 10);
    if (!isNaN(time)) {
      filteredRecipes = filteredRecipes.filter((r) => r.time <= time);
    }
  }

  // --- 2. If ingredients are provided, score and sort ---
  if (ingredients && ingredients.trim() !== "") {
    const userIngredients = ingredients
      .split(",")
      .map((i) => i.trim().toLowerCase());

    const scoredRecipes = filteredRecipes
      .map((recipe) => {
        const recipeIngredients = recipe.ingredients.map((i) =>
          i.toLowerCase()
        );
        const matchedIngredients = recipeIngredients.filter((recipeIng) =>
          userIngredients.includes(recipeIng)
        );
        const missingIngredients = recipeIngredients.filter(
          (recipeIng) => !userIngredients.includes(recipeIng)
        );

        const matchScore = matchedIngredients.length / recipeIngredients.length;

        return {
          ...recipe,
          matchScore,
          missing: missingIngredients,
        };
      })
      .filter((recipe) => recipe.matchScore > 0); // Only return recipes with at least one match

    // Sort by the best match score
    scoredRecipes.sort((a, b) => b.matchScore - a.matchScore);
    return scoredRecipes;
  }

  // If no ingredients, return the filtered list
  return filteredRecipes;
};
