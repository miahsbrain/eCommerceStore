import React, { useEffect } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers, deleteUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';


export default function UserListScreen() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success:successDelete } = userDelete;


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));
        }
    }

    useEffect(()=>{
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate('/login')
        }

    }, [dispatch, userInfo, navigate, successDelete])

  return (
    <div>
      <h1>Users</h1>
      {loading ? (<Loader />) :
      error ? (<Message variant={'danger'}>{error}</Message>) :
      (
        <Table striped bordered hover responsive className='table-sm' variant='dark'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {users && users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? (
                            <FaCheck color='green' />
                        ) : (
                            <FaTimes color='red' />
                        ) }</td>
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'><FaEdit /></Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(user._id)}><FaTrash /></Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
      )}
    </div>
  )
}
