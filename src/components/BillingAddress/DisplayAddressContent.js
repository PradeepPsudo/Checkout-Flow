import React from 'react';
import { AddressBody } from '../../styles/StylecComponents';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function DisplayAddressContent(address) {
  const flatNo = address.flatNo ? `${address.flatNo} ,`: "";
  const addressLine2 = address.addressLine2 ? `${address.addressLine2}`:"";
  return (
    <AddressBody>
        <div>{address.firstName} {address.lastName}</div>
       <div>{flatNo} {address.buildingName}, {address.addressLine1},  {addressLine2}</div>
       {/* <div>{address.addressLine1}</div>
       {addressLine2 && <div>{addressLine2}</div>} */}
       <div> {address.city}, {address.pincode}</div>
      <div>{address.state}, {address.country} </div>
      <div><PhoneIcon fontSize='small'/> {address.mobile}</div>
      <div><EmailIcon fontSize='small'/> {address.email}</div>
    </AddressBody>
  );
}



// "firstName": "PRADEEP",
//     "lastName": "Gowda",
//     "buildingName": "Guddada",
//     "streetAddress": "MARUTI NAGAR",
//     "city": "Bangalore Urban",
//     "state": "KARNATAKA",
//     "pincode": "560079",
//     "country": "India",
//     "mobile": "08073130009",
//     "email": "PRADEEPP1994@GMAIL.COM",
//     isPrimary:true,
//     id:1234