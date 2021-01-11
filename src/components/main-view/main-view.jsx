import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./main-view.scss";

import { BrowserRouter as Router, Route} from "react-router-dom";

import { LoginView } from "../login-view/login-view"; //LoginView needs to get user details from MainView
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";

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
      headers: { Authorization: `Bearer ${token}`}  // This type of notation is very important, not regular "" or ''
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

  // Updates the state of the 'selectedMovie' property to that of the selected movie when a movie is clicked
  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie,
  //   });
  // }

  // When a user successfullly logs in, this function updates the 'user' property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);  // auth information received from handleSubmit method is stored in localStorage
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // Allows users to log out by removing the user and token from localStorage
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logout successful');
    alert('You have been successfully logged out');
    window.open('/', '_self');
  }

  render() {
    const { movies, user } = this.state;

    //Before movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="container">
      <div className="row">        
      <Router>
      <div className="main-view">
      <Button variant="info" type="submit" onClick={this.logOut}>Log Out</Button>
        <Route exact path="/" render={() => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
          return movies.map(m => <MovieCard key={m._id} movie={m}/>)}}/>
        <Route path="/users" render={() => <RegistrationView />} />
        <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
        <Route path="/directors/:name" render={({match}) => {
          if (!movies) return <div className="main-view"/>;
        return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}}/>
        <Route path="/genres/:name" render={({match}) => {
          if (!movies) return <div className="main-view"/>;
        return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}}/>
        </div>
      </Router>
      </div>
      </div>
    );
  }
}
