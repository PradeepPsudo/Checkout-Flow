import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useProductCheckoutContext } from '../Context/ProductsContext';
import PaymentForm from '../components/Creditcard/index';
import CustomizedDialogs from '../components/PaymentDialog/index';

// Mock the context and PaymentForm component
jest.mock('../Context/ProductsContext');
jest.mock('../components/Creditcard/index'); // Ensure the correct path is used

const mockSetPaymentMethod = jest.fn();
const mockSetLaunchDialog = jest.fn();
const mockHandleNext = jest.fn();

const mockContextValue = {
  setPaymentMethod: mockSetPaymentMethod,
};

beforeEach(() => {
  useProductCheckoutContext.mockReturnValue(mockContextValue);
  PaymentForm.mockImplementation(({ setDisabledPlaceOrder, onDone }) => (
    <div>
      <input
        placeholder="Cardholder Name"
        onChange={(e) => onDone({ cardName: e.target.value })}
      />
    </div>
  ));
});

describe('CustomizedDialogs Component', () => {
  test('renders CustomizedDialogs component', () => {
    render(
      <CustomizedDialogs handleNext={mockHandleNext} setLaunchDialog={mockSetLaunchDialog} />
    );

    expect(screen.getByText('Enter Payment Details')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cardholder Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Place Order/i })).toBeInTheDocument();
  });

  test('closes dialog when close button is clicked', () => {
    render(
      <CustomizedDialogs handleNext={mockHandleNext} setLaunchDialog={mockSetLaunchDialog} />
    );

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(mockSetLaunchDialog).toHaveBeenCalledWith(false);
  });

  test('calls setPaymentMethod when onDone is triggered', () => {
    render(
      <CustomizedDialogs handleNext={mockHandleNext} setLaunchDialog={mockSetLaunchDialog} />
    );

    const cardNameInput = screen.getByPlaceholderText('Cardholder Name');
    fireEvent.change(cardNameInput, { target: { value: 'John Doe' } });

    expect(mockSetPaymentMethod).toHaveBeenCalledWith({ cardName: 'John Doe' });
  });

  test('disables Place Order button initially', () => {
    render(
      <CustomizedDialogs handleNext={mockHandleNext} setLaunchDialog={mockSetLaunchDialog} />
    );

    const placeOrderButton = screen.getByRole('button', { name: /Place Order/i });
    expect(placeOrderButton).toBeDisabled();
  });

  test('enables Place Order button when setDisabledPlaceOrder is called with false', () => {
    PaymentForm.mockImplementation(({ setDisabledPlaceOrder, onDone }) => {
      setDisabledPlaceOrder(false);
      return <div />;
    });

    render(
      <CustomizedDialogs handleNext={mockHandleNext} setLaunchDialog={mockSetLaunchDialog} />
    );

    const placeOrderButton = screen.getByRole('button', { name: /Place Order/i });
    expect(placeOrderButton).toBeEnabled();
  });


});