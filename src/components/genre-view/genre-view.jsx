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

        <Link to={`/`}>
          <Button variant="secondary">Back to Movies</Button>
        </Link>

      </div>
    );
  }
}
