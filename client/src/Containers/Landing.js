import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Header from '../Components/Header';
import ShortenUrlCard from '../Components/ShortenUrlCard';
import styled from 'styled-components';
import Footer from '../Components/Footer';

const StyledPage = styled.div`
background-color: #dfe7fd;
`;

const Landing = () => {
  return (
    <>
      <Header />
      <Row className='my-4'>
        <Col sm={6} className='center-content'>
          <legend className='text-center'>Bir URL Kısaltın :</legend>
          <ShortenUrlCard />
          <p
            className='text-center my-4'
            style={{ padding: '20px', fontSize: '1.3rem' }}
          >Özelliklerden faydalanmak için hesap oluşturun!
          </p>
          <p className='text-center my-4'>
            <a href='/signup'>
              <Button variant='primary' size='lg'>
                Üye Ol
              </Button>
            </a>
          </p>
        </Col>
        <Col sm={6} className='center-content'>
          <legend className='text-center'>Özelliklerimiz:</legend>
          <Row className='my-4'>
            <Col sm={6}>
              <p className='text-center'>
                <img
                  src='/images/easy.png'
                  className='img-feature'
                  alt='feature'
                />
              </p>
              <p className='primary-text text-center'>Kullanım kolay ve ücretsizdir</p>
            </Col>
            <Col sm={6}>
              <p className='text-center'>
                <img
                  src='/images/secure.png'
                  className='img-feature'
                  alt='feature'
                />
              </p>
              <p className='primary-text text-center'>Güvenli ve güvenlir</p>
            </Col>
          </Row>
          <Row className='my-4'>
           
            <Col >
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
      </Row>
      <Footer/>
     
    </>
  );
};

export default Landing;
