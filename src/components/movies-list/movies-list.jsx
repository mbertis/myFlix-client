import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { MovieCard } from '../movie-card/movie-card';

export function MoviesList(props) {
  const { movies } = props;
  let fliteredMovies = movies;

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <Container>
      <Row>
        {/* <Col> */}
        {fliteredMovies.map(m => <Col md={3}><MovieCard key={m._id} movie={m}/></Col>)}
        {/* </Col> */}
      </Row>
    </Container>
    
  </div>;
}

