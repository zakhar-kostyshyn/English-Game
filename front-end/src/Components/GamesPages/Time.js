import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameViewInterface from '../Common/GameViewInterface'

class Time extends Component {
    render() {
        return (
            <div>
               <GameViewInterface component='Time'/>
            </div>
        )
    }
}
export default connect(null)(Time)