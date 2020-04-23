import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class Description extends Component {
    render() {
        return (
            <div>
               <GamePage component='Description'/>
            </div>
        )
    }
}
export default connect(null)(Description)