import './style.css'

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store'
import 'semantic-ui-css/semantic.min.css';
import { Dimmer, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import Home from './Components/GamesPages/Home';
import FastVocab from './Components/GamesPages/FastVocab';
import Phrase from './Components/GamesPages/Phrase';
import Time from './Components/GamesPages/Time';
import Spelling from './Components/GamesPages/Spelling';
import Navbar from './Components/Common/Navigation/Navbar';
import Footer from './Components/Common/Navigation/Footer';
import SignIn from './Components/Common/Navigation/SignIn'
import Score from './Components/GamesPages/Score'
import Profile from './Components/GamesPages/Profile'
import StatsPage from './Components/GamesPages/StatsPage'



const StyledSegment = styled(Segment) `

    background: #8ff0f7 !important;

`
class App extends React.Component {

  state = {
    show: false,
    showRegistrate: false
  } 

  //  callback to open dimmer
  showDimmer = () => this.setState({ show: true }) 

  //  callback to close dimmer
  closeDimmer = () => this.setState({ show: false, showRegistrate: false })

  //  make change to show registrate component or signIn Segment
  onRegistrate = () => this.setState({ showRegistrate: this.state.showRegistrate ? false : true })  

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Dimmer.Dimmable as={StyledSegment} dimmed={this.state.show}>
            <Navbar showDimmer={this.showDimmer} />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/home/fast_vocab' component={FastVocab} />
              <Route exact path='/home/spelling' component={Spelling} />
              <Route exact path='/home/phrase' component={Phrase} />
              <Route exact path='/home/time' component={Time} />
              <Route exact path='/home/score' component={Score} />
              <Route exact path='/home/profile' component={Profile} />
              <Route exact path='/home/stats' component={StatsPage} />
            </Switch>
            <Footer/>
            <Dimmer.Inner 
                verticalAlign='top'
                as={Segment} 
                active={this.state.show} 
                onClickOutside={this.closeDimmer}>
                <SignIn closeDimmer={this.closeDimmer} showRegistrate={this.state.showRegistrate} onRegistrate={this.onRegistrate}/>
            </Dimmer.Inner>
          </Dimmer.Dimmable>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App
