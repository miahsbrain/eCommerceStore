import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


export default function ShippingScreen() {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address ? shippingAddress.address : '');
    const [city, setCity] = useState(shippingAddress.city ? shippingAddress.city : '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode ? shippingAddress.postalCode : '');
    const [country, setCountry] = useState(shippingAddress.country ? shippingAddress.country : '');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment');
    }

  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} />
      <Form onSubmit={submitHandler}>
        <h1>Shipping</h1>
        <Form.Group controlId='name'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} required></Form.Control>
        </Form.Group>
        
        <Form.Group controlId='name'>
            <Form.Label>City</Form.Label>
            <Form.Control type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
            <Form.Label>Postal code</Form.Label>
            <Form.Control type='text' placeholder='Enter address' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
            <Form.Label>Country</Form.Label>
            <Form.Control type='text' placeholder='Enter country' value={country} onChange={(e) => setCountry(e.target.value)} required></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>Continue</Button>

      </Form>
    </FormContainer>
  )
}
