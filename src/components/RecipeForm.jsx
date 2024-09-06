import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const [newRecipe, setNewRecipe] = useState({
    strMeal: '',
    strCategory: '',
    strInstructions: '',
    strMealThumb: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    console.log("Recipe submitted:", newRecipe);

    setTimeout(() => {
      navigate('/'); 
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({
      ...newRecipe,
      [name]: value
    });
  };

  return (
    <div className="recipe-form">
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="strMeal"
            value={newRecipe.strMeal}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="strCategory"
            value={newRecipe.strCategory}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Instructions:
          <textarea
            name="strInstructions"
            value={newRecipe.strInstructions}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="strMealThumb"
            value={newRecipe.strMealThumb}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
