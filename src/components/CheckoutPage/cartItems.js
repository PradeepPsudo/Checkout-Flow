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
    // const handleProductQuantity = (quantity)=>{
    //     if (quantity >= 1 && quantity <= 100) {
    //         setProductQuantity((prevQuantity) => {
    //             return { ...prevQuantity, [productId]: quantity };
    //         });
    //     }
    // }

    // const handleInputChange = (value) => {
    //     if (value >= 1 && value <= 100) {
    //         handleProductQuantity(value);
    //     }
    // }

    const handleProductQuantity = (quantity) => {
        if (quantity >= 1 && quantity <= 100) {
            setProductQuantity((prevQuantity) => {
                return { ...prevQuantity, [productId]: quantity };
            });
        } else if (quantity < 1) {
            setProductQuantity((prevQuantity) => {
                return { ...prevQuantity, [productId]: 0 };
            });
        }
    }

    const handleInputChange = (value) => {
        if (value >= 1 && value <= 100) {
            handleProductQuantity(value);
        } else if (value < 1) {
            handleProductQuantity(1);
        }
    }


    return(
        <Card key={index} className={styles.billingCard}>
            <Row justify={"space-around"} align={"center"}>
                <Col sm={{span:6}} xs={{span: 0}}><Text>{title}</Text></Col>
                <Col sm={{span: 4}} xs={{span: 0}}><Text>{currency}{priceBeforeDiscount}</Text></Col>
                <Col span={4}><Text>{currency}{discountedAmount}</Text></Col>
                <Col span={4}><InputNumber className={styles.inputNumber} min={1} max={100} value={productQuantity[productId]} onChange={handleInputChange} onBlur={(e) => handleInputChange(Number(e.target.value))}/></Col>

                <Col span={4}><Text>{currency}{priceAfterDiscount}</Text></Col>
            </Row>
        </Card>
    )
}

export default CartItemCard;