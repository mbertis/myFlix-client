import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./main-view.scss";

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

  getMovies(token) {
    axios.get("https://madison-myflix.herokuapp.com/movies", {
      headers: {Authorization: "Bearer ${token}"}
    })
    .then(response => {
      // Assign result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }
  /*When a movie is clicked, this function updates the state of the 'selectedMovie' property to that selected movie*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  /*When a user successfully logs in, this function updates the 'user' property in state to that particular user*/
  onLoggedIn(authData) {
    console.log(authData);  //need both user and token. When a user logs in, the props onLoggedIn(data) is passed to LoginView and triggers onLoggedIn(authData) in MainView. This updates state with authData.
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);    //auth information received from handleSubmit method is stored in localStorage
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  buttonClick() {
    this.setState({
      selectedMovie: null,
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
        <div className="container">
          <div className="row">
            {/* <div className="col-sm"> */}
              {/* <Container fluid> */}
              {/* If the state of 'selectedMovie' is not null, that selected movie will be returned. Otherwise, all movies will be returned */}
              {selectedMovie ? (
                <MovieView
                  movie={selectedMovie}
                  buttonProp={() => this.buttonClick()}
                />
              ) : (
                movies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={(movie) => this.onMovieClick(movie)}
                  />
                ))
              )}
            {/* </div> */}
          </div>
        </div>
        {/* </Container> */}
      </div>
    );
  }
}
