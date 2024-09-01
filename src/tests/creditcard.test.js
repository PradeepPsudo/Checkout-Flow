import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import useForm from '../components/Creditcard/UseForm';
import CreditCardForm from '../components/Creditcard';

// Mock the useForm hook
jest.mock('../components/Creditcard/UseForm');

const mockSetDisabledPlaceOrder = jest.fn();
const mockOnDone = jest.fn();

const mockUseForm = {
  handleChange: jest.fn(),
  handleFocus: jest.fn(),
  handleSubmit: jest.fn((e) => e.preventDefault()),
  values: {
    cardName: '',
    cardNumber: '',
    cardType: '',
    cardExpiration: '',
    cardSecurityCode: '',
    cardPostalCode: '',
    focus: ''
  },
  errors: {}
};

beforeEach(() => {
  useForm.mockReturnValue(mockUseForm);
});

describe('CreditCardForm Component', () => {
  test('renders CreditCardForm component', () => {
    render(<CreditCardForm setDisabledPlaceOrder={mockSetDisabledPlaceOrder} onDone={mockOnDone} />);

    expect(screen.getByPlaceholderText('Cardholder Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Card Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Card Type')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Expiration Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Security Code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Postal Code')).toBeInTheDocument();
    expect(screen.getByText('Validate')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<CreditCardForm setDisabledPlaceOrder={mockSetDisabledPlaceOrder} onDone={mockOnDone} />);

    const cardNameInput = screen.getByPlaceholderText('Cardholder Name');
    fireEvent.change(cardNameInput, { target: { name: 'cardName', value: 'John Doe' } });

    expect(mockUseForm.handleChange).toHaveBeenCalled();
  });

  test('handles form submission', () => {
    render(<CreditCardForm setDisabledPlaceOrder={mockSetDisabledPlaceOrder} onDone={mockOnDone} />);

    const validateButton = screen.getByText('Validate');
    fireEvent.click(validateButton);

    expect(mockUseForm.handleSubmit).toHaveBeenCalled();
  });

  test('displays error messages', () => {
    const mockErrors = {
      cname: false,
      cnumber: false,
      ctype: false,
      cexp: false,
      ccvv: false,
      cpostal: false,
      variant: 'danger',
      show: true,
      message: 'Invalid card details'
    };

    useForm.mockReturnValue({ ...mockUseForm, errors: mockErrors });

    render(<CreditCardForm setDisabledPlaceOrder={mockSetDisabledPlaceOrder} onDone={mockOnDone} />);

    expect(screen.getByTestId('alertMessage')).toBeInTheDocument();
    expect(screen.getByText('Invalid card details')).toBeInTheDocument();
  });
});