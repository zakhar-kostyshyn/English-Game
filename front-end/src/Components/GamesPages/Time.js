import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class Time extends Component {
    render() {
        return (
            <div>
               <GamePage component='Time'/>
            </div>
        )
    }
}
export default connect(null)(Time)