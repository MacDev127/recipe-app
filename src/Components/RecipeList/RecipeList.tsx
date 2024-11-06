import React from 'react';
import RecipeAccordion from '../RecipeAccoridan/RecipeAccoridan';

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
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (recipe: Recipe | null) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  filteredRecipes,
  selectedRecipe,
  setSelectedRecipe,
}) => (
  <div className="recipe-list">
    <h2>Recipes</h2>
    <div className="recipe-results">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeAccordion
            key={recipe.idMeal}
            recipe={recipe}
            onSelect={setSelectedRecipe}
          />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  </div>
);

export default RecipeList;
