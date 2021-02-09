import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter } ;
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let fliteredMovies = movies;

  if (visibilityFilter !== "") {
    fliteredMovies = movies.filter(m => m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <Container>
      <Row>
        {/* <VisibilityFilterInput visibilityFilter={visibilityFilter} /> */}
        {fliteredMovies.map((m, index) => <Col key={index} md={3}><MovieCard key={m._id} movie={m}/></Col>)}        
      </Row>
    </Container>
    
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
