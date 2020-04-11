import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameViewInterface from '../Common/GameViewInterface'

class Numbers extends Component {
    render() {
        return (
            <div>
               <GameViewInterface component='Numbers'/>
            </div>
        )
    }
}
export default connect(null)(Numbers)