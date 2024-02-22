import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';


export default function Header() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  }

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  return (
    <header>
      <Navbar expand="lg" variant='dark' className="bg-dark" collapseOnSelect>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>Concept Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <SearchBox />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <LinkContainer to={"/cart"}>
                <Nav.Link><FaShoppingCart size={'15px'} /> Cart</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to={'/profile'}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) :
              (
                <LinkContainer to={"/login"}>
                  <Nav.Link><FaUser size={'15px'} /> Login</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={'Admin'} id='username'>
                  <LinkContainer to={'/admin/userlist'}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to={'/admin/productlist'}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to={'/admin/orderlist'}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
