import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <div className="py-3">
        <h1
          className="section-title text-center py-2"
          style={{ fontStyle: "oblique" }}
        >
          Payment Method
        </h1>
        <Form onSubmit={submitHandler} className="text-center">
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <br />
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card or Debit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <br />
              <Form.Check
                type="radio"
                label="Pay on Delivery"
                id="delivery"
                name="paymentMethod"
                value="Pay on Delivery "
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="btn-plus">
            Continue
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default PaymentScreen;
