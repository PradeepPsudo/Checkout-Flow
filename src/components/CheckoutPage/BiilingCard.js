import { Card } from "antd";
import  "../../styles/billingcard.css";

const BillingCard = ({
    totalAmount, 
    discount, 
    curency 
}) => {
    return(
        <Card bodyStyle={{padding: "32px 15px"}} className="priceCard">
            <h2  className="title">Cart Total</h2>
            <div className="priceSection"><span>Total Amount:</span> <span>{curency}{totalAmount}</span></div>
            <div className="priceSection"><span>Discount:</span> <span>{curency}{discount}</span></div>
            <div className="priceSection"><span>Shipping:</span> <span>Free</span></div>
            <div className="priceSection"><span>Amount To Pay:</span> <span>{curency}{totalAmount-discount}</span></div>
            {/* <Button type={BUTTON_TYPE.PRIMARY} onClick={handlePay}>PROCEED TO PAY</Button> */}
        </Card>
    )
}

export default BillingCard;