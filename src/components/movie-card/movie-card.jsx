import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {     //Exporting <MovieCard/> here allows it to be imported into 'MainView'
  render() {
    //This is given to the <MovieCard/> component by 'MainView' as 'MainView' is connected to my db via /movies endpoint
    const { movie, onClick } = this.props;

    return (
      <div onClick = {() => onClick(movie)} className = "movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};