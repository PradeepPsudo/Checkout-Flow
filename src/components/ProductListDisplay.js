import React, { useState } from "react";
import  '../styles/ProductList.css';
import { ProductClassificationHeader, ProductClassificationName, ProductListWrapper, ProductWrapper, StyledDiv } from "../styles/StylecComponents";
import LineItems from "./RenderLineItems";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PRODUCT_CLASSIFICATION } from "../constants";
import { useProductCheckoutContext } from "../Context/ProductsContext";


const ProductListDisplay = ({ products,classifiedProductsList }) => {
    // const [selectedProducts, setSelectedProducts] = useState([]);
    const {standAloneProducts,bundledProducts,recommendedProducts} = classifiedProductsList;
    const {selectedProducts,setSelectedProducts} = useProductCheckoutContext();
    console.log('selectedProducts: ', selectedProducts);

    const handleCheckboxChange = (product) => {
        const {productDetails} = product;
        const {productId} = productDetails;

        setSelectedProducts((previousSelectedProducts)=>{
            const isProductPreviouslySelected = previousSelectedProducts?.find((prevProduct)=>prevProduct?.productDetails?.productId === productId);
            return isProductPreviouslySelected ?  previousSelectedProducts.filter((prevProduct) => prevProduct?.productDetails?.productId !== productId) : [...previousSelectedProducts, product]
        })
        
        // setSelectedProducts((prevSelectedProducts) =>
        //     prevSelectedProducts.includes(productId)
        //         ? prevSelectedProducts.filter(id => id !== productId)
        //         : [...prevSelectedProducts, productId]
        // );
    };

    const createAccordion = (product)=>{
        const { productDetails, pricingDetails, childItems } = product;
            return(
            //     <Accordion className="accordion-class">
            //     <AccordionSummary style={{display:"block"}}  expandIcon={<ExpandMoreIcon />}>
            //      <LineItems productDetails={productDetails} pricingDetails={pricingDetails} handleCheckboxChange={handleCheckboxChange}/>
            //     </AccordionSummary>
            //     <AccordionDetails>
            //     <LineItems productDetails={productDetails} pricingDetails={pricingDetails} handleCheckboxChange={handleCheckboxChange} showCheckbox={false}/>

            //         {childItems && childItems.length > 0 && (
            //          <div>
            //             {childItems.map((childProduct) => renderProduct(childProduct))}
            //        </div>
            //     )}
            //     </AccordionDetails>
            //   </Accordion>
            <Accordion className="accordion-class">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {/* <AccordionSummary> */}
                    {/* <LineItems productDetails={productDetails} pricingDetails={pricingDetails.totalAmount} handleCheckboxChange={handleCheckboxChange}/> */}
                    <LineItems product={product} handleCheckboxChange={handleCheckboxChange} isFromAccordion={true}/>
                </AccordionSummary>
                <AccordionDetails>
                
                    {childItems && childItems.length > 0 && (
                        <ul>
                            <li>
                            {/* <LineItems productDetails={productDetails} pricingDetails={pricingDetails.baseAmount} handleCheckboxChange={handleCheckboxChange} showCheckbox={false}/> */}
                            <LineItems product={product}  handleCheckboxChange={handleCheckboxChange} showCheckbox={false}/>

                            </li>
                            {
                                childItems.map((childProduct)=>(
                                    <li>
                                        {childProduct?.childItems && childProduct?.childItems?.length > 0 && createAccordion(childProduct)}
                                        {/* { childProduct?.childItems?.length ===0 && <LineItems productDetails={childProduct?.productDetails} pricingDetails={childProduct?.pricingDetails?.baseAmount} handleCheckboxChange={handleCheckboxChange} showCheckbox={false}/>} */}
                                        { childProduct?.childItems?.length ===0 && <LineItems product={childProduct}  handleCheckboxChange={handleCheckboxChange} showCheckbox={false}/>}

                                    </li>
                                ))
                            }
                        </ul>
                    )}
                   
                  
                    {/* {childItems && childItems.length > 0 && (
                            }
                        </ul>
                    )}
                   
                  
                    {/* {childItems && childItems.length > 0 && (
                        <div>
                            {childItems.map((childProduct) => renderProduct(childProduct))}
                        </div>
                    )} */}
                </AccordionDetails>
            </Accordion>
            )
    }

    const renderProduct = (product) => {
        const { productDetails, pricingDetails, childItems } = product;
        const isSelected = selectedProducts.includes(productDetails.productId);

        return (
            <>
             {childItems && childItems.length > 0 && createAccordion(product)}

             {/* {childItems?.length=== 0 && <LineItems productDetails={productDetails} pricingDetails={pricingDetails?.totalAmount} handleCheckboxChange={handleCheckboxChange}/>} */}
             {childItems?.length=== 0 && <LineItems product={product} handleCheckboxChange={handleCheckboxChange}/>}

            </>
        );
    };

    return (
        <ProductListWrapper >
            {/* <h1>Product List</h1> */}
            {/* <ProductWrapper>
                {products.map((product) => (
                    <StyledDiv key={product.lineItems[0].productDetails.productId}>
                        {product.lineItems.map((item) => renderProduct(item))}
                    </StyledDiv>
                ))}
            </ProductWrapper> */}
            <ProductClassificationHeader>
                <ProductClassificationName>{PRODUCT_CLASSIFICATION.STAND_ALONE_PRODUCTS}</ProductClassificationName>
            </ProductClassificationHeader>
             
            <ProductWrapper>
                {standAloneProducts.map((product) => (
                    <StyledDiv key={product.productDetails.productId}>
                        {/* {product.lineItems.map((item) => renderProduct(item))} */}
                        <LineItems product={product}  handleCheckboxChange={handleCheckboxChange}/>
                    </StyledDiv>
                ))}
            </ProductWrapper>
            <ProductClassificationHeader>
            <ProductClassificationName>{PRODUCT_CLASSIFICATION.BUNDLE_PRODUCTS}</ProductClassificationName>
            </ProductClassificationHeader>
           
            <ProductWrapper>
                {bundledProducts.map((product) => (
                    <StyledDiv key={product.productDetails.productId}>
                        {/* {product.map((item) => renderProduct(item))} */}
                        {renderProduct(product)}
                    </StyledDiv>
                ))}
            </ProductWrapper>
            <ProductClassificationHeader>
            <ProductClassificationName>{PRODUCT_CLASSIFICATION.RECOMMENDED_PRODUCTS}</ProductClassificationName>
            </ProductClassificationHeader>
           
            <ProductWrapper>
                {recommendedProducts.map((product) => (
                    <StyledDiv key={product.productDetails.productId}>
                        {/* {product.map((item) => renderProduct(item))} */}
                        {renderProduct(product)}
                    </StyledDiv>
                ))}
            </ProductWrapper>
            
        </ProductListWrapper>
    );
};

export default ProductListDisplay;