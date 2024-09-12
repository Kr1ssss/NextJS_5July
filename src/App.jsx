// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import Layout from './components/Layout';  // Import the new Layout component
import axios from 'axios';
import './index.css'; 
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  // Fetch recipes from the MealDB API
  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => setRecipes(response.data.meals || []))
      .catch(err => {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      });
  }, []);

  // Function to add a new recipe to the state
  const addNewRecipe = (newRecipe) => {
    const newRecipeWithId = {
      ...newRecipe,
      idMeal: Math.random().toString(36).substr(2, 9)
    };
    setRecipes([...recipes, newRecipeWithId]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><RecipeList recipes={recipes} error={error} /></Layout>} />
        <Route path="/add-recipe" element={<Layout><RecipeForm addNewRecipe={addNewRecipe} /></Layout>} />
        <Route path="/recipe/:id" element={<Layout><RecipeDetail /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
