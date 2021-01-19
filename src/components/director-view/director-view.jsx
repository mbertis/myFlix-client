import React from "react";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/button";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import "./director-view.scss";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="d-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>

        <div className="director-birth">
          <span className="label">Birth Year: </span>
          <span className="value">{director.Birth}</span>
        </div>

        <div className="director-death">
          <span className="label">Death Year: </span>
          <span className="value">{director.Death}</span>
        </div>

        <Link to={`/`}>
          <Button variant="secondary">Back to Movies</Button>
        </Link>

        <Container>
          <h4 className="mt-4">Some {director.Name} movies</h4>
          <div className="d-flex row">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Name) {
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