import React from 'react';

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
          <div
            key={recipe.idMeal}
            className="recipe-item"
            onClick={() => setSelectedRecipe(recipe)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
    {selectedRecipe && (
      <div className="recipe-details">
        <h2>{selectedRecipe.strMeal}</h2>
        <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
        <p>
          <strong>Category:</strong> {selectedRecipe.strCategory}
        </p>
        <p>
          <strong>Area:</strong> {selectedRecipe.strArea}
        </p>
        <p>
          <strong>Instructions:</strong> {selectedRecipe.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
          {Object.keys(selectedRecipe)
            .filter(
              (key) => key.startsWith('strIngredient') && selectedRecipe[key]
            )
            .map((key, index) => (
              <li key={index}>
                {selectedRecipe[key]} -{' '}
                {selectedRecipe[`strMeasure${index + 1}`]}
              </li>
            ))}
        </ul>
        <button onClick={() => setSelectedRecipe(null)}>Close</button>
      </div>
    )}
  </div>
);

export default RecipeList;
