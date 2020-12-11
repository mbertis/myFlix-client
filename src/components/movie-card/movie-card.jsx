import React from 'react';

export class MovieCard extends React.Component {     //Exporting <MovieCard/> here allows it to be imported into 'MainView'
  render() {
    //This is given to the <MovieCard/> component by 'MainView' as 'MainView' is connected to my db via /movies endpoint
    const { movie } = this.props;

    return (
      <div className = "movie-card">{movie.Title}</div>
    );
  }
}