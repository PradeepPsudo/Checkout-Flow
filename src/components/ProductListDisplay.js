import React from "react";
import  '../styles/ProductList.css';
import { ProductClassificationHeader, ProductClassificationName, ProductListWrapper, ProductWrapper, StyledDiv } from "../styles/StylecComponents";
import LineItems from "./RenderLineItems";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PRODUCT_CLASSIFICATION } from "../constants";
import { useProductCheckoutContext } from "../Context/ProductsContext";


const ProductListDisplay = ({classifiedProductsList }) => {
    const {standAloneProducts,bundledProducts,recommendedProducts} = classifiedProductsList;
    const {setSelectedProducts,setSlectedProductIds, setProductQuantity} = useProductCheckoutContext();

    const handleCheckboxChange = (product) => {
        const {productDetails} = product;
        const {productId} = productDetails;

        setSelectedProducts((previousSelectedProducts)=>{
            const isProductPreviouslySelected = previousSelectedProducts?.find((prevProduct)=>prevProduct?.productDetails?.productId === productId);
            return isProductPreviouslySelected ?  previousSelectedProducts.filter((prevProduct) => prevProduct?.productDetails?.productId !== productId) : [...previousSelectedProducts, product]
        })

        setSlectedProductIds( (previousSelectedProductIds)=>{
            const isProductPreviouslySelected = previousSelectedProductIds?.find((prevProductId)=>prevProductId === productId);
            return isProductPreviouslySelected ?  previousSelectedProductIds.filter((prevProductId) => prevProductId !== productId) : [...previousSelectedProductIds, productId]
        });
        setProductQuantity((prevProductQuantity)=>{
            const isQuantityPresent = prevProductQuantity[productId];
            return isQuantityPresent? delete(prevProductQuantity[productId]) : {...prevProductQuantity,[productId]:1}
        })
    };

    const createAccordion = (product)=>{
        const {  childItems } = product;
            return(
          
            <Accordion className="accordion-class">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>

                    <LineItems product={product} handleCheckboxChange={handleCheckboxChange} isFromAccordion={true}/>
                </AccordionSummary>
                <AccordionDetails>
                
                    {childItems && childItems.length > 0 && (
                        <ul>
                            <li>
                            <LineItems product={product}  handleCheckboxChange={handleCheckboxChange} showCheckbox={false}/>

                            </li>
                            {
                                childItems.map((childProduct)=>(
                                    <li key={childProduct?.name}>
                                        {childProduct?.childItems && childProduct?.childItems?.length > 0 && createAccordion(childProduct)}
                                        { childProduct?.childItems?.length ===0 && <LineItems product={childProduct}  handleCheckboxChange={handleCheckboxChange} showCheckbox={false}/>}

                                    </li>
                                ))
                            }
                        </ul>
                    )}
                   
                </AccordionDetails>
            </Accordion>
            )
    }

    const renderProduct = (product) => {
        const {  childItems } = product;

        return (
            <>
             {childItems && childItems.length > 0 && createAccordion(product)}

             {childItems?.length=== 0 && <LineItems product={product} handleCheckboxChange={handleCheckboxChange}/>}

            </>
        );
    };

    return (
        <ProductListWrapper >
            <ProductClassificationHeader>
                <ProductClassificationName>{PRODUCT_CLASSIFICATION.STAND_ALONE_PRODUCTS}</ProductClassificationName>
            </ProductClassificationHeader>
             
            <ProductWrapper>
                {standAloneProducts.map((product) => (
                    <StyledDiv key={product.productDetails.productId}>
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