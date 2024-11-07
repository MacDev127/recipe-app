import React from 'react';
import RecipeAccordion from '../RecipeAccoridan/RecipeAccoridan';
import './RecipeList.css';
import Title from '../Title/Title';
import { RecipeListProps } from './recipeListTypes';

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

      {filteredRecipes.length === 0 && hasSearched && (
        <p className="recipe__list-error">No recipes found</p>
      )}
    </div>
  </div>
);

export default RecipeList;
