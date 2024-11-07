import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import MealSpec from './MealSpec';

describe('MealSpec Component', () => {
  it('renders the dropdown labels', () => {
    render(<MealSpec />);

    // Check for dropdown labels
    expect(screen.getByLabelText(/Meal Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of People/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cooking Time/i)).toBeInTheDocument();
  });
});
