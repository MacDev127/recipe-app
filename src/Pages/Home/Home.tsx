import { useState, useEffect } from 'react';
import axios from 'axios';
import Ingredients from '../../Components/Ingredients/IngredientSelection';
import RecipeList from '../../Components/RecipeList/RecipeList';
import MealSpec from '../../Components/MealSpec/MealSpec';
import './Home.css';

import dropdownOptions from '../../Components/Ingredients/dropdownOptions';

//orginal

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  [key: string]: any;
}

const Home = () => {
  const [mainIngredient, setMainIngredient] = useState<string | null>(null);
  const [additionalIngredients, setAdditionalIngredients] = useState<string[]>(
    []
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  const [mealCategory, setMealCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState([]); // For meal categories

  // Fetch categories on component load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      if (!mealCategory) return;
      console.log('mealCategory before API call:', mealCategory);

      try {
        // Fetch recipes based on the selected category
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`
        );

        const fetchedRecipes = response.data.meals || [];
        console.log('API response:', response.data);

        // Set recipes to display the results directly without further filtering
        setRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes); // Set initial filtered list to fetched recipes
        console.log('Fetched recipes by category:', fetchedRecipes); // Debug log
      } catch (error) {
        console.error('Error fetching recipes by category:', error);
      }
    };

    fetchRecipesByCategory();
  }, [mealCategory]); // Only depends on mealCategory

  //fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      if (!mainIngredient) return;
      const URL = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${mainIngredient}`;
      try {
        const response = await axios.get(URL);
        const fetchedRecipes = response.data.meals || [];
        const detailedRecipes = await Promise.all(
          fetchedRecipes.map(async (recipe: Recipe) => {
            const recipeDetails = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
            );
            return recipeDetails.data.meals[0];
          })
        );
        setRecipes(detailedRecipes);
        setFilteredRecipes(detailedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, [mainIngredient]);

  useEffect(() => {
    if (additionalIngredients.length === 0) {
      setFilteredRecipes(recipes);
      return;
    }
    const refinedRecipes = recipes.filter((recipe) => {
      const recipeIngredients = Object.keys(recipe)
        .filter((key) => key.startsWith('strIngredient') && recipe[key])
        .map((key) => recipe[key].toLowerCase());
      return additionalIngredients.every((ingredient) =>
        recipeIngredients.includes(ingredient.toLowerCase())
      );
    });
    setFilteredRecipes(refinedRecipes);
  }, [additionalIngredients, recipes]);

  const handleMainIngredientChange = (ingredientName: string) => {
    setMainIngredient(ingredientName);
    setAdditionalIngredients([]);
  };

  const toggleAdditionalIngredient = (ingredientName: string) => {
    setAdditionalIngredients((prevSelected) =>
      prevSelected.includes(ingredientName)
        ? prevSelected.filter((item) => item !== ingredientName)
        : [...prevSelected, ingredientName]
    );
  };

  return (
    <div className="home">
      <div className="hero">
        <img src="../../../public/images/logo3.png" alt="" />
      </div>
      <MealSpec
        setMealCategory={setMealCategory}
        categories={categories} // Pass categories to MealSpec
      />
      <Ingredients
        mainIngredient={mainIngredient}
        additionalIngredients={additionalIngredients}
        handleMainIngredientChange={handleMainIngredientChange}
        toggleAdditionalIngredient={toggleAdditionalIngredient}
        dropdownOptions={dropdownOptions}
      />
      <RecipeList filteredRecipes={filteredRecipes} />
    </div>
  );
};

export default Home;
