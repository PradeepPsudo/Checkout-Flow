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

export const AddressBody = styled.div`
 

  flex: none;
  flex-grow: 0;
  text-align: left;

  font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    padding: 10px;
`;
export const AddressCard = styled.div`
  border: 1px solid #d4d7dc;
  // margin-top: 20px;
  border-radius: 4px; 
  padding: 24px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.05);
  background: #ffffff;
  border-radius: 8px;
.checkedRadio {
    // background: rgba(0, 119, 197, 0.03);
    // border: 1px solid #0077c5;
    // box-sizing: border-box;
    // border-radius: 4px;
  }
  .primaryAddressPosition button{
    position: absolute;
    top: -5%;
    right: 15%;
}

.otherAddressPosition button {
    position: absolute;
    top:-10%;
    right: 10%;
}
}`;

export const PrimaryAddressContainer = styled.div`
  display: flex;
  width: 80%;
  margin-left: 10px;
`;
export const AddressBodyContainer = styled.div`
  // display: flex;
  // // margin-left: 20px;
  // margin-bottom: 16px;
  // width: 100%;
  // position: relative;
  display: grid;
  grid-template-columns: 1fr 9fr 1fr;
  /* grid-auto-rows: 100px; */
  grid-gap: 1rem;

`;
export const CustomerAddressWidgetStyledContainer = styled.div`
  flex-wrap: wrap;
  width: auto;
  box-sizing: border-box;
  background: #ffffff;
  padding:20px;
  border: 1px solid #babec5;
    border-radius: 4px;
    text-align: left;
`;
export const CustomerAddressContainer = styled.div`
  flex-wrap: wrap;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  color: black;
  line-height: 24px;


  margin-left: 0px;
  margin-top: 0px;
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  gap: .75rem;
  line-height: .9rem;
  .customer-address-view-container {
    margin-left: 0px;
    margin-top: 0px;
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    line-height: 0.9rem;
    text-align: left;
  }
`;

export const AddressHeaderContainer = styled.div`
  margin-bottom: 16px;
`;

export const StyledAddressDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    /* identical to box height, or 133% */

    /* Base/Gray/Gray01 */

    color: #393a3d;
    width: 199px;
    height: 32px;
    @media only screen and (max-width: 720px) {
      width: 90%;
    }
    @media only screen and (max-width: 340px) {
      width: 90%;
    }
    @media only screen and (max-width: 300px) {
      width: 83%;
    }
  }
  .address-edit-icon {
    right: 55px;
  }
`;

export const StyledSubTextDiv = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #6b6c72;
  font-weight: 600;
  margin-top: 4.5px;
`;

export const DrawerFooter = styled.button`
padding: 15px;
background-color: aliceblue;
color:blue;
font-size:18px;
cursor:pointer;
border:none;
&:hover{
    border:none;
    background-color:whitesmoke;
}
`;

export  const FooterWrapper = styled.div`
position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: aliceblue;
    z-index: 1201;
    text-align: right;
    height: 51px;
    border:none;
    button{
        padding: 15px;

font-size:14px;
cursor:pointer;
border:none;
    }

`

export const AddNewButtonWrapper = styled.div`
display:flex;
width: 100%;
justify-content: end;
margin-top: 10px;
    margin-left: -10px;
`;

export const FooterAddNewButtonWrapper = styled.div`
position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
`;

export const ListViewAddressWrapper = styled.div`
display: grid;
    grid-auto-flow: column;
    // display:flex;
    // flex-direction:row;
`; 

export const AddressBox = styled.div`
width:'50%'
background: #ffffffff;
`

export const AddressCardWrapper = styled.div`
padding: 10px;
border-radius: 0 0 8px 8px;
box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.05);
`;