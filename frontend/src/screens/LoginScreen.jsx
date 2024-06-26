import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [params] = useSearchParams();
    const dispatch = useDispatch();

    const redirect = window.location.search ? params.get('redirect') : '/';
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin

    const submitHnadler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(()=> {
        if (userInfo) {
            navigate(`${redirect}`)
        }
    }, [userInfo, navigate, redirect])

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant={'danger'}>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHnadler}>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' style={{marginTop:'0.8rem'}}>Sign in</Button>
      </form>
      <Row className='py-2'>
        <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
      </Row>
    </FormContainer>
  )
}