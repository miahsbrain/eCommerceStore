import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentScreen() {

    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();

    const [paymentMethod, setPAymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1={true} step2={true} step3={true} />
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>Select method</Form.Label>
                <Col>
                    <Form.Check type='radio' label={'PayPal or Credit Card'} id='paypal' name='paymentMethod' checked onChange={(e) => setPAymentMethod(e.target.value)} >
                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}
