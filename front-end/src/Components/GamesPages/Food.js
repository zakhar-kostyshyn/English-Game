import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class Food extends Component {
    render() {
        return (
            <div>
               <GamePage component='Food'/>
            </div>
        )
    }
}
export default connect(null)(Food)