import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import DashboardTable from '../Components/DashboardTable';
import Header from '../Components/Header';
import styled from 'styled-components';
import { Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
const StyledStatusPage = styled.div`

`;

const Status = ({ user }) => {
  return (
    <>
    <Header/>
   <StyledStatusPage>
      <Container className='center-content my-4'>
      <Col sm={6} className='center-content'>
          <legend className='text-center'>İstatistikler Sayfasına Hoşgeldiniz !</legend>
          <Row className='my-4'>
            <Col>
              <p className='text-center'>
                <img
                  src='/images/analytics.png'
                  className='img-feature'
                  alt='feature'
                />
              </p>
              <p className='primary-text text-center'>
                Bağlantı tıklama sayılarını
                 gösteren kontrol paneli
              </p>
            </Col>
          </Row>
        </Col>
        <DashboardTable />
        <Row className='my-4'>
        <Nav className='ml-auto mr-4 my-4'>
          <Nav.Link href='/dashboard'>Geri Dön</Nav.Link>
        </Nav>
        </Row>
      </Container>
      </StyledStatusPage>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Status);