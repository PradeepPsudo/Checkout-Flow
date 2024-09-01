// import { ADDRESS_PAGE, LISTING_PAGE, STATUS } from "../../constants/appConstants";
import styles from "./index.module.css";
import {  Card, Row, Col } from "antd";
import { useProductCheckoutContext } from "../../Context/ProductsContext";
import CartItemCard from "./cartItems";
import { calculateBillingAmount } from "../../utils/productsUtils";
import BillingCard from "./BiilingCard";
import DisplayAddressContent from "../BillingAddress/DisplayAddressContent";
import "../../styles/billingcard.css";


function CartPage(){
    const {selectedProducts,productQuantity,addressContext} = useProductCheckoutContext();
    const caluculatedTotal = calculateBillingAmount(selectedProducts,productQuantity);
    const {totalAmount,totalDiscount,currency} = caluculatedTotal;

        return(
            <div style={{width:'69%'}}>
                <div className="order-table-wrapper">
                <Card className={styles.card}>

                    <Row justify={"space-around"} align={"center"} className="cart-page-line-item">
                        <Col sm={{span: 6}} xs={{span: 0}}>Product</Col>
                        <Col span={4}>Cost Price</Col>
                        <Col span={4}>Discount </Col>
                        <Col span={4}>Quantity</Col>
                        <Col span={4}>Subtotal</Col>
                    </Row>
                </Card>
                {
                    selectedProducts.map((item, key) => 
                    <CartItemCard index={key} key={key} item={item}  />

                    )
                }
                </div>
                <div className="address-billcard-wrapper">

                  <Card className="priceCard">
                    <h2  className="title"> Billing Address</h2>
                    <DisplayAddressContent {...addressContext}/>
                  </Card>
               
                <BillingCard style={{width:'100px'}} totalAmount={totalAmount} discount={totalDiscount} currency={currency}/>
                </div>
            </div>
        )
    //}
}

export default CartPage;