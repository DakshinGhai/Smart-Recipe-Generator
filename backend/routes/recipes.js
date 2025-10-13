const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_PATH = path.join(__dirname, "..", "data", "recipes.json");

function loadRecipes() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

// GET /api/recipes -> returns all recipes or matched recipes
router.get("/", (req, res) => {
  try {
    const { ingredients, diet, maxTime, difficulty } = req.query;
    let allRecipes = loadRecipes();

    let filteredRecipes = allRecipes;

    // --- Optional Filters (applied before matching) ---
    if (diet) {
      const diets = diet.split(",").map((d) => d.trim().toLowerCase());
      filteredRecipes = filteredRecipes.filter(
        (r) =>
          r.dietary &&
          diets.every((d) => r.dietary.map((x) => x.toLowerCase()).includes(d))
      );
    }
    if (difficulty) {
      filteredRecipes = filteredRecipes.filter(
        (r) => r.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }
    if (maxTime) {
      const m = parseInt(maxTime, 10);
      filteredRecipes = filteredRecipes.filter((r) => r.time <= m);
    }

    // --- Ingredient Matching Logic ---
    if (ingredients) {
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

          // Calculate a score: (matched / total recipe ingredients)
          const matchScore =
            matchedIngredients.length / recipeIngredients.length;

          return {
            ...recipe,
            matchScore,
            missing: missingIngredients,
          };
        })
        .filter((recipe) => recipe.matchScore > 0); // Only return recipes with at least one match

      // Sort by the best match score
      scoredRecipes.sort((a, b) => b.matchScore - a.matchScore);

      res.json(scoredRecipes);
    } else {
      // If no ingredients are provided, return the filtered list (or all recipes)
      res.json(filteredRecipes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load recipes" });
  }
});

module.exports = router;
