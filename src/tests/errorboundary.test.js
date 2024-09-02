import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorBoundary from '../ErrorBoundary/index';

describe('ErrorBoundary Component', () => {
  test('renders children when no error is caught', () => {
    const ChildComponent = () => <div>Child Component</div>;

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('displays error message when an error is caught', () => {
    const ProblematicComponent = () => {
      throw new Error('Test error');
    };

    // Suppress error logging for this test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong. Please try again later.')).toBeInTheDocument();

    // Restore console error logging
    consoleError.mockRestore();
  });
});