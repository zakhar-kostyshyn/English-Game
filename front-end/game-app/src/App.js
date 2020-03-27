import React from 'react';
import ReactDOM from "react-dom";

import { Provider } from 'react-redux'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import store from './store'
import Navbar from './Components/Common/Navbar';



export default class App extends React.Component {

  // componentWillMount(){
  //   store.dispatch(loadUser())
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
         <Navbar></Navbar>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
