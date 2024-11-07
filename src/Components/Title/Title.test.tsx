// Title.test.tsx
import { render, screen } from '@testing-library/react';
import Title from './Title';
import '@testing-library/jest-dom';

describe('Title Component', () => {
  it('should render the title text', () => {
    render(<Title>Test Title</Title>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
