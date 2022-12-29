import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../Redux/actions/auth.actions';
import styled from 'styled-components';
const StyledHeaderPage = styled.div`
background-color: #dfe7fd;
`;

const Header = ({ isLoggedIn, logout }) => {
  return (
    <StyledHeaderPage>
    <Navbar>
      <Navbar.Brand href='/'>
        <h3 className='primary-text my-4 ml-4'>
          <strong>URL Kısaltıcı</strong>
           <img src='/images/iconmonstr-link-thin-48.png'/> 
        </h3>
      </Navbar.Brand>
      {!isLoggedIn ? (
        <Nav className='ml-auto mr-4 my-4 success'  >
          <Nav.Link href='/login' >Giriş Yap</Nav.Link>
        </Nav>
      ) : (
        <Nav className='ml-auto mr-4 my-4'>
          <Nav.Link onClick={logout}>Çıkış Yap</Nav.Link>
        </Nav>
      )}
    </Navbar>
    </StyledHeaderPage>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
