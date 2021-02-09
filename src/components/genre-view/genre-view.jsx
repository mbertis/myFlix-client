import React from "react";
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Card
} from "react-bootstrap";
import "./genre-view.scss";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Genre.Description}</span>
        </div>

        <Link to={`/`}>
          <Button variant="secondary">Back to Movies</Button>
        </Link>

        <Container>
        <h4 className="mt-4">Some {genre.Genre.Name} movies</h4>
        <div className="d-flex row">
          {movies.map((movie) => {
            if (movie.Genre.Name === genre.Genre.Name) {
              return (
                <div key={movie._id}>
                  <Card
                    className="mb-3 mr-2 h-100"
                    style={{ width: '16rem' }}
                  >
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Link
                        className="text-muted"
                        to={`/movies/${movie._id}`}
                      >
                        <Card.Title>{movie.Title}</Card.Title>
                      </Link>
                      <Card.Text>
                        {movie.Description.substring(0, 90)}...
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0">
                      <Link to={`/movies/${movie._id}`}>
                        <Button
                          variant="info"
                          className="read-more-link"
                        >
                          Read more
                        </Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </div>
              );
            }
          })}
        </div>
      </Container>

      </div>
    );
  }
}
