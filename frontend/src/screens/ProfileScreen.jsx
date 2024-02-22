import React, { useState, useEffect } from 'react';
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';


export default function ProfileScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


    const dispatch = useDispatch();

    const navigate = useNavigate();
    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading:loadingORders, error:errorOrders, orders } = orderListMy;

    const submitHnadler = (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ 'id': user._id, 'name': name, 'email': email, 'password':password }))
            setMessage('')
        }
    
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || success || userInfo._id !== user._id) {
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, user, navigate, success])

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant={'danger'}>{message}</Message>}
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHnadler}>

            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmpassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' style={{ marginTop: '0.8rem' }}>Update</Button>
        </form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingORders ? (
            <Loader />
        ) : errorOrders ? (
            <Message variant={'danger'}>{error}</Message>
        ): (
            <Table striped responsive className='table-sm' variant='dark'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                   {orders && orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                            <FaTimes color='red' />
                        )}</td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button className='btn-sm'>Details</Button>
                            </LinkContainer>
                        </td>
                    </tr>
                   ))} 
                </tbody>

            </Table>
        )}
      </Col>
    </Row>
  )
}
