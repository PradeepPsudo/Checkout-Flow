import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductsCheckoutContextProvider, useProductCheckoutContext } from '../Context/ProductsContext';

// A simple component to test the context
const TestComponent = () => {
  const {
    addressContext,
    selectedProducts,
    currentAddressId,
    selectedProductIds,
    paymentMethod,
    productQuantity,
    addressList,
  } = useProductCheckoutContext();

  return (
    <div>
      <div data-testid="addressContext">{JSON.stringify(addressContext)}</div>
      <div data-testid="selectedProducts">{JSON.stringify(selectedProducts)}</div>
      <div data-testid="currentAddressId">{currentAddressId}</div>
      <div data-testid="selectedProductIds">{JSON.stringify(selectedProductIds)}</div>
      <div data-testid="paymentMethod">{JSON.stringify(paymentMethod)}</div>
      <div data-testid="productQuantity">{JSON.stringify(productQuantity)}</div>
      <div data-testid="addressList">{JSON.stringify(addressList)}</div>
    </div>
  );
};

describe('ProductsCheckoutContextProvider', () => {
  it('provides the context values to its consumers', () => {
    render(
      <ProductsCheckoutContextProvider>
        <TestComponent />
      </ProductsCheckoutContextProvider>
    );

    expect(screen.getByTestId('addressContext')).toHaveTextContent(
      JSON.stringify({"firstName":"Pradeep","lastName":"P","buildingName":"Lahari Enclave","addressLine1":"Maruthi Nagar","addressLine2":"Kamakshipalya","city":"Bengaluru","state":"Karnataka","pincode":"560079","country":"India","mobile":"8073130009","email":"pradeepp1994@gmail.com","isPrimary":true,"flatNo":123,"id":1234}
      )
    );
    expect(screen.getByTestId('selectedProducts')).toHaveTextContent('[]');
    expect(screen.getByTestId('currentAddressId')).toHaveTextContent('');
    expect(screen.getByTestId('selectedProductIds')).toHaveTextContent('[]');
    expect(screen.getByTestId('paymentMethod')).toHaveTextContent('{}');
    expect(screen.getByTestId('productQuantity')).toHaveTextContent('{}');
    expect(screen.getByTestId('addressList')).toHaveTextContent('[]');
  });
});