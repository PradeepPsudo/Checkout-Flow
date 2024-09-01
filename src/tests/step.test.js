import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useProductCheckoutContext } from '../Context/ProductsContext';
import ProductListDisplay from '../components/ProductListDisplay';
import AddressPage from '../components/BillingAddress/index';
import CartPage from '../components/CheckoutPage/index';
import CustomizedDialogs from '../components/PaymentDialog/index';
import OrderSummary from '../components/OrderSummary/index';
import StepFlow from '../components/Step';

// Mock the context
jest.mock('../Context/ProductsContext');

// Mock the child components
jest.mock('../components/ProductListDisplay', () => jest.fn(() => <div>ProductListDisplay</div>));
jest.mock('../components/BillingAddress/index', () => jest.fn(() => <div>AddressPage</div>));
jest.mock('../components/CheckoutPage/index', () => jest.fn(() => <div>CartPage</div>));
jest.mock('../components/PaymentDialog/index', () => jest.fn(() => <div>CustomizedDialogs</div>));
jest.mock('../components/OrderSummary/index', () => jest.fn(() => <div>OrderSummary</div>));

const mockUseProductCheckoutContext = {
  selectedProducts: [],
  setSelectedProducts: jest.fn(),
  setSlectedProductIds: jest.fn(),
  setProductQuantity: jest.fn(),
};

beforeEach(() => {
  useProductCheckoutContext.mockReturnValue(mockUseProductCheckoutContext);
});

describe('StepFlow Component', () => {
  const props = {
    ProductList: { products: [] },
    classifiedProductsList: {
      standAloneProducts: [],
      bundledProducts: [],
      recommendedProducts: []
    }
  };

  test('renders StepFlow component and checks initial state', () => {
    render(<StepFlow {...props} />);

    expect(screen.getByText('Select Products')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('navigates to the next step', () => {
    render(<StepFlow {...props} />);

    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Provide Address')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('navigates to the final step and opens dialog', () => {
    render(<StepFlow {...props} />);

    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Place order')).toBeInTheDocument();
  });

  test('resets the stepper', () => {
    render(<StepFlow {...props} />);

    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));


    expect(screen.getByText('Select Products')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });



  test('enables the Next button when products are selected', () => {
    mockUseProductCheckoutContext.selectedProducts = [{ productId: 1 }];
    render(<StepFlow {...props} />);

    expect(screen.getByText('Next')).not.toBeDisabled();
  });
});