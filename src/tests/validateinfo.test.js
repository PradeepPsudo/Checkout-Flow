import valid from 'card-validator';
import validateInfo from '../components/Creditcard/validateInfo';

jest.mock('card-validator');

describe('validateInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return success for valid credit card information', () => {
    const values = {
      cardNumber: '4111111111111111',
      cardExpiration: '12/23',
      cardSecurityCode: '123',
      cardName: 'John Doe',
      cardPostalCode: '12345',
      cardType: 'VISA'
    };

    valid.number.mockReturnValue({ isValid: true, card: { type: 'visa' } });
    valid.expirationDate.mockReturnValue({ isValid: true });
    valid.cvv.mockReturnValue({ isValid: true });
    valid.cardholderName.mockReturnValue({ isValid: true });
    valid.postalCode.mockReturnValue({ isValid: true });

    const result = validateInfo(values);

    expect(result.variant).toBe('success');
    expect(result.message).toBe('Credit Card is valid');
    expect(result.cname).toBe(true);
    expect(result.cnumber).toBe(true);
    expect(result.ctype).toBe(true);
    expect(result.cexp).toBe(true);
    expect(result.ccvv).toBe(true);
    expect(result.cpostal).toBe(true);
  });



  it('should return error for invalid credit card information', () => {
    const values = {
      cardNumber: '1234567890123456',
      cardExpiration: '13/25',
      cardSecurityCode: '12',
      cardName: 'John Doe',
      cardPostalCode: 'ABCDE',
      cardType: 'MASTERCARD'
    };

    valid.number.mockReturnValue({ isValid: false, card: { type: 'visa' } });
    valid.expirationDate.mockReturnValue({ isValid: false });
    valid.cvv.mockReturnValue({ isValid: false });
    valid.cardholderName.mockReturnValue({ isValid: true });
    valid.postalCode.mockReturnValue({ isValid: false });

    const result = validateInfo(values);

    expect(result.variant).toBe('danger');
    expect(result.message).toBe('Credit card number is invalid');
    expect(result.cname).toBe(true);
    expect(result.cnumber).toBe(false);
    expect(result.ctype).toBe(false);
    expect(result.cexp).toBe(false);
    expect(result.ccvv).toBe(false);
    expect(result.cpostal).toBe(false);
  });

  it('should return error for invalid card type', () => {
    const values = {
      cardNumber: '4111111111111111',
      cardExpiration: '12/23',
      cardSecurityCode: '123',
      cardName: 'John Doe',
      cardPostalCode: '12345',
      cardType: 'MASTERCARD'
    };

    valid.number.mockReturnValue({ isValid: true, card: { type: 'visa' } });
    valid.expirationDate.mockReturnValue({ isValid: true });
    valid.cvv.mockReturnValue({ isValid: true });
    valid.cardholderName.mockReturnValue({ isValid: true });
    valid.postalCode.mockReturnValue({ isValid: true });

    const result = validateInfo(values);

    expect(result.variant).toBe('danger');
    expect(result.message).toBe('Credit card type is invalid');
    expect(result.cname).toBe(true);
    expect(result.cnumber).toBe(true);
    expect(result.ctype).toBe(false);
    expect(result.cexp).toBe(true);
    expect(result.ccvv).toBe(true);
    expect(result.cpostal).toBe(true);
  });
});