import { Card, Col, InputNumber, Row, Typography } from "antd";
import styles from "./index.module.css";
import { CURRENCY_TYPE } from "../../constants";
import { useProductCheckoutContext } from "../../Context/ProductsContext";
const { Text } = Typography;

function CartItemCard(props){
    const { index, item } = props;
    const {productDetails,pricingDetails} = item;
    const {name:title,productId} = productDetails;
    const {totalAmount,discountedPrice}= pricingDetails;
    const {productQuantity,setProductQuantity} = useProductCheckoutContext();
    const quantity = productQuantity[productId];
    const priceAfterDiscount = discountedPrice?.value ? (totalAmount.value*quantity - discountedPrice.value*quantity):(totalAmount.value*quantity);
    const priceBeforeDiscount = (totalAmount.value * quantity);
    const discountedAmount =   priceBeforeDiscount-priceAfterDiscount;
    const currency = CURRENCY_TYPE[totalAmount?.currency] || CURRENCY_TYPE.USD;
    const handleProductQuantity = (quantity)=>{
        setProductQuantity((prevQuantity)=>{
            return {...prevQuantity,[productId]:quantity }
        })
    }

    return(
        <Card key={index} className={styles.billingCard}>
            <Row justify={"space-around"} align={"center"}>
                <Col sm={{span:6}} xs={{span: 0}}><Text>{title}</Text></Col>
                <Col sm={{span: 4}} xs={{span: 0}}><Text>{currency}{priceBeforeDiscount}</Text></Col>
                <Col span={4}><Text>{currency}{discountedAmount}</Text></Col>
                <Col span={4}><InputNumber className={styles.inputNumber} min={1} max={100} value={productQuantity[productId]} onChange={(quantity) => handleProductQuantity(quantity)} /></Col>

                <Col span={4}><Text>{currency}{priceAfterDiscount}</Text></Col>
            </Row>
        </Card>
    )
}

export default CartItemCard;