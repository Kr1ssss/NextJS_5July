// RecipeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => setRecipe(response.data.meals[0]))
      .catch(err => {
        console.error('Error fetching recipe details:', err);
        setError('Failed to load recipe details. Please try again later.');
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate('/')} className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
        Go Back
      </button>
      <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
      <p className="mt-4">{recipe.strInstructions}</p>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="mt-6 w-full rounded-lg shadow-md" />
    </div>
  );
};

export default RecipeDetail;
