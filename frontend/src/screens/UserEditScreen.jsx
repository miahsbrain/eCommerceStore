import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants';


export default function UserEditScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const userId = useParams('id').id;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;
    
    const userUpdate = useSelector(state => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id: user._id, name, email, isAdmin}));   
    }

    useEffect(() => {

        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET});
            navigate('/admin/userlist')

        } else {

            if (!user || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }

    }, [user, userId, dispatch, successUpdate, navigate])


    return (
        <div>
            <Link to={`/admin/userlist`}>Go Back</Link>
            <FormContainer>
                <h1>Edit user</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}

                {loading ? (<Loader />) :
                error ? (<Message variant={'danger'}>{error}</Message>) :
                (<form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isAdmin'>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} ></Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='primary' style={{ marginTop: '0.8rem' }}>Update</Button>
                </form>)}

            </FormContainer>
        </div>
    )
}
