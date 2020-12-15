import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { LoginView } from "../login-view/login-view"; //LoginView needs to get user details from MainView
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    super();
    //Initializes the state to an empty object so we can destructure (access the state's attributs) it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
    }; //Initializing the state in the conductor allows me to access the state later by writing: const { /*something*/ } = this.state;
  }
  componentDidMount() {
    axios
      .get("https://madison-myflix.herokuapp.com/movies")
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /*When a movie is clicked, this function updates the state of the 'selectedMovie' property to that selected movie*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  /*When a user successfully logs in, this function updates the 'user' property in state to that particular user*/
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /*If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to LoginView*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    //Before movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Container fluid>
          {/* If the state of 'selectedMovie' is not null, that selected movie will be returned. Otherwise, all movies will be returned */}
          {selectedMovie ? (
            <MovieView movie={selectedMovie} />
          ) : (
            movies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={(movie) => this.onMovieClick(movie)}
                  />
            ))
          )}
        </Container>
      </div>
    );
  }
}
