import { useState, useEffect } from 'react';
import axios from 'axios';
import Ingredients from '../../Components/Ingredients/IngredientSelection';
import RecipeList from '../../Components/RecipeList/RecipeList';
import './Home.css';
import {
  vegetableKeywords,
  meatKeywords,
  fruitKeywords,
  dairyKeywords,
  grainsAndLegumesKeywords,
  condimentsAndSpicesKeywords,
  oilsAndFatsKeywords,
  fishAndSeafoodKeywords,
  sweetenersAndSugarsKeywords,
  miscellaneousKeywords,
} from '../../Components/Ingredients/ingredientKeywords';

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
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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

  const filterByKeywords = (keywords: string[]) =>
    keywords.map((keyword) => ({
      idIngredient: keyword,
      strIngredient: keyword,
    }));

  const dropdownOptions = [
    {
      label: 'Fruits',
      options: filterByKeywords(fruitKeywords),
      placeholder: 'Select a fruit',
    },
    {
      label: 'Vegetables',
      options: filterByKeywords(vegetableKeywords),
      placeholder: 'Select a vegetable',
    },
    {
      label: 'Meat',
      options: filterByKeywords(meatKeywords),
      placeholder: 'Select Meat',
    },
    {
      label: 'Dairy',
      options: filterByKeywords(dairyKeywords),
      placeholder: 'Select Dairy',
    },
    {
      label: 'Oils & Fats',
      options: filterByKeywords(oilsAndFatsKeywords),
      placeholder: 'Select Oils & Fats',
    },
    {
      label: 'Grains',
      options: filterByKeywords(grainsAndLegumesKeywords),
      placeholder: 'Select Grains',
    },
    {
      label: 'Spices & Condiments',
      options: filterByKeywords(condimentsAndSpicesKeywords),
      placeholder: 'Select Spices & Condiments',
    },
    {
      label: 'Sugars & Sweeteners',
      options: filterByKeywords(sweetenersAndSugarsKeywords),
      placeholder: 'Select Sugars & Sweeteners',
    },
    {
      label: 'Seafood',
      options: filterByKeywords(fishAndSeafoodKeywords),
      placeholder: 'Select Seafood',
    },
    {
      label: 'Miscellaneous',
      options: filterByKeywords(miscellaneousKeywords),
      placeholder: 'Select Miscellaneous',
    },
  ];

  return (
    <div className="home">
      <div className="hero">
        <img src="../../../public/images/logo3.png" alt="" />
      </div>
      <Ingredients
        mainIngredient={mainIngredient}
        additionalIngredients={additionalIngredients}
        handleMainIngredientChange={handleMainIngredientChange}
        toggleAdditionalIngredient={toggleAdditionalIngredient}
        dropdownOptions={dropdownOptions}
      />
      <RecipeList
        filteredRecipes={filteredRecipes}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
      />
    </div>
  );
};

export default Home;
