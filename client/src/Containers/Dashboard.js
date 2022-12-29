import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import ShortenUrlCard from '../Components/ShortenUrlCard';
import DashboardTable from '../Components/DashboardTable';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Dashboard = ({ user }) => {
  return (
    <>
      <Header />
      <Container className='center-content my-4'>
        <legend className='text-center'>
          Hoşgeldin <span className='primary-text'>{user}</span> !
        </legend>
        <ShortenUrlCard />
        
        <Nav className='ml-auto mr-4 my-4'>
          <Nav.Link href='/status'>İstatistikleri Görüntüle</Nav.Link>
        </Nav>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
