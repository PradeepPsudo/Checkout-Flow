import React, { useState } from 'react';
import "../../styles/orderSummary.css";
import { useProductCheckoutContext } from '../../Context/ProductsContext';
 import { calculateBillingAmount } from '../../utils/productsUtils';
import CongratulationsModal from './orderSuccessfull';



const OrderSummary = () => {
    const {selectedProducts,paymentMethod,addressContext,productQuantity} = useProductCheckoutContext();
    const {city,state,country} = addressContext;
    const [open,setOpen] = useState(true);
    const address = ` ${city} 
    ${state} ${country}`;
    const paymentUsed = `${paymentMethod.cardType} **${paymentMethod?.cardNumber?.slice(12,16)}`
    const totalAmountObj = calculateBillingAmount(selectedProducts,productQuantity);
    const totalPrice = totalAmountObj.totalAmount - totalAmountObj.totalDiscount;
    const order = {
        items :[],
        totalPrice
    }
        selectedProducts?.forEach((product)=>{
        const {pricingDetails,productDetails} = product;
        const {totalAmount,discountedPrice} = pricingDetails;
        const {name,productId} = productDetails;
        const quantity = productQuantity[productId];
        const price = discountedPrice?.value ? (totalAmount.value -  discountedPrice.value) * quantity : (quantity*totalAmount.value);
        const orderItem = {
            name,
            quantity,
            price
        }
        order.items.push(orderItem);

    })
    const handleClose = ()=>{
        setOpen(false)
    }
    return (
        <>
        <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-details">
                <div className="order-item">
                    <span>Order Number:</span>
                    <span>{Date.now()}</span>
                </div>
                <div className="order-item">
                    <span>Date:</span>
                    <span>{new Date(new Date().toLocaleDateString()).toLocaleDateString()}</span>
                </div>
                <div className="order-item">
                    <span>Items:</span>
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index}>
                                {item.name} x {item.quantity} - ${item.price}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="order-item">
                    <span>Total Price:</span>
                    <span>${order.totalPrice}</span>
                </div>
                <div className="order-item">
                    <span>Shipping Address:</span>
                    <span>{address}</span>
                </div>
                <div className="order-item">
                    <span>Payment Method:</span>
                    <span>{paymentUsed}</span>
                </div>
            </div>
        </div>
        <CongratulationsModal open={open} handleClose={handleClose}/>
        {/* <OrderSuccessModal/> */}
        {/* <CongratsModal/> */}
        {/* <OrderConfirmation/> */}
        </>
    );
};

export default OrderSummary;