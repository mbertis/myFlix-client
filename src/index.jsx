import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import {MainView} from "./components/main-view/main-view";
import moviesApp from "./reducers/reducers";

// Import statement to indicate that we need to bundle './index.scss'
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main componenet (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return(
    <Provider store={store}>
      <MainView/>
      </Provider>
    );
  }
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);