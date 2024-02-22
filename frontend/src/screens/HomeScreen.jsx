import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useSearchParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';


export default function HomeScreen() {

  const dispatch = useDispatch();
  const [params] = useSearchParams();

  // const keyword = params.get('keyword') ? `?keyword=${params.get('keyword')}` : '';
  const keyword = params.get('keyword') ? window.location.search : '';
  const querypage = params.get('page') ? window.location.search : '';

  const productList = useSelector(state => state.productList);
  const {error, loading, products, page, pages} = productList;

  useEffect(()=>{
    dispatch(listProducts( querypage ? querypage : keyword ));

  }, [dispatch, keyword, querypage])

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant={'danger'}>{error}</Message> :
      <div>
        <Row>
          {products && products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                  <Product product={product} />
              </Col>
          ))}

        <Paginate page={page} pages={pages} keyword={keyword} />
      </Row>
      </div>}
    </div>
  )
}