import React from "react";
import axios from "axios";
import {
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import "./main-view.scss";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies, setUser } from "../../actions/actions";

import { Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view"; //LoginView needs to get user details from MainView
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../update-profile/update-profile";
import MoviesList from "../movies-list/movies-list";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    // Initial state is set to null
    this.state = {
      // movies: [],
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://madison-myflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }, // This type of notation is very important, not regular "" or ''
      })
      .then((response) => {
        // #1
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      // this.props.setUser(localStorage.getItem("user"));
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
    // console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token); // auth information received from handleSubmit method is stored in localStorage
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // Allows users to log out by removing the user and token from localStorage
  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("logout successful");
    alert("You have been successfully logged out");
    window.open("/", "_self");
  }

  render() {
    // const { movies, user } = this.state;
    let { movies, visibilityFilter } = this.props;
    let { user } = this.state;

    //Before movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="container">
        <div className="row">
          <Router>
            {/* <Navbar sticky="top" expand="lg" className="mb-2 navbar-styles">
              <Navbar.Brand className="navbar-brand">
                <Link to={`/`}>myFlix</Link>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="bg-dark"
              />
              <Navbar.Collapse
                className="justify-content-end navbar-dark"
                id="basic-navbar-nav"
              >
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
                {!user ? (
                  <ul>
                    <Link to={`/`}>
                      <Button variant="link">Login</Button>
                    </Link>
                    <Link to={`/register`}>
                      <Button variant="link">Register</Button>
                    </Link>
                  </ul>
                ) : (
                  <ul>
                    <Link to={`/`}>
                      <Button variant="link" onClick={() => this.logOut()}>
                        Log out
                      </Button>
                    </Link>
                    <Link to={`/users/`}>
                      <Button variant="link">Account</Button>
                    </Link>
                    <Link to={`/`}>
                      <Button variant="link">Movies</Button>
                    </Link>
                  </ul>
                )}
              </Navbar.Collapse>
            </Navbar> */}
            <Navbar bg="secondary" expand="lg">
              <Navbar.Brand className="navbar-brand">
                <Nav.Link href="/">myFlix</Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                <Nav className="mr-auto">
                  {!user ? (
                    <ul>
                      <Nav.Link as={Link} to="/">
                        Login
                      </Nav.Link>
                      <Nav.Link as={Link} to="/register">
                        Register
                      </Nav.Link>
                    </ul>
                  ) : (
                    <ul>
                      <Nav.Link onClick={() => this.logOut()}>Log out</Nav.Link>
                      <Nav.Link as={Link} to="/users/">
                        Account
                      </Nav.Link>
                      <Nav.Link as={Link} to="/">
                        Movies
                      </Nav.Link>
                    </ul>
                  )}
                </Nav>
                <Form>
                  <VisibilityFilterInput visibilityFilter={visibilityFilter} />
                </Form>
              </Navbar.Collapse>
            </Navbar>
            <div className="main-view">
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                  return <MoviesList movies={movies} />;
                }}
              />
              <Route
                path="/update/:userId"
                render={() => {
                  return <UpdateView />;
                }}
              />
              <Route path="/register" render={() => <RegistrationView />} />
              <Route
                path="/movies/:movieId"
                render={({ match }) => (
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                  />
                )}
              />
              <Route
                path="/users/"
                render={() => (
                  <ProfileView
                    movies={movies}
                    logOutFunc={() => this.logOut()}
                  />
                )}
              />

              <Route
                path="/directors/:name"
                render={({ match }) => {
                  // if (!movies) return <div className="main-view" />;
                  return (
                    <DirectorView
                      director={movies.find(
                        (m) => m.Director.Name === match.params.name
                      )}
                      movies={movies}
                    />
                  );
                }}
              />
              <Route
                path="/genres/:name"
                render={({ match }) => (
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    movies={movies}
                  />
                )}
              />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
