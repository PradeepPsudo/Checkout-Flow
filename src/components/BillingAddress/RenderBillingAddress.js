import {React, useEffect} from 'react';
import {  Card, Col, Form, Input, Row } from "antd";
import styles from "../../styles/index.module.css";
import { Button } from "@mui/material";
import { useProductCheckoutContext } from "../../Context/ProductsContext";
import {  ADRRESS_VIEW_TYPE } from "../../constants";

export default function RenderBillingAddress(props) {
    const {viewName,goToSelectAddress} = props;
    const [form] = Form.useForm();
    const {addressContext,setAddressContext,setCurrentAddressId,setAddressList,addressList} = useProductCheckoutContext();

    useEffect(() => {
        if (viewName === ADRRESS_VIEW_TYPE.LIST_VIEW) {
            form.setFieldsValue(addressContext);
        } else {
            form.resetFields();
        }
    }, [viewName, addressContext, form]); 
   
    const onReset = ()=>{
        form.resetFields();
    }
    const onFinish = (value) => {
        if(viewName ===ADRRESS_VIEW_TYPE.LIST_VIEW ){
            setAddressContext((prevAddress)=> ({...prevAddress, ...value}));
            setAddressList(addressList.map((address)=> address.id === addressContext.id ? {...addressContext, ...value} : address));
        }else{
            const id =   Date.now();
            const newAddress = {...value,isPrimary:false, id}
            setAddressContext(newAddress);
            setCurrentAddressId(id);
            setAddressList( [...addressList,newAddress]);
            goToSelectAddress();
        }
        
    };

    const mobileValidator = (formInstance) => ({
        validator(){
            const mobileNumberRegex = /(0|91)?[6-9][0-9]{9}/;
            const mobileNumber = formInstance.getFieldValue("mobile");
            if(mobileNumberRegex.test(mobileNumber)){
                return Promise.resolve();
            }
            return Promise.reject(new Error("Please enter a correct mobile number"));
        }
    });
    return(
        <Card className={styles.addressCard}>
                {/* <div className={styles.heading}>Add Billing Address</div> */}
                <Form form={form} layout="vertical" onFinish={onFinish}  initialValues={(viewName ==ADRRESS_VIEW_TYPE.LIST_VIEW)?addressContext:{}}>
                    <Row gutter={{
                            sm: 4,
                            lg: 16,
                            xs: 4
                        }} >
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"First Name: "}
                                name="firstName"
                                rules={[{required: true, message: "Please enter your first name"}]}
                            >
                                <Input placeholder="First Name" ></Input>  
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"Last Name:"}
                            name="lastName"
                            >
                                <Input placeholder="Last Name" ></Input>  
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"Flat No.:"}
                            name="flatNo"
                            >
                                <Input placeholder="Flat No./Building name"></Input>  
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"Building Name:"}
                            name="buildingName"
                            rules={[{required: true, message: "Please enter your building name"}]}

                            >
                                <Input placeholder="Building name"></Input>  
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Address Line1:"}
                                name="addressLine1"
                                rules={[{required: true, message: "Please enter address line1"}]}

                            >
                                <Input placeholder="Address Line1"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Address Line2:"}
                                name="addressLine2"
                                rules={[{required: false, message: "Please enter address line2"}]}

                            >
                                <Input placeholder="Address Line2"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"City:"}
                            name="city"
                            rules={[{required: true, message: "Please enter your town or city"}]}
                            >
                                <Input placeholder="Town / City"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"State:"}
                                name="state"
                                rules={[{required: true, message: "Please enter your state"}]}
                            >
                                <Input placeholder="State"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"Pincode:"}
                            name="pincode"
                            rules={[{required: true, message: "Please enter your pincode"}]}
                            >
                                <Input 
                                    placeholder="Pincode" 
                                    type="number"
                                    maxLength={6}
                                ></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Country:"}
                                name="country"
                                rules={[{required: true, message: "Please enter your country"}]}
                            >
                                <Input placeholder="Country"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Mobile Number:"}
                                name="mobile"
                                rules={[{required: true, message: "Please enter your valid mobile number"}, mobileValidator]}
                                type="number"
                            >
                                <Input placeholder="Mobile"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Email Address::"}
                                name="email"
                                rules={[{required: true, message: "Please enter your valid email"}]}
                                type="email"
                            >
                                <Input placeholder="Email"></Input>
                            </Form.Item>
                        </Col>
                        {/* <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Make Primary:"}
                                rules={[{required: false, message: ""}]}
                                type="checkbox"
                                name="isPrimary"
                            >
                                <Input  type="checkbox"></Input>
                            </Form.Item>
                        </Col> */}
                    </Row>
                    {
                        viewName ==ADRRESS_VIEW_TYPE.SHOW_NEW && <div className={styles.buttonContainer}>
                         <Button onClick={onReset}>RESET</Button>
                        <Button type="primary" htmlType="submit">Save and Use</Button>
                    </div>
                    }
                    
                   {viewName ==ADRRESS_VIEW_TYPE.LIST_VIEW && <div className={styles.buttonContainer}>
                        <Button onClick={onReset}>RESET</Button>
                        <Button type="primary" htmlType="submit">SAVE</Button>
                    </div>
                    }
                </Form>
            </Card>
    )
}