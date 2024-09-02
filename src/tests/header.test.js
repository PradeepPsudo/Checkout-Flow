import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Common/Header';

describe('Header Component', () => {
  test('renders Header component with correct text', () => {
    render(<Header />);

    expect(screen.getByText('Complete Your Checkout Adventure')).toBeInTheDocument();
  });

  test('Header component has correct styles', () => {
    render(<Header />);

    const appBarElement = screen.getByRole('banner');
    expect(appBarElement).toHaveStyle('background-color: rgb(57, 58, 61)');

    const boxElement = screen.getByText('Complete Your Checkout Adventure').closest('div');
    expect(boxElement).toHaveStyle('color: white');
  });
});