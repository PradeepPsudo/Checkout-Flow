import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Card } from 'antd';
import BillingCard from '../components/CheckoutPage/BiilingCard';

jest.mock('antd', () => {
  const Card = ({ children }) => <div>{children}</div>;
  return { Card };
});

describe('BillingCard Component', () => {
  const defaultProps = {
    totalAmount: 100,
    discount: 20,
    curency: '$'
  };

  it('should render the BillingCard component', () => {
    const { getByText } = render(<BillingCard {...defaultProps} />);
    
    expect(getByText('Cart Total')).toBeInTheDocument();
    expect(getByText('Total Amount:')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
    expect(getByText('Discount:')).toBeInTheDocument();
    expect(getByText('$20')).toBeInTheDocument();
    expect(getByText('Shipping:')).toBeInTheDocument();
    expect(getByText('Free')).toBeInTheDocument();
    expect(getByText('Amount To Pay:')).toBeInTheDocument();
    expect(getByText('$80')).toBeInTheDocument();
  });

  it('should calculate the correct amount to pay', () => {
    const { getByText } = render(<BillingCard {...defaultProps} />);
    
    const amountToPay = defaultProps.totalAmount - defaultProps.discount;
    expect(getByText(`$${amountToPay}`)).toBeInTheDocument();
  });

  it('should render with different currency', () => {
    const newProps = {
      ...defaultProps,
      curency: '€',
      totalAmount: 200,
      discount: 50
    };
    const { getByText } = render(<BillingCard {...newProps} />);
    
    expect(getByText('€200')).toBeInTheDocument();
    expect(getByText('€50')).toBeInTheDocument();
    expect(getByText('€150')).toBeInTheDocument();
  });
});