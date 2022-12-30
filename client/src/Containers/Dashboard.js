import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import ShortenUrlCard from '../Components/ShortenUrlCard';
import DashboardTable from '../Components/DashboardTable';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Footer from '../Components/Footer';

const Dashboard = ({ user }) => {
  return (
    <>
      <Header />
      <Container className='center-content my-4'>
        <legend className='text-center'>
          Hoşgeldin <span className='primary-text'>{user}</span> !
        </legend>
        <ShortenUrlCard />
        ya da
        <div id="options" className='center-content my-4'>
      <span>Kısaltılmış linkinizi özelleştirmek ister misiniz?: </span>
      <label className="custom-container" htmlFor="custom">
        urlshortener.cc/
        <input
          id="custom"
          type="text"
          name="custom"
          placeholder="özel linkinizi buraya yazın"
          maxLength="25"
          className="custom"
        />
      </label>
      <Button className='btn btn-success'>Kısalt!
      </Button>
    </div>
        <Nav className='ml-auto mr-4 my-4'>
          <Nav.Link href='/status'>İstatistikleri Görüntüle</Nav.Link>
        </Nav>
      </Container>
      <Footer/>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
