import React from 'react';
import ReactDOM from 'react-dom';

import {MainView} from "./components/main-view/main-view";

// Import statement to indicate that we need to bundle './index.scss'
import './index.scss';

// Main componenet (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return <MainView/>; //Renders MainView (a list of movies) from within index.jsx
    }
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);