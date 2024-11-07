// Dropdown.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';
import '@testing-library/jest-dom';

describe('Dropdown Component', () => {
  const mockOptions = [
    { idIngredient: '1', strIngredient: 'Apple' },
    { idIngredient: '2', strIngredient: 'Banana' },
  ];
  const mockOnChange = jest.fn();

  test('renders dropdown label and placeholder', () => {
    render(
      <Dropdown
        label="Select Fruit"
        options={mockOptions}
        onChange={mockOnChange}
        placeholder="Select an option"
      />
    );

    // Check that the label and placeholder are rendered
    expect(screen.getByText('Select Fruit')).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });
});
