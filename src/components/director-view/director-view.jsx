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
    const { director } = this.props;

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
          <Button variant="secondary">Home</Button>
        </Link>

      </div>
    );
  }
}