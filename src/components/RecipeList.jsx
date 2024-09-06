import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => setRecipes(response.data.meals))
      .catch(err => {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes && recipes.map(recipe => (
        <div key={recipe.idMeal} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{recipe.strMeal}</h2>
            <p className="text-gray-600 mt-2">
              {recipe.strInstructions.length > 150
                ? recipe.strInstructions.substring(0, 150) + '...'
                : recipe.strInstructions}
            </p>
            <Link to={`/recipe/${recipe.idMeal}`} className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              View Recipe
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
