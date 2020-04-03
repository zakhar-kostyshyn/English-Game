import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";

import store from './store'

import 'semantic-ui-css/semantic.min.css';

import Home from './Components/Home/Home';
import FastVocab from './Components/GamesPages/FastVocab';
import FastPharases from './Components/GamesPages/FastPharases';
import FastEnglish from './Components/GamesPages/FastEnglish';
import Food from './Components/GamesPages/Food';
import Description from './Components/GamesPages/Description';
import Numbers from './Components/GamesPages/Numbers';
import Time from './Components/GamesPages/Time';
import Spelling from './Components/GamesPages/Spelling';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/home/fast_vocab' component={FastVocab} />
        <Route exact path='/home/fast_phrases' component={FastPharases} />
        <Route exact path='/home/fast_english' component={FastEnglish} />
        <Route exact path='/home/food' component={Food} />
        <Route exact path='/home/decription' component={Description} />
        <Route exact path='/home/numbers' component={Numbers} />
        <Route exact path='/home/time' component={Time} />
        <Route exact path='/home/spelling' component={Spelling} />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
