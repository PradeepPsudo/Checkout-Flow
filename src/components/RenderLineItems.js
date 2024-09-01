import React from 'react';
import { LineItemBody, LineItemDescription, LineItemDescriptionContent, LineItemDiv, LineItemPriceQuantity, LineItemRightSection, LineItemTextContent, LineItemTitle, PriceDiv, PriceInfo, StyledCheckbox, StyledDiv, StyledSpan } from '../styles/StylecComponents';
import { CURRENCY_TYPE } from '../constants';
import { useProductCheckoutContext } from '../Context/ProductsContext';

export default function LineItems(props){
    const {handleCheckboxChange, showCheckbox=true,isFromAccordion=false, product} = props;
    const {productDetails,pricingDetails} = product
    const {name,description,depth} = productDetails;
    let discount = pricingDetails?.discountedPrice?.value || 0; // Default value is 0 if discountedPrice is not present
    const {selectedProductIds} = useProductCheckoutContext();
    const {currency,value} = isFromAccordion ? pricingDetails.totalAmount : pricingDetails.baseAmount;
    const handleCheckbox = ()=>{
        handleCheckboxChange(product)
    }
    return(
        <LineItemDiv>
        
          
            <LineItemTextContent>
            { (showCheckbox && depth === 0) &&<StyledDiv>
                <StyledCheckbox type="checkbox" checked={selectedProductIds?.includes(productDetails.productId)} onClick={handleCheckbox}></StyledCheckbox>
                </StyledDiv>
            }
                <LineItemBody>
                    <LineItemTitle>
                    {name}
                    </LineItemTitle>
                    <LineItemDescription>
                        <LineItemDescriptionContent>{description}</LineItemDescriptionContent>
                    </LineItemDescription>
                </LineItemBody>
            </LineItemTextContent>
            <LineItemRightSection>
                <LineItemPriceQuantity>
                    <PriceDiv>
                        <PriceInfo>
                            <StyledSpan>
                                
                                <StyledSpan style={{'text-decoration': discount?'line-through':'none'}}>{CURRENCY_TYPE[currency]}</StyledSpan>
                                <StyledSpan style={{'text-decoration': discount?'line-through':'none'}}>&nbsp;{value}</StyledSpan>
                                {discount && <>
                                    &nbsp;   &nbsp;  &nbsp;
                                    <StyledSpan>{CURRENCY_TYPE[currency]}</StyledSpan>
                                <StyledSpan>&nbsp;{value-discount}</StyledSpan></> }
                            </StyledSpan>
                        </PriceInfo>
                    </PriceDiv>
                </LineItemPriceQuantity>
            </LineItemRightSection>
        </LineItemDiv>
    )
}