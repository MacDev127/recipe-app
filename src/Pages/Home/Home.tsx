import { useState, useEffect } from 'react';
import axios from 'axios';
import Ingredients from '../../Components/Ingredients/IngredientSelection';
import RecipeList from '../../Components/RecipeList/RecipeList';
import MealSpec from '../../Components/MealSpec/MealSpec';
import './Home.css';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import dropdownOptions from '../../Components/Ingredients/dropdownOptions';
import { Recipe } from './homeTypes';

const Home = () => {
  // State for ingredient selection, recipes, filtered recipes, and search control
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Fetches recipes based on selected ingredients
  useEffect(() => {
    if (selectedIngredients.length === 0) return;

    const fetchRecipes = async () => {
      try {
        const ingredientsQuery = selectedIngredients.join(',');
        const URL = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredientsQuery}`;
        const response = await axios.get(URL);
        const fetchedRecipes = response.data.meals || [];

        // Fetch details for each recipe
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
  }, [selectedIngredients]);

  // Updates the selected ingredients
  const handleIngredientSelect = (newIngredients: string[]) => {
    setSelectedIngredients(newIngredients);
  };

  // Filters recipes based on selected ingredients
  const handleSearchRecipes = () => {
    setIsSearching(true);
    setHasSearched(true);

    const refinedRecipes = recipes.filter((recipe) => {
      const recipeIngredients = Object.keys(recipe)
        .filter((key) => key.startsWith('strIngredient') && recipe[key])
        .map((key) => recipe[key].toLowerCase());

      return selectedIngredients.every((ingredient) =>
        recipeIngredients.includes(ingredient.toLowerCase())
      );
    });

    setFilteredRecipes(refinedRecipes);
  };

  // Resets search state and reloads the page
  const handleReset = () => {
    setSelectedIngredients([]);
    setFilteredRecipes([]);
    setHasSearched(false);
    setIsSearching(false);
    window.location.reload();
  };

  return (
    <div className="home">
      <div className="home__hero">
        <img src="/images/logo3.png" alt="Recipe App Logo" />
      </div>

      {/* Category slider component */}
      <CategorySlider />

      {/* Meal specification component */}
      <MealSpec />

      {/* Ingredient selection component */}
      <Ingredients
        selectedIngredients={selectedIngredients}
        handleIngredientSelect={handleIngredientSelect}
        dropdownOptions={dropdownOptions}
        isSearchTriggered={hasSearched}
      />

      {/* Search Button */}
      {!isSearching && (
        <button className="home__search-btn" onClick={handleSearchRecipes}>
          Search Recipes
        </button>
      )}

      {/* Recipe List */}
      {hasSearched && (
        <RecipeList
          filteredRecipes={filteredRecipes}
          hasSearched={hasSearched}
        />
      )}

      {/* Reset Button */}
      {hasSearched && (
        <button className="home__reset-btn" onClick={handleReset}>
          Reset Search
        </button>
      )}
    </div>
  );
};

export default Home;
