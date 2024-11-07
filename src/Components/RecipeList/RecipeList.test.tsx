// RecipeList.test.tsx
import { render, screen } from '@testing-library/react';
import RecipeList from './RecipeList';
import { RecipeListProps } from './recipeListTypes';
import '@testing-library/jest-dom';

describe('RecipeList Component', () => {
  const mockPropsWithRecipes: RecipeListProps = {
    filteredRecipes: [
      { idMeal: '1', strMeal: 'Recipe 1', strMealThumb: 'image1.jpg' },
      { idMeal: '2', strMeal: 'Recipe 2', strMealThumb: 'image2.jpg' },
    ],
    hasSearched: true,
  };

  const mockPropsNoRecipes: RecipeListProps = {
    filteredRecipes: [],
    hasSearched: true,
  };

  it('should display the title "Recipe" when there are filtered recipes', () => {
    render(<RecipeList {...mockPropsWithRecipes} />);
    expect(screen.getByText('Recipe')).toBeInTheDocument();
  });

  it('should display "No recipes found." when there are no filtered recipes and hasSearched is true', () => {
    render(<RecipeList {...mockPropsNoRecipes} />);
    expect(screen.getByText(/No recipes found/i)).toBeInTheDocument();
  });
});
