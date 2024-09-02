import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddressPage from '../components/BillingAddress/index';
import { useProductCheckoutContext } from '../Context/ProductsContext';

// Mock the context
jest.mock('../Context/ProductsContext');

// Mock the child components
jest.mock('../components/BillingAddress/RenderBillingAddress', () => jest.fn(() => <div>RenderBillingAddress</div>));
jest.mock('../components/BillingAddress/DisplayAddressCard', () => jest.fn(() => <div>DisplayAddressCard</div>));

const mockUseProductCheckoutContext = {
  addressContext: { id: 1, isPrimary: true },
  addressList: [{ id: 1, isPrimary: true }, { id: 2, isPrimary: false }],
  setCurrentAddressId: jest.fn(),
  setAddressList: jest.fn(),
  currentAddressId: 1,
};

beforeEach(() => {
  useProductCheckoutContext.mockReturnValue(mockUseProductCheckoutContext);
});

describe('AddressPage Component', () => {
  test('switches back to list view when "Select Address" is clicked', () => {
    render(<AddressPage />);
    fireEvent.click(screen.getByText('Add New Address'));
    fireEvent.click(screen.getByText('Select Address'));
  });

  test('renders AddressPage component', () => {
    render(<AddressPage />);
    expect(screen.getByText('Select Address')).toBeInTheDocument();
    expect(screen.getByText('Add New Address')).toBeInTheDocument();
  });
});