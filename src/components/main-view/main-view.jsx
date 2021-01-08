import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./main-view.scss";

import { LoginView } from "../login-view/login-view"; //LoginView needs to get user details from MainView
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }
  
  getMovies(token) {
    axios.get('https://madison-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // #1
      this.setState({
      movies: response.data
    });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logout successful');
    alert('You have been successfully logged out');
    window.open('/', '_self');
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
        <Button variant="info" type="submit" onClick={this.logOut}>
          Log Out
        </Button>
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
