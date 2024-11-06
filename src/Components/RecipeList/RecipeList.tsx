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
}

const RecipeList: React.FC<RecipeListProps> = ({ filteredRecipes }) => (
  <div className="recipe__list">
    <Title>Recipe</Title>
    <div className="recipe__list-result">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeAccordion key={recipe.idMeal} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  </div>
);

export default RecipeList;
