import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductListDisplay from '../components/ProductListDisplay';
import { useProductCheckoutContext } from '../Context/ProductsContext';
import { PRODUCT_CLASSIFICATION } from '../constants';

// Mock the context
jest.mock('../Context/ProductsContext');

const mockUseProductCheckoutContext = {
  selectedProducts: [],
  setSelectedProducts: jest.fn(),
  setSlectedProductIds: jest.fn(),
  setProductQuantity: jest.fn(),
};

beforeEach(() => {
  useProductCheckoutContext.mockReturnValue(mockUseProductCheckoutContext);
});

const classifiedProductsList = {
  standAloneProducts: [
    {
      productDetails: { productId: '1', name: 'Product 1', description: 'Description 1', depth: 0 },
      pricingDetails: { baseAmount: { currency: 'USD', value: 100 }, totalAmount: { currency: 'USD', value: 100 } },
    },
  ],
  bundledProducts: [
    {
      productDetails: { productId: '2', name: 'Product 2', description: 'Description 2', depth: 0 },
      pricingDetails: { baseAmount: { currency: 'USD', value: 200 }, totalAmount: { currency: 'USD', value: 200 } },
      childItems: [
        {
          productDetails: { productId: '3', name: 'Child Product 1', description: 'Child Description 1', depth: 1 },
          pricingDetails: { baseAmount: { currency: 'USD', value: 50 }, totalAmount: { currency: 'USD', value: 50 } },
          childItems: [],
        },
      ],
    },
  ],
  recommendedProducts: [
    {
      productDetails: { productId: '4', name: 'Product 3', description: 'Description 3', depth: 0 },
      pricingDetails: { baseAmount: { currency: 'USD', value: 150 }, totalAmount: { currency: 'USD', value: 150 } },
    },
  ],
};

describe('ProductListDisplay Component', () => {
  test('renders product classifications', () => {
    render(<ProductListDisplay classifiedProductsList={classifiedProductsList} />);

    expect(screen.getByText(PRODUCT_CLASSIFICATION.STAND_ALONE_PRODUCTS)).toBeInTheDocument();
    expect(screen.getByText(PRODUCT_CLASSIFICATION.BUNDLE_PRODUCTS)).toBeInTheDocument();
    expect(screen.getByText(PRODUCT_CLASSIFICATION.RECOMMENDED_PRODUCTS)).toBeInTheDocument();
  });

  test('renders stand-alone products', () => {
    render(<ProductListDisplay classifiedProductsList={classifiedProductsList} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  test('renders bundled products with child items', () => {
    render(<ProductListDisplay classifiedProductsList={classifiedProductsList} />);

    expect(screen.getByText('Child Product 1')).toBeInTheDocument();
    expect(screen.getByText('Child Description 1')).toBeInTheDocument();
  });

});