import './App.css';
import { ProductsCheckoutContextProvider } from './Context/ProductsContext';
import StepFlow from './components/Step';
import {ProductList} from './mocks/ProductList';
import { getClassifiedProducts } from './utils.js/productsUtils';

function App() {
  const classifiedProductsList = getClassifiedProducts(ProductList);
  return (
    <ProductsCheckoutContextProvider>
      <div className="App">
      <StepFlow ProductList={ProductList} classifiedProductsList={classifiedProductsList}/>
    </div>
    </ProductsCheckoutContextProvider>
    
  );
}

export default App;
