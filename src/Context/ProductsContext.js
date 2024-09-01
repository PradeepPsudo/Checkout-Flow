import React, { useState } from 'react';


// The Context
const ProductCheckoutContext = React.createContext({});
const initialAddress = {
    "firstName": "PRADEEP",
    "lastName": "Gowda",
    "buildingName": "Guddada",
    "addressLine1": "MARUTI NAGAR",
    "addressLine2": "Kamakshipalya",
    "city": "Bangalore Urban",
    "state": "KARNATAKA",
    "pincode": "560079",
    "country": "India",
    "mobile": "08073130009",
    "email": "PRADEEPP1994@GMAIL.COM",
    "isPrimary":true,
    "flatNo":123,
    id:1234
}




// Context Provider
const ProductsCheckoutContextProvider = ({ children }) => {
  const [addressContext, setAddressContext] = useState(initialAddress)

  const [selectedProducts, setSelectedProducts]= useState([]);
  const [currentAddressId,setCurrentAddressId]= useState('');
  const [selectedProductIds, setSlectedProductIds] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [productQuantity, setProductQuantity] = useState({});
  const [paymentMethod,setPaymentMethod] = useState({});
  // Context values passed to consumer
  const value = {
    addressContext,
    setAddressContext,
    selectedProducts,
    setSelectedProducts,
    currentAddressId,
    setCurrentAddressId,
    selectedProductIds,
    setSlectedProductIds,
    setPaymentMethod,
    paymentMethod,
    productQuantity,
    setProductQuantity,
    addressList,
    setAddressList,
  };

  return <ProductCheckoutContext.Provider value={value}>{children}</ProductCheckoutContext.Provider>;
};



// useAddress Hook
const useProductCheckoutContext = () => {
  const context = React.useContext(ProductCheckoutContext);
  if (context === undefined)
    throw new Error('Context needs to be setup');
  return context;
};

export { ProductsCheckoutContextProvider, useProductCheckoutContext };
