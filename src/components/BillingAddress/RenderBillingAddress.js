import { React, useEffect, useState } from 'react';
import { Card, Col, Form, Input, Row,Select } from "antd";
import styles from "../../styles/index.module.css";
import { Button } from "@mui/material";
import { useProductCheckoutContext } from "../../Context/ProductsContext";
import { ADRRESS_VIEW_TYPE } from "../../constants";
import { updateCheckoutAddressDetails } from '../../common/customhooks/useGetProducts';
import { API_ENDPOINTS } from '../../constants/apiConstants';
import { ClipLoader } from 'react-spinners';
const { Option } = Select;
export default function RenderBillingAddress(props) {
    const { viewName, goToSelectAddress } = props;
    const [form] = Form.useForm();
    const { addressContext, setAddressContext, setCurrentAddressId, setAddressList, addressList ,selectedProducts} = useProductCheckoutContext();
    const [country, setCountry] = useState(addressContext?.country || ''); // Initialize with the current country
    const {updateAddressDetails} = updateCheckoutAddressDetails();
    const [spinner,setSpinner] = useState(false);
    useEffect(() => {
        if (viewName === ADRRESS_VIEW_TYPE.LIST_VIEW) {
            form.setFieldsValue(addressContext);
        } else {
            form.resetFields();
        }
    }, [viewName, addressContext, form]);

    const onReset = () => {
        form.resetFields();
    }
    const onFinish = (value) => {
        if (viewName === ADRRESS_VIEW_TYPE.LIST_VIEW) {
            setAddressContext((prevAddress) => ({ ...prevAddress, ...value }));
            setAddressList(addressList.map((address) => address.id === addressContext.id ? { ...addressContext, ...value } : address));
        } else {
            const id = Date.now();
            const newAddress = { ...value, isPrimary: false, id }
            setAddressContext(newAddress);
            setCurrentAddressId(id);
            setAddressList([...addressList, newAddress]);
            goToSelectAddress();
        }
        const payload = {
            "products":selectedProducts,
            "address":value
        }
        updateAddressDetails(API_ENDPOINTS.UPDATE_CHECKOUT_DETAILS,payload,setSpinner);

    };

    if (spinner) {
        return (<div className="spinner">
                <ClipLoader color={"#123abc"} loading={spinner} size={50} />
          </div>)
      }

    const mobileValidator = (formInstance) => ({
        validator() {
            const country = formInstance.getFieldValue("country");
            const mobileNumber = formInstance.getFieldValue("mobile");
            let mobileNumberRegex;

            switch (country) {
                case 'India':
                    mobileNumberRegex = /^[6-9]\d{9}$/;
                    break;
                case 'US':
                case 'Canada':
                    mobileNumberRegex = /^[2-9]\d{2}[2-9](?!11)\d{6}$/;
                    break;
                case 'London':
                    mobileNumberRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
                    break;
                default:
                    return Promise.reject(new Error("Please select a valid country"));
            }

            if (mobileNumberRegex.test(mobileNumber)) {
                return Promise.resolve();
            }

            return Promise.reject(new Error("Please enter a correct mobile number"));
        }
    });
    const handleMobileChange = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        form.setFieldsValue({ mobile: numericValue });
    };


    const emailValidator = {
        type: 'email',
        message: 'Please enter a valid email address',
    };
    const getPincodeValidator = (country) => {
        switch (country) {
            case 'India':
                return {
                    pattern: /^\d{6}$/,
                    message: 'Please enter a valid 6-digit pincode',
                };
            case 'US':
                return {
                    pattern: /^\d{5}(-\d{4})?$/,
                    message: 'Please enter a valid 5-digit or 9-digit ZIP code',
                };
            case 'Canada':
                return {
                    pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                    message: 'Please enter a valid Canadian postal code',
                };
            case 'London':
                return {
                    pattern: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
                    message: 'Please enter a valid UK postcode',
                };
            default:
                return {
                    pattern: /.*/,
                    message: 'Please enter a valid pincode',
                };
        }
    };
    const handleValuesChange = (changedValues) => {
        if (changedValues.country) {
            setCountry(changedValues.country);
        }
    };

    const getPincodeMaxLength = (country) => {
        switch (country) {
            case 'India':
                return 6;
            case 'US':
                return 10; // 5 digits + optional 4 digits with hyphen
            case 'Canada':
                return 7; // A1A 1A1 format
            case 'London':
                return 8; // SW1A 1AA format
            default:
                return 10;
        }
    };

    const cityValidator = {
        validator(_, value) {
            if (value && value.length < 2) {
                return Promise.reject(new Error('City must be at least 2 characters long'));
            } else if (value && value.length > 50) {
                return Promise.reject(new Error('City must be at most 50 characters long'));
            }
            return Promise.resolve();
        }
    };

    const addressLineValidator = {
        validator(_, value) {
            if (value && value.length < 5) {
                return Promise.reject(new Error('Address Line must be at least 5 characters long'));
            } else if (value && value.length > 50) {
                return Promise.reject(new Error('Address Line must be at most 50 characters long'));
            }
            return Promise.resolve();
        }
    };
    const nameValidator = {
        validator(_, value) {
            if (value && value.length < 2) {
                return Promise.reject(new Error('Name must be at least 2 characters long'));
            } else if (value && value.length > 50) {
                return Promise.reject(new Error('Name must be at most 50 characters long'));
            }
            return Promise.resolve();
        }
    };
    
    return (
        <Card className={styles.addressCard}>
            <Form form={form} layout="vertical"  onValuesChange={handleValuesChange} onFinish={onFinish} initialValues={(viewName === ADRRESS_VIEW_TYPE.LIST_VIEW) ? addressContext : {}}>
                <Row gutter={{
                    sm: 4,
                    lg: 16,
                    xs: 4
                }} >
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"First Name: "}
                            name="firstName"
                            rules={[{ required: true, message: "Please enter your first name" },nameValidator]}
                        >
                            <Input placeholder="First Name" ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Last Name:"}
                            name="lastName"
                            rules={[{ required: false, message: "Please enter your last name" }, nameValidator]}

                        >
                            <Input placeholder="Last Name" ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Flat No.:"}
                            name="flatNo"
                        >
                            <Input placeholder="Flat No./Building name"></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Building Name:"}
                            name="buildingName"
                            rules={[{ required: true, message: "Please enter your building name" },nameValidator]}

                        >
                            <Input placeholder="Building name"></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Address Line1:"}
                            name="addressLine1"
                            rules={[{ required: true, message: "Please enter address line1" },addressLineValidator]}

                        >
                            <Input placeholder="Address Line1"></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Address Line2:"}
                            name="addressLine2"
                            rules={[{ required: false, message: "Please enter address line2" },addressLineValidator]}

                        >
                            <Input placeholder="Address Line2"></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"City:"}
                            name="city"
                            rules={[{ required: true, message: "Please enter your town or city" },cityValidator]}
                        >
                            <Input placeholder="Town / City"></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"State:"}
                            name="state"
                            rules={[{ required: true, message: "Please enter your state" }]}
                        >
                            <Input placeholder="State"></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Country:"}
                            name="country"
                            rules={[{ required: true, message: "Please enter your country" }]}
                        >
                            {/* <Input placeholder="Country"></Input> */}
                            <Select placeholder="Select Country">
                                <Option value="India">India</Option>
                                <Option value="US">US</Option>
                                <Option value="Canada">Canada</Option>
                                <Option value="London">London</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Pincode:"}
                            name="pincode"
                            rules={[{ required: true, message: "Please enter your pincode" }, ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const country = getFieldValue('country');
                                    const pincodeValidator = getPincodeValidator(country);
                                    if (pincodeValidator.pattern.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(pincodeValidator.message));
                                }
                            })
                        ]}
                        >
                            <Input
                                placeholder="Pincode"
                                maxLength={getPincodeMaxLength(country)}
                            ></Input>
                        </Form.Item>
                    </Col>
                    
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Mobile Number:"}
                            name="mobile"
                            rules={[{ required: true, message: "Please enter your valid mobile number" }, mobileValidator]}
                            type="number"
                        >
                            <Input placeholder="Mobile" onChange={handleMobileChange}></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Form.Item
                            label={"Email Address::"}
                            name="email"
                            rules={[{ required: true, message: "Please enter your valid email" },emailValidator]}
                            type="email"
                        >
                            <Input placeholder="Email"></Input>
                        </Form.Item>
                    </Col>
                </Row>
                {
                    viewName === ADRRESS_VIEW_TYPE.SHOW_NEW && <div className={styles.buttonContainer}>
                        <Button onClick={onReset}>RESET</Button>
                        <Button type="primary" htmlType="submit">Save and Use</Button>
                    </div>
                }

                {viewName === ADRRESS_VIEW_TYPE.LIST_VIEW && <div className={styles.buttonContainer}>
                    <Button onClick={onReset}>RESET</Button>
                    <Button type="primary" htmlType="submit">SAVE</Button>
                </div>
                }
            </Form>
        </Card>
    )
}