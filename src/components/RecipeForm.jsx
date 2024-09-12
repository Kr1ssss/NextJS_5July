// RecipeForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeForm = ({ addNewRecipe }) => {
  const [newRecipe, setNewRecipe] = useState({
    strMeal: '',
    strCategory: '',
    strInstructions: '',
    strMealThumb: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new recipe using the function passed via props
    addNewRecipe(newRecipe);

    // Reset form fields
    setNewRecipe({
      strMeal: '',
      strCategory: '',
      strInstructions: '',
      strMealThumb: ''
    });

    // Redirect to the home page
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({
      ...newRecipe,
      [name]: value
    });
  };

  return (
    <div className="recipe-form mt-6 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Recipe Name:
          <input
            type="text"
            name="strMeal"
            value={newRecipe.strMeal}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Category:
          <input
            type="text"
            name="strCategory"
            value={newRecipe.strCategory}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Instructions:
          <textarea
            name="strInstructions"
            value={newRecipe.strInstructions}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1 w-full"
          />
        </label>

        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            name="strMealThumb"
            value={newRecipe.strMealThumb}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </label>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
