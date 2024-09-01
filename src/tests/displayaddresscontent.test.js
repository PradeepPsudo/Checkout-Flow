import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DisplayAddressContent from '../components/BillingAddress/DisplayAddressContent';

describe('DisplayAddressContent', () => {
  const address = {
    firstName: 'John',
    lastName: 'Doe',
    buildingName: 'Building A',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'Metropolis',
    state: 'NY',
    pincode: '12345',
    country: 'USA',
    mobile: '123-456-7890',
    email: 'john.doe@example.com',
    flatNo: 101
  };

  it('renders the address details correctly', () => {
    render(<DisplayAddressContent {...address} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('101 , Building A, 123 Main St, Apt 4B')).toBeInTheDocument();
    expect(screen.getByText('Metropolis, 12345')).toBeInTheDocument();
    expect(screen.getByText('NY, USA')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders without addressLine2 and flatNo', () => {
    const addressWithoutOptionalFields = {
      ...address,
      addressLine2: '',
      flatNo: null
    };

    render(<DisplayAddressContent {...addressWithoutOptionalFields} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Building A, 123 Main St,')).toBeInTheDocument();
    expect(screen.getByText('Metropolis, 12345')).toBeInTheDocument();
    expect(screen.getByText('NY, USA')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });
});