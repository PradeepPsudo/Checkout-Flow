import React, { useState } from 'react';

// import { DEFAULT_COUNTRY } from '../../../common/constants/AddressConfig';
const DEFAULT_COUNTRY="INDIA";

// The Context
const ProductCheckoutContext = React.createContext({});

// Address Provider
const ProductsCheckoutContextProvider = ({ children }) => {
  const [addressContext, setAddressContext] = useState({
    identification: null,
    city: null,
    state: null,
    addressLine1: null,
    addressLine2: null,
    country: DEFAULT_COUNTRY,
    postalCode: null,
    isPrimary: null,
  });

  const [selectedProducts, setSelectedProducts]= useState([]);
//   const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
//   const [isUseButtonEnabled, setUseButtonEnabled] = useState(false);
//   const [currentAddressId, setCurrentAddressId] = useState('');
//   const [updateCreateAddressId, setUpdateCreateAddressId] = useState('');
  const [addressList, setAddressList] = useState([]);
  // Context values passed to consumer
  const value = {
    addressContext,
    setAddressContext,
    selectedProducts,
    setSelectedProducts,
    // isSaveButtonEnabled,
    // setSaveButtonEnabled,
    // isUseButtonEnabled,
    // setUseButtonEnabled,
    // currentAddressId,
    // setCurrentAddressId,
    // updateCreateAddressId,
    // setUpdateCreateAddressId,
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
