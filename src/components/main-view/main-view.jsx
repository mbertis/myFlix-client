import React from "react";
import axios from "axios";


export class MainView extends React.Component {
  constructor() {
    super();
    //Initializes the state to an empty object so we can destructure (access the state's attributs) it later
    this.state = {}; //Initializing the state in the conductor allows me to access the state later by writing: const { /*something*/ } = this.state;
  }
  // render() {
  //   return <div className="main-view"></div>;
  // }
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

  render() {
    const { movies } = this.state;

    //Before movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>
            {movie.Title}
          </div>
        ))}
      </div>
    );
  }
}
