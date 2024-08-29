import React, { useContext } from 'react';
import { Stepper, Step, StepLabel, StepConnector, Button } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider ,createTheme} from '@material-ui/core/styles';
import ProductListDisplay from './ProductListDisplay';
import {ProductList} from '../mocks/ProductList';
import  '../styles/ProductList.css';
import { BackButtonWrapper } from '../styles/StylecComponents';

function getSteps() {
  return ['Select Products', 'Provide Address', 'Place order'];
}



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
    components:{
        MuiStepIcon:{
            styleOverrides:{
                root:{
                    'font-size':'2rem'
                }
            }
        },
        MuiStepLabel:{
            styleOverrides:{
                label:{
                    'font-size':'1.2rem'
                }
            }
        }
    },
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary:{
        main:'#454B1B'
    }
  },
});

// const theme = createMuiTheme({
//     components:{
//         MuiStepIcon:{
//             styleOverrides:{
//                 root:{
//                     'font-size':'2rem'
//                 }
//             }
//         },
//         MuiStepLabel:{
//             styleOverrides:{
//                 label:{
//                     'font-size':'1.2rem'
//                 }
//             }
//         }
//     },
//   palette: {
//     primary: {
//       main: '#2196f3',
//     },
//     secondary:{
//         main:'#454B1B'
//     }
//   },
// });

export default function StepFlow(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const classes = useStyles();
const {ProductList,classifiedProductsList} = props;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        return <ProductListDisplay products={ProductList?.products} classifiedProductsList={classifiedProductsList}/>;
       // return null;
      case 1:
        return 'Step 2: Create an ad group...';
      case 2:
        return 'Step 3: Create an ad...';
      default:
        return 'Unknown stepIndex';
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Stepper size="lg" sx={{ width: '100%' }} alternativeLabel orientation='horizontal'  activeStep={activeStep} connector={<StepConnector classes={{ line: classes.connectorLine, active: classes.connectorActive, completed: classes.connectorCompleted }} />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel classes={{ label: classes.step_label_root }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <>
              <div className="to-be-removed">{getStepContent(activeStep)}</div>
              { activeStep !== 0 && <Button  onClick={handleBack}>Back</Button>}
              {/* <BackButtonWrapper> */}
                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
              {/* </BackButtonWrapper> */}
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
  
//   import React, { useState } from "react";
//   import {
//     Stepper,
//     Step,
//     StepLabel,
//     Button,
//     Typography,
//   } from "@material-ui/core";
  
//   const steps = ["Step 1", "Step 2", "Step 3"];
  
//   const StepperFeature = () => {
//     const [activeStep, setActiveStep] = useState(0);
  
//     const handleNext = () => {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };
  
//     const handleBack = () => {
//       setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };
  
//     const getStepContent = (stepIndex) => {
//       switch (stepIndex) {
//         case 0:
//           return (
//             <Typography variant="h3">Step 1 Content</Typography>
//           );
//         case 1:
//           return (
//             <Typography variant="h3">Step 2 Content</Typography>
//           );
//         case 2:
//           return (
//             <Typography variant="h3">Step 3 Content</Typography>
//           );
//         default:
//           return <Typography variant="h3">Unknown step</Typography>;
//       }
//     };
  
//     return (
//       <div>
//         <Stepper activeStep={activeStep}>
//           {steps.map((label) => (
//             <Step key={label} StepClasskey="horizontal">
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         {activeStep === steps.length ? (
//           <Typography variant="h3">All steps completed - you&apos;re done</Typography>
//         ) : (
//           <div>
//             {/* Render current step content */}
//             {getStepContent(activeStep)}
//             {/* Step navigation buttons */}
//             <div>
//               <Button disabled={activeStep === 0} onClick={handleBack}>
//                 Back
//               </Button>
//               <Button variant="contained" color="primary" onClick={handleNext}>
//                 {activeStep === steps.length - 1 ? "Finish" : "Next"}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   export default StepperFeature;