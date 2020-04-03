import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";

import store from './store'

import 'semantic-ui-css/semantic.min.css';

import Home from './Components/Home/Home';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Home/>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
