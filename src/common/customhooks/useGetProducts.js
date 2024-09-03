import { useState, useEffect } from 'react'; 
import axios from'axios';
export const useGetProductList = (url,options={}) =>{
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = async () => { 
        setIsLoading (true);
        try {
            const response = await axios(url, options);
            setData (response.data);
        }catch(error) {
         setError (error);
         throw error;
        }
    setIsLoading (false);
    }
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line 
    },[]);

return { data:{products:data}, isLoading, error };
}

export const addToCart = ()=>{
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const addProductToCart = async (url,options,setSpinner) => { 
        setSpinner(true);
        setIsLoading (true);
        try {
            const response = await axios.post(url, options);
            setData (response.data);
        }catch(error) {
         setError (error);
         setSpinner(false);
         throw error;
        }
        setSpinner(false);
        setIsLoading (true);
    }
    return {addProductToCart, data:{products:data}, isLoading, error };
}

export const updateCheckoutAddressDetails = ()=>{
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateAddressDetails = async (url,options={},setSpinner) => { 
        setIsLoading (true);
        setSpinner(true);
        try {
            const response = await axios.post(url, options);
            setData (response.data);
        }catch(error) {
         setError (error);
         setSpinner(false);
         throw error;
        }
    setIsLoading (false);
    setSpinner(false);
    }
    return {updateAddressDetails, data:{products:data}, isLoading, error };
}

// export const updateCheckoutPaymentDetails = (url,options={})=>{
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const updatePaymentMethodDetails = async () => { 
//         setIsLoading (true);
//         try {
//             const response = await axios.post(url, options);
//             setData (response.data);
//         }catch(error) {
//          setError (error);
//         }
//     setIsLoading (false);
//     }
//     useEffect(()=>{
//         updatePaymentMethodDetails();
//         // eslint-disable-next-line 
//     },[]);
//     return { data:{products:data}, isLoading, error };
// }

export const placeOrder = ()=>{
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const callPlaceOrder = async (url,options={},setSpinner) => { 
        setIsLoading (true);
        setSpinner(true);
        try {
            const response = await axios.post(url, options);
            setData (response.data);
        }catch(error) {
         setError (error);
             setSpinner(false);
         throw error;
        }
         setIsLoading (false);
         setSpinner(false);
    }
    return  {callPlaceOrder, data:{products:data}, isLoading, error };
}