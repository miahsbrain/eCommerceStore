import React, { useEffect } from 'react';
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOrders } from '../actions/orderActions';
import { useNavigate } from 'react-router-dom';


export default function OrderListScreen() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate('/login')
        }

    }, [dispatch, userInfo, navigate])

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (<Loader />) :
                error ? (<Message variant={'danger'}>{error}</Message>) :
                    (
                        <Table striped bordered hover responsive className='table-sm' variant='dark'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <FaTimes color='red' />
                                        )}</td>
                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <FaTimes color='red' />
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}/`}>
                                                <Button variant='light' className='btn-sm'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}
