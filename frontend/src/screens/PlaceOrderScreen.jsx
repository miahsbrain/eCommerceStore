import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';


export default function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate);
    const {order, error, success} = orderCreate;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    useEffect(()=>{

        if (!cart.paymentMethod) {
            navigate('/payment');
        }

        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [success, navigate, dispatch, cart, order]);

    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
    cart.taxPrice = ((0.082) * Number(cart.itemsPrice)).toFixed(2);
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


  return (
    <div>
        <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                              <strong>Shipping:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, &nbsp;{cart.shippingAddress.postalCode}, &nbsp;{cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment method</h2>
                        <p>
                              <strong>Method:</strong> {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order items</h2>
                        {cart.cartItems.length === 0 ? 
                        (<Message variant='info'>Your cart is empty</Message>) :
                        (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index + 1}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            {error && <Message variant={'danger'}>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type='button' style={{display:'block', width:'100%'}} disabled={cart.cartItems.length === 0} onClick={placeOrder}>Place order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}
