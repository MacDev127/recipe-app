// IngredientSelection.test.tsx
import { render, screen } from '@testing-library/react';
import IngredientSelection from './IngredientSelection';
import { IngredientSelectionProps } from './ingredientTypes';
import '@testing-library/jest-dom';

describe('IngredientSelection Component', () => {
  const mockProps: IngredientSelectionProps = {
    selectedIngredients: [],
    handleIngredientSelect: jest.fn(),
    dropdownOptions: [
      {
        label: 'Fruits',
        options: [
          { idIngredient: '1', strIngredient: 'Apple' },
          { idIngredient: '2', strIngredient: 'Banana' },
        ],
        placeholder: 'Select a fruit',
      },
      {
        label: 'Vegetables',
        options: [
          { idIngredient: '3', strIngredient: 'Carrot' },
          { idIngredient: '4', strIngredient: 'Broccoli' },
        ],
        placeholder: 'Select a vegetable',
      },
    ],
    isSearchTriggered: false,
  };

  it('should display the title "Select Ingredients"', () => {
    render(<IngredientSelection {...mockProps} />);
    expect(screen.getByText(/Select Ingredients/i)).toBeInTheDocument();
  });

  it('should render the dropdown labels', () => {
    render(<IngredientSelection {...mockProps} />);
    expect(screen.getByText(/Fruits/i)).toBeInTheDocument();
    expect(screen.getByText(/Vegetables/i)).toBeInTheDocument();
  });

  it('should not display the component if search is triggered', () => {
    render(<IngredientSelection {...mockProps} isSearchTriggered={true} />);
    expect(screen.queryByText(/Select Ingredients/i)).not.toBeInTheDocument();
  });
});
