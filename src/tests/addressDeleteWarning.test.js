import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddressAlertDialog from '../components/Alerts/AddressDeleteWarning';

describe('AddressAlertDialog Component', () => {
  const mockDeleteAddress = jest.fn();
  const mockSetOpenDialog = jest.fn();

  const defaultProps = {
    deleteAddress: mockDeleteAddress,
    setOpenDialog: mockSetOpenDialog,
    open: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AddressAlertDialog component with correct text', () => {
    render(<AddressAlertDialog {...defaultProps} />);

    expect(screen.getByText('Are you sure you want to delete this address?')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('calls setOpenDialog with false when Cancel button is clicked', () => {
    render(<AddressAlertDialog {...defaultProps} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockSetOpenDialog).toHaveBeenCalledWith(false);
  });

  test('calls deleteAddress when Delete button is clicked', () => {
    render(<AddressAlertDialog {...defaultProps} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockDeleteAddress).toHaveBeenCalled();
  });

  test('dialog is open when open prop is true', () => {
    render(<AddressAlertDialog {...defaultProps} />);

    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement).toBeInTheDocument();
  });

  test('dialog is not open when open prop is false', () => {
    render(<AddressAlertDialog {...defaultProps} open={false} />);

    const dialogElement = screen.queryByRole('dialog');
    expect(dialogElement).not.toBeInTheDocument();
  });
});