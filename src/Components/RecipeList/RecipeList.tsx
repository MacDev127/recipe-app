import React from 'react';
import RecipeAccordion from '../RecipeAccoridan/RecipeAccoridan';
import './RecipeList.css';
import Title from '../Title/Title';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  [key: string]: any;
}

interface RecipeListProps {
  filteredRecipes: Recipe[];
  hasSearched: boolean;
}
const handleReset = () => {
  window.location.reload();
};
const RecipeList: React.FC<RecipeListProps> = ({
  filteredRecipes,
  hasSearched,
}) => (
  <div className="recipe__list">
    {filteredRecipes.length > 0 && <Title>Recipe</Title>}

    <div className="recipe__list-result">
      {filteredRecipes.map((recipe) => (
        <RecipeAccordion key={recipe.idMeal} recipe={recipe} />
      ))}

      {filteredRecipes.length === 0 && hasSearched && <p>No recipes found.</p>}
    </div>
    <button className="recipe__list-reset" onClick={handleReset}>
      Reset Search
    </button>
  </div>
);

export default RecipeList;
