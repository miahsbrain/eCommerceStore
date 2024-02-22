import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

export default function RegisterScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


    const [params] = useSearchParams();
    const dispatch = useDispatch();

    const redirect = window.Location.search ? params.get('q') : '/';
    const navigate = useNavigate();
    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])


  return (
    <FormContainer>
        <h1>Sign in</h1>
        {message && <Message variant={'danger'}>{message}</Message>}
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>

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
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmpassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' style={{ marginTop: '0.8rem' }}>Register</Button>
        </form>
        <Row className='py-2'>
            <Col>New Customer? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Register</Link></Col>
        </Row>
    </FormContainer>
  )
}
