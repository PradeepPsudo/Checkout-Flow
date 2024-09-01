import './App.css';
import { ProductsCheckoutContextProvider } from './Context/ProductsContext';
import Footer from './components/Common/Footer';
import Header from './components/Common/Header';
import { getClassifiedProducts } from './utils.js/productsUtils';
import { useGetProductList } from './common/customhooks/useGetProducts';
import { API_ENDPOINTS } from './constants/apiConstants';
import ClipLoader from 'react-spinners/ClipLoader'; 
import StepFlow from './components/Step';


function App() {
  let classifiedProductsList ={};
  const {data,isLoading,error} = useGetProductList(API_ENDPOINTS.GET_PRODUCTS);
  if(data.products){
    classifiedProductsList = getClassifiedProducts(data);
  }
  if(error){
    throw error;
  }

  if (isLoading) {
    return (<div className="spinner">
            <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
      </div>)
  }
  return (
        <ProductsCheckoutContextProvider>
      <Header/>
      <div className="App">
      {data?.products && <StepFlow ProductList={data} classifiedProductsList={classifiedProductsList}/>}
    </div>
    <Footer/>
    </ProductsCheckoutContextProvider>
    
    
  );
}

export default App;
