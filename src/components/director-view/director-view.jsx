import React from "react";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/button";
import "./director-view.scss";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>

        <div className="director-birth">
          <span className="label">Birth Year: </span>
          <span className="value">{movie.Director.Birth}</span>
        </div>

        <div className="director-death">
          <span className="label">Death Year: </span>
          <span className="value">{movie.Director.Death}</span>
        </div>

        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="info">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="info">Genre</Button>
        </Link>

        <Link to={`/`}>
          <Button variant="secondary">Back</Button>
        </Link>

      </div>
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
