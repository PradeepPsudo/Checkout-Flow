import { CURRENCY_TYPE } from "../constants";


export const getClassifiedProducts = (ProductList)=>{
    const standAloneProducts = [];
    const bundledProducts = [];
    const recommendedProducts = [];
    ProductList.products.forEach((product)=>{
        const {lineItems} = product;
        lineItems.forEach((item)=>{
            const {productDetails,pricingDetails,childItems} = item;
            const {isParent,toBeRecommended} = productDetails;
            if(isParent){
                const bundleObj = {
                   
                    productDetails,
                    pricingDetails,
                    childItems
                }
                bundledProducts.push(bundleObj);
            }else if(toBeRecommended){
                const recommendedProductObj = {
                    productDetails,
                    pricingDetails,
                    childItems
                }
                recommendedProducts.push(recommendedProductObj);
            }else{
                const standAloneObj = {
                    productDetails,
                    pricingDetails,
                    childItems
                }
                standAloneProducts.push(standAloneObj);
            }
        })
    })
    return {
        standAloneProducts,
        bundledProducts,
        recommendedProducts
    }
   
}



export const calculateBillingAmount = (products,productQuantity)=>{
    const totalAmount = products.reduce((acc,product)=>{
        const {pricingDetails,productDetails} = product;
        const {productId} = productDetails;
        const {totalAmount} = pricingDetails;
        return acc + (totalAmount.value * productQuantity[productId])
    },0)

    const discountedPrice = products.reduce((acc,product)=>{
        const {pricingDetails,productDetails} = product;
        const {productId} = productDetails;
        const {discountedPrice} = pricingDetails;
        return acc + (discountedPrice?.value ?  discountedPrice?.value* productQuantity[productId]:0)
    },0)
    const currency = products?.[0].pricingDetails?.totalAmount?.currency || CURRENCY_TYPE.USD;
    return{
        totalAmount,
        totalDiscount:discountedPrice,
        currency
    }
}