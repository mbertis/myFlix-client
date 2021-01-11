import React from "react";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/button";
import "./genre-view.scss";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

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

        <Link to={`/directors/${genre.Director.Name}`}>
          <Button variant="info">Director</Button>
        </Link>

        <Link to={`/genres/${genre.Genre.Name}`}>
          <Button variant="info">Genre</Button>
        </Link>

        <Link to={`/`}>
          <Button variant="secondary">Back</Button>
        </Link>

      </div>
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
