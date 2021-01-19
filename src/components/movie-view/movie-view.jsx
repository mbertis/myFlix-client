import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/button";
import "./movie-view.scss";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://madison-myflix.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open("/users", "_self");
      });
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

        <Button variant="info" onClick={() => this.addFavorite(movie)}>
          Add Favorite
        </Button>

        <Link to={`/`}>
          <Button variant="secondary">Back to Movies</Button>
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

// import React from "react";
// import PropTypes from "prop-types";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import "./movie-view.scss";

// import { Link } from "react-router-dom";

// import axios from "axios";

// export class MovieView extends React.Component {
//   constructor() {
//     super();

//     this.state = {};
//   }

//   addFavorite(movie) {
//     let token = localStorage.getItem("token");
//     let url =
//       "https://madison-myflix.herokuapp.com/users/" +
//       localStorage.getItem("user") +
//       "/movies/" +
//       movie._id;

//     console.log(token);

//     axios
//       .post(url, "", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         console.log(response);
//         window.open("/client", "_self");
//       });
//   }

//   render() {
//     const { movie, onBackClick } = this.props;

//     if (!movie) return null;

//     return (
//       <Card style={{ width: "40rem" }}>
//         <Card.Body>
//           <Card.Img variant="top" src={movie.ImagePath} />
//           <Card.Title>{movie.Title}</Card.Title>
//           <Card.Text>{movie.Description}</Card.Text>
//           <Link to={`/genres/${movie.Genre.Name}`}>
//             <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
//           </Link>
//           <Link to={`/directors/${movie.Director.Name}`}>
//             <Card.Text>Director: {movie.Director.Name}</Card.Text>
//           </Link>
//           <Link to={`/`}>
//             <Button variant="primary">Home</Button>
//           </Link>
//           {/* <Button variant="link" onClick={() => this.addFavorite(movie)}>
//             Add Favorite
//           </Button> */}
//         </Card.Body>
//       </Card>
//     );
//   }
// }

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }).isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };