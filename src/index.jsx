import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to indicate that we need to bundle './index.scss'
import './index.scss';

// Main componenet (will eventually use all the others)
class MyFlixApplication extends React.Componenet {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);