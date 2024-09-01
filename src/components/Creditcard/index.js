import React, { useEffect } from "react";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCardForm.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useForm from "./UseForm";
import "../../styles/creditcard.css";


const CreditCardForm = (props) => {
  const {setDisabledPlaceOrder,onDone} = props;
  const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();
  useEffect(()=>{

        const isEmpty = Object.keys(values).find((key)=>values[key] === "");
        setDisabledPlaceOrder(isEmpty);
        if(!isEmpty){
          onDone && onDone(values);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[values]);
  return (
    <div>
      <div className="container">
        <div className="box justify-content-center align-items-center">
          <div className="formDiv">
          <div className="creditCard">
          <Cards
            cvc={values.cardSecurityCode}
            expiry={values.cardExpiration}
            focused={values.focus}
            name={values.cardName}
            number={values.cardNumber}
          />
          </div>
          <Form onSubmit={handleSubmit} className="credit-card-form">
            <Form.Group>
              <Form.Control
                type="text"
                id="cardName"
                data-testid="cardName"
                name="cardName"
                placeholder="Cardholder Name"
                value={values.cardName}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cname}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                id="cardNumber"
                data-testid="cardNumber"
                name="cardNumber"
                placeholder="Card Number"
                value={values.cardNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cnumber}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="cardType"
                    id="cardType"
                    data-testid="cardType"
                    placeholder="Card Type"
                    value={values.cardType}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.ctype}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="cardExpiration"
                    data-testid="cardExpiration"
                    name="cardExpiration"
                    placeholder="Expiration Date"
                    value={values.cardExpiration}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cexp}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="number"
                    id="cardSecurityCode"
                    data-testid="cardSecurityCode"
                    name="cardSecurityCode"
                    placeholder="Security Code"
                    value={values.cardSecurityCode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.ccvv}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="cardPostalCode"
                    data-testid="cardPostalCode"
                    name="cardPostalCode"
                    placeholder="Postal Code"
                    value={values.cardPostalCode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cpostal}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              size={"block"}
              data-testid="validateButton"
              id="validateButton"
              type="submit"
            >
              Validate
            </Button>
          </Form>
          </div>
           <Alert
            id="alertMessage"
            data-testid="alertMessage"
            variant={errors.variant}
            show={errors.show}
          >
            {errors.message}
          </Alert>
          
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;


// import React, { useState } from 'react';
// import Cards from 'react-credit-cards-2';
// import 'react-credit-cards-2/dist/es/styles-compiled.css';


// const PaymentForm = () => {
//   const [state, setState] = useState({
//     number: '',
//     expiry: '',
//     cvc: '',
//     name: '',
//     focus: '',
//   });

//   const handleInputChange = (evt) => {
//     const { name, value } = evt.target;
    
//     setState((prev) => ({ ...prev, [name]: value }));
//   }

//   const handleInputFocus = (evt) => {
//     setState((prev) => ({ ...prev, focus: evt.target.name }));
//   }

//   return (
//     <div>
//       <Cards
//         number={state.number}
//         expiry={state.expiry}
//         cvc={state.cvc}
//         name={state.name}
//         focused={state.focus}
//       />
//       <form>
//         <input
//           type="number"
//           name="number"
//           placeholder="Card Number"
//           value={state.number}
//           onChange={handleInputChange}
//           onFocus={handleInputFocus}
//         />
//         ...
//       </form>
//     </div>
//   );
// }

// export default PaymentForm;