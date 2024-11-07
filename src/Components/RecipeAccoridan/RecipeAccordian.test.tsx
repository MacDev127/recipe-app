// RecipeAccordion.test.tsx
import { render, screen } from '@testing-library/react';
import RecipeAccordion from './RecipeAccoridan';
import { RecipeAccordionProps } from './recipeAccrodianTypes';
import '@testing-library/jest-dom';

describe('RecipeAccordion Component', () => {
  const mockRecipe: RecipeAccordionProps['recipe'] = {
    idMeal: '1',
    strMeal: 'Test Recipe',
    strMealThumb: 'test-image.jpg',
    strCategory: 'Test Category',
    strInstructions: 'Test instructions for the recipe.',
    strIngredient1: 'Ingredient 1',
    strMeasure1: '1 cup',
    strIngredient2: 'Ingredient 2',
    strMeasure2: '2 tbsp',
    // Add more ingredients if needed for testing purposes
  };

  it('should render the recipe image and title', () => {
    render(<RecipeAccordion recipe={mockRecipe} />);
    expect(screen.getByAltText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
  });

  it('should render the category and instructions', () => {
    render(<RecipeAccordion recipe={mockRecipe} />);
    expect(screen.getByText(/Category:/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Instructions:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Test instructions for the recipe./i)
    ).toBeInTheDocument();
  });

  it('should render the ingredients with measurements', () => {
    render(<RecipeAccordion recipe={mockRecipe} />);
    expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
    expect(screen.getByText('1 cup')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
    expect(screen.getByText('2 tbsp')).toBeInTheDocument();
  });
});
