import { CURRENCY_TYPE } from "../constants";
import { calculateBillingAmount, getClassifiedProducts } from "../utils/productsUtils";

describe('getClassifiedProducts', () => {
  test('should classify products correctly', () => {
    const productList = {
      products: [
        {
          lineItems: [
            {
              productDetails: { isParent: true, toBeRecommended: false },
              pricingDetails: { totalAmount: { value: 100, currency: CURRENCY_TYPE.USD } },
              childItems: []
            },
            {
              productDetails: { isParent: false, toBeRecommended: true },
              pricingDetails: { totalAmount: { value: 50, currency: CURRENCY_TYPE.USD } },
              childItems: []
            },
            {
              productDetails: { isParent: false, toBeRecommended: false },
              pricingDetails: { totalAmount: { value: 30, currency: CURRENCY_TYPE.USD } },
              childItems: []
            }
          ]
        }
      ]
    };

    const result = getClassifiedProducts(productList);

    expect(result.standAloneProducts).toHaveLength(1);
    expect(result.bundledProducts).toHaveLength(1);
    expect(result.recommendedProducts).toHaveLength(1);
  });
});

describe('calculateBillingAmount', () => {
  test('should calculate billing amount correctly', () => {
    const products = [
      {
        productDetails: { productId: 1 },
        pricingDetails: { totalAmount: { value: 100, currency: CURRENCY_TYPE.USD }, discountedPrice: { value: 90 } }
      },
      {
        productDetails: { productId: 2 },
        pricingDetails: { totalAmount: { value: 50, currency: CURRENCY_TYPE.USD }, discountedPrice: { value: 45 } }
      }
    ];

    const productQuantity = {
      1: 2,
      2: 3
    };

    const result = calculateBillingAmount(products, productQuantity);

    expect(result.totalAmount).toBe(350); // (100 * 2) + (50 * 3)
    expect(result.totalDiscount).toBe(315); // (90 * 2) + (45 * 3)
    expect(result.currency).toBe(CURRENCY_TYPE.USD);
  });

  test('should handle missing discountedPrice correctly', () => {
    const products = [
      {
        productDetails: { productId: 1 },
        pricingDetails: { totalAmount: { value: 100, currency: CURRENCY_TYPE.USD } }
      },
      {
        productDetails: { productId: 2 },
        pricingDetails: { totalAmount: { value: 50, currency: CURRENCY_TYPE.USD } }
      }
    ];

    const productQuantity = {
      1: 2,
      2: 3
    };

    const result = calculateBillingAmount(products, productQuantity);

    expect(result.totalAmount).toBe(350); // (100 * 2) + (50 * 3)
    expect(result.totalDiscount).toBe(0); // No discounted prices provided
    expect(result.currency).toBe(CURRENCY_TYPE.USD);
  });
});