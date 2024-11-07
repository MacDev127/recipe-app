import { useState, useEffect } from 'react';
import axios from 'axios';
import Ingredients from '../../Components/Ingredients/IngredientSelection';
import RecipeList from '../../Components/RecipeList/RecipeList';
import MealSpec from '../../Components/MealSpec/MealSpec';
import './Home.css';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import dropdownOptions from '../../Components/Ingredients/dropdownOptions';
import { Recipe } from './homeTypes'; // Import the Recipe type

const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // State to control button visibility

  // Fetch recipes based on selected ingredients
  useEffect(() => {
    const fetchRecipes = async () => {
      if (selectedIngredients.length === 0) return;

      try {
        const ingredientsQuery = selectedIngredients.join(',');
        const URL = `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredientsQuery}`;
        const response = await axios.get(URL);
        const fetchedRecipes = response.data.meals || [];

        // Fetch detailed information for each recipe
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

  // Handle selection of ingredients
  const handleIngredientSelect = (newIngredients: string[]) => {
    setSelectedIngredients(newIngredients);
  };

  // Handle search to filter recipes based on selected ingredients
  const handleSearchRecipes = () => {
    setIsSearching(true); // Hide the button when search is initiated
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

  // Reset search state
  const handleReset = () => {
    setSelectedIngredients([]);
    setFilteredRecipes([]);
    setHasSearched(false);
    setIsSearching(false); // Show the search button again
  };

  return (
    <div className="home">
      <div className="home__hero">
        <img src="../../../public/images/logo3.png" alt="Recipe App Logo" />
      </div>
      <CategorySlider />
      <MealSpec />
      <Ingredients
        selectedIngredients={selectedIngredients}
        handleIngredientSelect={handleIngredientSelect}
        dropdownOptions={dropdownOptions}
        isSearchTriggered={hasSearched}
      />
      {!isSearching && (
        <button className="home__search-btn" onClick={handleSearchRecipes}>
          Search Recipes
        </button>
      )}
      {hasSearched && (
        <RecipeList
          filteredRecipes={filteredRecipes}
          hasSearched={hasSearched}
        />
      )}
      {hasSearched && ( // Show the reset button only if a search has been made
        <button className="home__reset-btn" onClick={handleReset}>
          Reset Search
        </button>
      )}
    </div>
  );
};

export default Home;
