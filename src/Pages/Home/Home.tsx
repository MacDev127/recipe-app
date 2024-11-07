import { useState, useEffect } from 'react';
import axios from 'axios';
import Ingredients from '../../Components/Ingredients/IngredientSelection';
import RecipeList from '../../Components/RecipeList/RecipeList';
import MealSpec from '../../Components/MealSpec/MealSpec';
import './Home.css';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';

import dropdownOptions from '../../Components/Ingredients/dropdownOptions';

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
  const [categories, setCategories] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

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

      try {
        // Fetch recipes based on the selected category
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`
        );

        const fetchedRecipes = response.data.meals || [];
        setRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes by category:', error);
      }
    };

    fetchRecipesByCategory();
  }, [mealCategory]);

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

  const handleSearchRecipes = () => {
    setHasSearched(true);
    setIsSearchTriggered(true);

    if (additionalIngredients.length === 0) {
      setFilteredRecipes(recipes);
      return;
    }

    const refinedRecipes = recipes.filter((recipe) => {
      const recipeIngredients = Object.keys(recipe)
        .filter((key) => key.startsWith('strIngredient') && recipe[key])
        .map((key) => recipe[key].toLowerCase());

      return [mainIngredient, ...additionalIngredients].every((ingredient) =>
        ingredient ? recipeIngredients.includes(ingredient.toLowerCase()) : true
      );
    });

    setFilteredRecipes(refinedRecipes);
  };

  return (
    <div className="home">
      <div className="home__hero">
        <img src="../../../public/images/logo3.png" alt="" />
      </div>
      <CategorySlider />
      <MealSpec setMealCategory={setMealCategory} categories={categories} />
      <Ingredients
        mainIngredient={mainIngredient}
        additionalIngredients={additionalIngredients}
        handleMainIngredientChange={handleMainIngredientChange}
        toggleAdditionalIngredient={toggleAdditionalIngredient}
        dropdownOptions={dropdownOptions}
        isSearchTriggered={isSearchTriggered} // Pass the state here
      />
      <button className="home__search-btn" onClick={handleSearchRecipes}>
        Search Recipes
      </button>
      {hasSearched && (
        <RecipeList
          filteredRecipes={filteredRecipes}
          hasSearched={hasSearched}
        />
      )}
    </div>
  );
};

export default Home;
