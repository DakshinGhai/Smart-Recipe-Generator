import axios from "axios";
const BASE = "https://smart-recipe-generator-h0c8.onrender.com/api";
export const fetchRecipes = (params) =>
  axios.get(`${BASE}/recipes`, { params }).then((r) => r.data);
export const fetchRecipe = (id) =>
  axios.get(`${BASE}/recipes/${id}`).then((r) => r.data);
export const rateRecipe = (id, rating) =>
  axios.post(`${BASE}/recipes/${id}/rate`, { rating }).then((r) => r.data);
