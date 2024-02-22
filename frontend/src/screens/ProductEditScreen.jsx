import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from '../api/axios';

export default function ProductEditScreen() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState(0);
    const [uploading, setUploading] = useState(false);


    const productId = useParams('id').id;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { error: errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate;


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('image', file);
        formData.append('product_id', productId);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/products/upload/', formData, config);
            setUploading(false);

            setImage(data);

        } catch (error) {
            setUploading(false)
        }
    }

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/productlist')
        } else {
            if (!product || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }

        }

    }, [product, productId, dispatch, navigate, successUpdate])


    return (
        <div>
            <Link to={`/admin/productlist`}>Go Back</Link>
            <FormContainer>
                <h1>Edit product</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}

                {loading ? (<Loader />) :
                    error ? (<Message variant={'danger'}>{error}</Message>) :
                        (<form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} ></Form.Control>
                            </Form.Group>

                            
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter image' value={image} onChange={(e) => setImage(e.target.value)} ></Form.Control>
                                <Form.Control type="file" className='my-1' onChange={uploadFileHandler} />
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)} ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInStock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type='number' placeholder='Enter stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)} ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as={'textarea'} rows={5} type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary' style={{ marginTop: '0.8rem' }}>Update</Button>
                        </form>)}

            </FormContainer>
        </div>
    )
}
