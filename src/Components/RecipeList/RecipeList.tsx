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
  hasSearched: boolean; // Indicates if a search was performed
}

const RecipeList: React.FC<RecipeListProps> = ({
  filteredRecipes,
  hasSearched = false,
}) => (
  <div className="recipe__list">
    {/* Only show the Title if there are recipes */}
    {filteredRecipes.length > 0 && <Title>Recipe</Title>}

    <div className="recipe__list-result">
      {filteredRecipes.map((recipe) => (
        <RecipeAccordion key={recipe.idMeal} recipe={recipe} />
      ))}

      {/* Show "No recipes found" message if no recipes are returned and a search was performed */}
      {filteredRecipes.length === 0 && hasSearched && <p>No recipes found.</p>}
    </div>
  </div>
);

export default RecipeList;
