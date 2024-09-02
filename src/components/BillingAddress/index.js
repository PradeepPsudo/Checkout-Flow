import { useEffect, useState } from "react";
import { Breadcrumb} from "antd";
import styles from "../../styles/index.module.css";
import { useProductCheckoutContext } from "../../Context/ProductsContext";
import {  ADRRESS_VIEW_TYPE } from "../../constants";
import RenderBillingAddress from "./RenderBillingAddress";
import {  ListViewAddressWrapper } from "../../styles/StylecComponents";
import DisplayAddressCard from "./DisplayAddressCard";

function AddressPage(){
    const [viewName,setViewName] = useState(ADRRESS_VIEW_TYPE.LIST_VIEW);
    const { addressContext,addressList,setCurrentAddressId,setAddressList,currentAddressId} = useProductCheckoutContext();
 
    const primaryAddress = addressList?.find((address) => address.isPrimary)
    const otherAddresses = addressList?.filter((address) => !address.isPrimary)
    useEffect(()=>{
        if(addressContext?.id){
            setCurrentAddressId(addressContext?.id);
            const existingAddress = addressList?.find((address) => address.id === addressContext?.id);
            !existingAddress && setAddressList([...addressList,addressContext]); // TODO: check if this is the right way to update the addressList
        }
         // eslint-disable-next-line 
    },[])


    const goToNewAddress = ()=>{
        setViewName(ADRRESS_VIEW_TYPE.SHOW_NEW);
    }
    const goToSelectAddress = ()=>{
        setViewName(ADRRESS_VIEW_TYPE.LIST_VIEW);
    }

 
    return(
        <div style={{width:'69%'}}>
            <Breadcrumb
                className={styles.breadcrumb}
                items={[
                
                {
                    title: <div  onClick={goToSelectAddress}>Select Address</div>,
                },
                {
                    title: <div onClick={goToNewAddress}>New Address</div>,
                },
                ]}
            />
            {viewName === ADRRESS_VIEW_TYPE.LIST_VIEW && (
            <>
                  <ListViewAddressWrapper>
                    <div className="address-box-wrapper">

                    {primaryAddress && currentAddressId &&  <DisplayAddressCard address={primaryAddress}/>}
                    {otherAddresses && currentAddressId&& otherAddresses.map((address) => <DisplayAddressCard key={address?.id} address={address} />)}
                    </div>
                    <div>
                    <RenderBillingAddress viewName={viewName}/>
                    </div>
                    
                    </ListViewAddressWrapper> 

            </>
            )}
            {viewName === ADRRESS_VIEW_TYPE.SHOW_NEW && <RenderBillingAddress viewName={viewName} goToSelectAddress={goToSelectAddress}/>}
        </div>
    )
}

export default AddressPage;