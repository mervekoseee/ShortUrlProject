import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  getDashboard,
  deleteUrl,
  searchUrl,
} from '../Redux/actions/dashboard.actions';

const DashboardTable = ({ dashboard, getDashboard, deleteUrl, searchUrl }) => {
  const [search, setSearch] = useState('');
  const [baseUrl] = useState(() =>
    process.env.NODE_ENV === 'production'
      ? window.location.hostname
      : window.location.hostname + ':' + window.location.port
  );

  useEffect(() => {
    getDashboard();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const clearSearch = () => {
    window.location.reload();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    searchUrl(search);
  };
  return dashboard.loading ? (
    <div>Yükleniyor...</div>
  ) : (
    <>
      <ToastContainer />
      <Form className='my-4' onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label> Uzun URL Ara :</Form.Label>
          <Form.Control
            type='text'
            placeholder='Orijinal Url girniz'
            name='search'
            value={search}
            onChange={(e) => handleChange(e)}
            style={{ width: '22rem' }}
          />
        </Form.Group>
        <Button variant='secondary' type='submit'>
          Ara
        </Button>
        <Button
          variant='secondary'
          className='ml-4'
          onClick={() => clearSearch()}
        >
          Temizle
        </Button>
      </Form>
      <Table striped bordered hover responsive className='my-4'>
        <thead>
          <tr>
            <th>Orijinal URL</th>
            <th>Kısa URL</th>
            <th>Tıklanma Sayısı</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {dashboard.urls.map((url) => (
            <tr key={url._id}>
              <td>
                <a href={url.longUrl}>{url.longUrl}</a>
              </td>
              <td>
                <a href={`/${url.shortUrl}`}>{`${baseUrl}/${url.shortUrl}`} </a>
                <span className='copy-btn'>
                  <Button
                    size='sm'
                    variant='success'
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${baseUrl}/${url.shortUrl}`.trim()
                      );
                      toast.success('Kopyalandı!');
                    }}
                  >
                    Copy
                  </Button>
                </span>
              </td>
              <td>{url.clicks}</td>
              <td>
                <Button variant='danger' onClick={() => deleteUrl(url._id)}>
                  <i className='fa fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboard: () => dispatch(getDashboard()),
    deleteUrl: (id) => dispatch(deleteUrl(id)),
    searchUrl: (longUrl) => dispatch(searchUrl(longUrl)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTable);
