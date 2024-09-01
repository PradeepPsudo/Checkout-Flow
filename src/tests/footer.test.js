import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/Common/Footer';

describe('Footer Component', () => {
  test('renders Footer component with correct text', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const footerText = `© ${currentYear} My React App. All rights reserved.`;

    expect(screen.getByText(footerText)).toBeInTheDocument();
  });

  test('Footer component has correct styles', () => {
    render(<Footer />);

    const boxElement = screen.getByText(/My React App/i).closest('div');
    expect(boxElement).toHaveStyle('background-color: #e0f7fa');
    expect(boxElement).toHaveStyle('color: #00796b');
    expect(boxElement).toHaveStyle('padding-top: 16px'); // py: 2 translates to 16px
    expect(boxElement).toHaveStyle('padding-bottom: 16px'); // py: 2 translates to 16px
    expect(boxElement).toHaveStyle('margin-top: auto');
  });
});