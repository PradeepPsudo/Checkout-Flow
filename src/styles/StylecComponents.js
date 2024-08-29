import styled from "styled-components";

export const ProductListWrapper = styled.div`
padding: 5px;
min-width: 300px;
width: 69%;
display: flex;
flex-direction: column;
color: rgb(57, 58, 61);
// padding: 2%;
//     background-color: rgb(244, 245, 248);
    margin-bottom: 20px;
.MuiAccordionSummary-content{
    display:block !important;
   // margin-bottom:-20px !important;
   // margin-top:0px !important;
}
.MuiButtonBase-root{
    padding:0px !important;
}
`;

export const StyledDiv = styled.div``;

export const LineItemDiv=styled.div`
display: flex;
-webkit-box-pack: justify;
justify-content: space-between;
background-color: rgb(244, 245, 248);
margin:1%;
padding: 10px;
--Paper-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

`;

export const LineItemTextContent = styled.div`
    display: flex !important;
  
`;

export const LineItemBody = styled.div`

display: flex;
flex-direction: column;
margin-bottom: 8px;
`;

export const LineItemTitle = styled.span`
color: rgb(57, 58, 61);
font-size: 18px;
font-weight: 600;
align-self: baseline;
text-align: start;
    margin: 0px;
    padding: 0px;
`;

export const LineItemDescription = styled.div`
display: -webkit-box;
-webkit-box-align: baseline;
align-items: baseline;
-webkit-box-pack: justify;
justify-content: space-between;
gap: 5%;
-webkit-box-flex: 1;
flex-grow: 1;
width: 100%;
line-height: 20px;
text-align: left;
margin-top: 3px;
`;

export const LineItemDescriptionContent = styled.span`
font-size: 14px;
font-weight: 400;
-webkit-box-flex: 20;
flex-grow: 20;
padding-top: 1%;
align-self: baseline;
text-align: start;
padding: 0px;
    margin: 0px;
`;

export const LineItemRightSection = styled.div`
-webkit-box-flex: 0;
flex-grow: 0;
display: flex;
flex-basis: 300px;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: end;
justify-content: end;
padding-left: 20px;
`;

export const LineItemPriceQuantity = styled.div`
flex-basis: 130px;
`;

export const PriceDiv = styled.div`
display: flex;
flex-flow: column wrap;
-webkit-box-align: end;
align-items: end;
height: 100%;
`;

export const PriceInfo = styled.div`
display: flex;
    flex-flow: column;
    // font-size: 28px;
    font-size: 18px;
font-weight: 600;
`;

export const LineItemQuantity = styled.div`
height: 4em;
flex-basis: 45px;
text-align: right;
display: flex;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: end;
justify-content: flex-end;
`;

export const StyledSpan = styled.span``;

export const StyledCheckbox = styled.input`
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid rgb(204, 204, 204);
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    transition: all 0.2s ease 0s;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:checked {
        background-color: rgb(33, 150, 243) !important;
        border-color: rgb(33, 150, 243) !important;
        &:before {
            content: "✓";
            display: block;
            text-align: center;
            color: white;
        }
    }
`;

export const BackButtonWrapper = styled.div`
    display:flex;
   // width:69%;
    justify-content:center;
`;


export const ProductWrapper = styled.div`
border: 1px solid;
border-radius: 12px;
background-clip: padding-box;
background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
` ;

export const ProductClassificationHeader = styled.div`
    margin-top:2%;
    margin-bottom:2%;
    text-align:left;
`;

export const ProductClassificationName = styled.span`
    text-align:left;
    font-size: 20px;
    font-weight:600;
`;