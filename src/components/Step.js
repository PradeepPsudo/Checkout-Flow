import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepConnector, Button } from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import ProductListDisplay from './ProductListDisplay.js';
import '../styles/ProductList.css';
import { useProductCheckoutContext } from '../Context/ProductsContext.js';
import AddressPage from './BillingAddress/index.js';
import CartPage from './CheckoutPage/index.js';
import CustomizedDialogs from './PaymentDialog/index.js';
import OrderSummary from './OrderSummary/index.js';

function getSteps() {
  return ['Select Products', 'Provide Address', 'Place order'];
}

const order = {
  orderNumber: '123456',
  date: '2024-08-31T14:22:00Z',
  items: [
    { name: 'Product 1', quantity: 2, price: 29.99 },
    { name: 'Product 2', quantity: 1, price: 49.99 }
  ],
  totalPrice: 109.97,
  shippingAddress: '123 Main St, Anytown, USA',
  paymentMethod: 'Credit Card',
  handleContinueShopping: () => { /* Function to continue shopping */ }
};



const useStyles = makeStyles((theme) => ({
  connectorActive: {
    '& $connectorLine': {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorLine: {
    borderTopWidth: 2,
    borderTopStyle: 'solid',
    borderColor: '#eaeaf0',
    transition: theme.transitions.create('border-color'),
  },
  step_label_root: {
    fontSize: '10px',
  }
}));

const theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          'font-size': '2rem'
        }
      }
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          'font-size': '1.2rem'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#454B1B'
    }
  },
});


export default function StepFlow(props) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const classes = useStyles();
  const { selectedProducts } = useProductCheckoutContext();
  const [launchDialog, setLaunchDialog] = useState(false);

  const { ProductList, classifiedProductsList } = props;
  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2 && !launchDialog) {
      setLaunchDialog(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ProductListDisplay products={ProductList?.products} classifiedProductsList={classifiedProductsList} />;
      case 1:
        return <AddressPage />
      case 2:
        return (<>
          <CartPage handleNext={handleNext} />
          {launchDialog && <CustomizedDialogs handleNext={handleNext} setLaunchDialog={setLaunchDialog} />}
        </>
        );
      default:
        return 'Unknown stepIndex';
    }
  }
  const buttonText = activeStep === 2 ? 'Proceed to checkout' : 'Next';
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Stepper size="lg" sx={{ width: '100%'}} style={{marginTop:'10px'}} alternativeLabel orientation='horizontal' activeStep={activeStep} connector={<StepConnector classes={{ line: classes.connectorLine, active: classes.connectorActive, completed: classes.connectorCompleted }} />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel classes={{ label: classes.step_label_root }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <OrderSummary order={order} />
              <Button variant="contained" color="primary" onClick={handleReset}>Home</Button>
            </div>
          ) : (
            <>
              <div className="stepper-wrapper">{getStepContent(activeStep)}</div>
              <div className="step-footer-botton">
                {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
                <Button variant="contained" color="primary" disabled={selectedProducts.length === 0} onClick={handleNext}>{buttonText}</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
