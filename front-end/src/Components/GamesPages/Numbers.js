import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class Numbers extends Component {
    render() {
        return (
            <div>
               <GamePage component='Numbers'/>
            </div>
        )
    }
}
export default connect(null)(Numbers)