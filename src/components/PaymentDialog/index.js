import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PaymentForm from "../Creditcard/index";
import { useProductCheckoutContext } from '../../Context/ProductsContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
    const {handleNext,setLaunchDialog} = props;
  const [open, setOpen] = useState(true);
  const {setPaymentMethod} = useProductCheckoutContext();

    const [disablePlaceOrder,setDisabledPlaceOrder] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setLaunchDialog(false);
  };
  const onDone = (paymentMethod)=>{
    setPaymentMethod(paymentMethod);
  }

  const handlePlaceOrder = ()=>{
    handleNext();
    setOpen(false);
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Enter Payment Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute !important',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
             <PaymentForm setDisabledPlaceOrder={setDisabledPlaceOrder} onDone={onDone}/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" disabled={disablePlaceOrder}  color='primary' onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}