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
        }
    setIsLoading (false);
    }
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

return { data:{products:data}, isLoading, error };
}