

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