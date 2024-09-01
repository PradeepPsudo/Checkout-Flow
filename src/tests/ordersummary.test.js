import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { calculateBillingAmount } from '../utils/productsUtils';
import OrderSummary from '../components/OrderSummary';
import { useProductCheckoutContext } from '../Context/ProductsContext';

// Mock the context and utility function
jest.mock('../Context/ProductsContext');
jest.mock('../utils/productsUtils');

describe('OrderSummary Component', () => {
  const mockContextValue = {
    selectedProducts: [
      {
        pricingDetails: {
          totalAmount: { value: 100 },
          discountedPrice: { value: 20 }
        },
        productDetails: {
          name: 'Product 1',
          productId: '1'
        }
      }
    ],
    paymentMethod: {
      cardType: 'Visa',
      cardNumber: '1234567812345678'
    },
    addressContext: {
      city: 'City',
      state: 'State',
      country: 'Country'
    },
    productQuantity: {
      '1': 2
    }
  };

  const mockBillingAmount = {
    totalAmount: 200,
    totalDiscount: 40
  };

  beforeEach(() => {
    useProductCheckoutContext.mockReturnValue(mockContextValue);
    calculateBillingAmount.mockReturnValue(mockBillingAmount);
  });

  test('renders OrderSummary component with correct text', () => {
    render(<OrderSummary />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Order Number:')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('Items:')).toBeInTheDocument();
    expect(screen.getByText('Total Price:')).toBeInTheDocument();
    expect(screen.getByText('Shipping Address:')).toBeInTheDocument();
    expect(screen.getByText('Payment Method:')).toBeInTheDocument();
  });

  test('displays order details correctly', () => {
    render(<OrderSummary />);

    expect(screen.getByText('Product 1 x 2 - $160')).toBeInTheDocument();
    expect(screen.getByText('$160')).toBeInTheDocument();
    expect(screen.getByText('Visa **5678')).toBeInTheDocument();
  });

  test('displays CongratulationsModal when open is true', () => {
    render(<OrderSummary />);

    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('Your order has been placed successfully.')).toBeInTheDocument();
  });

  test('closes CongratulationsModal when close button is clicked', () => {
    render(<OrderSummary />);

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument();
  });
});