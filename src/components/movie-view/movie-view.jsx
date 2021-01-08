import React from "react";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/button";
import "./movie-view.scss";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // This function causes the back button to reload the MainView page
  // refreshPage() {
  //   window.location.reload(false);
  // }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>

        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
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

MovieView.propTypes = {
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
