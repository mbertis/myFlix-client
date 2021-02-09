import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card
} from "react-bootstrap";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {     //Exporting <MovieCard/> here allows it to be imported into 'MainView'
  render() {
    //This is given to the <MovieCard/> component by 'MainView' as 'MainView' is connected to my db via /movies endpoint
    const { movie } = this.props;

    return (
      <Card className="movie-card" style={{width: '16rem'}}>
        <Card.Img variant="top" src={movie.ImagePath}/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
          <Button variant="info">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};