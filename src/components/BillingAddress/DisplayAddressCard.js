import { AddressBodyContainer, AddressCard, AddressCardWrapper, PrimaryAddressContainer } from "../../styles/StylecComponents";
import DisplayAddressContent from "./DisplayAddressContent";
import Radio from '@material-ui/core/Radio';
import { useProductCheckoutContext } from "../../Context/ProductsContext";
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddressAlertDialog from "../Alerts/AddressDeleteWarning";


export default function DisplayAddressCard(props) {
    const {address} = props;
    const {id} = address;
    const [openDialog,setOpenDialog] = useState(false);

const {addressContext,currentAddressId,setCurrentAddressId ,addressList,setAddressContext,setAddressList} = useProductCheckoutContext();
useEffect(()=>{
    if(addressContext?.id){
        setCurrentAddressId(addressContext?.id);
    }
    // eslint-disable-next-line 
},[])



  const radioClickFn =()=>{
    setCurrentAddressId(id);
    setAddressContext( addressList?.find((address) => address.id === id));
  }

  const handleDeleteAddress = ()=>{
    setOpenDialog(true);
    // const fetchPrimaryAddress = addressList?.find((address)=> address.isPrimary);
    // fetchPrimaryAddress &&  setAddressContext(fetchPrimaryAddress);
    // fetchPrimaryAddress && setCurrentAddressId(fetchPrimaryAddress.id);
    //  setAddressList(addressList.filter((address)=> address.id !== id));
  }
  const deleteAddress = ()=>{
    const fetchPrimaryAddress = addressList?.find((address)=> address.isPrimary);
    fetchPrimaryAddress &&  setAddressContext(fetchPrimaryAddress);
    fetchPrimaryAddress && setCurrentAddressId(fetchPrimaryAddress.id);
     setAddressList(addressList.filter((address)=> address.id !== id));
  }


  return (
    <>
      <AddressCard
        className={address?.id === currentAddressId ? 'checkedRadio' : ''}
      >
        <AddressCardWrapper>
       
        <AddressBodyContainer>
          <Radio
          style={{alignItems:'normal'}}
            checked={address?.id === currentAddressId}
            onChange={radioClickFn}
            id="checkedRadio"
            role="radio"
            color='primary'
            aria-checked={address?.identification?.id === currentAddressId}
            aria-describedby="address"

          />
          <DisplayAddressContent {...address} />
          {address.isPrimary && (
          <PrimaryAddressContainer>
                <Grid style={{'text-align':'end'}} item xs={8}>
                <VerifiedIcon color="primary"/> 
            </Grid>
          </PrimaryAddressContainer>
        )}
         {!address.isPrimary &&  <Grid style={{'text-align':'end',cursor:'pointer'}} item xs={8}>
            <DeleteIcon  onClick={handleDeleteAddress}/>
          </Grid>
}
        {openDialog && <AddressAlertDialog open={openDialog} setOpenDialog={setOpenDialog} deleteAddress={deleteAddress}/>}
        </AddressBodyContainer>
        </AddressCardWrapper>
      </AddressCard>
    </>
  );
}
