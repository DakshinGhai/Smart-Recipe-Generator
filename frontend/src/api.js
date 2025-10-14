// src/api.js

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Fetches recipes from the backend based on user-provided filters.
 * @param {object} params - The query parameters for the API call.
 * @param {string} params.ingredients - Comma-separated string of ingredients.
 * @param {string} params.diet - Comma-separated string of dietary preferences.
 * @param {number} params.maxTime - Maximum cooking time in minutes.
 * @param {string} params.difficulty - Recipe difficulty ('Easy', 'Medium', 'Hard').
 * @returns {Promise<Array>} A promise that resolves to an array of recipe objects.
 */
export async function fetchRecipes(params) {
  // Clean up the params object to remove any empty values
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null && v !== '')
  );

  const queryString = new URLSearchParams(cleanedParams).toString();
  const url = `${API_BASE_URL}/recipes?${queryString}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong with the server.");
  }

  return response.json();
}