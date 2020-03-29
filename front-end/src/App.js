import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";

import store from './store'

import 'semantic-ui-css/semantic.min.css';

import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Footer/>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
