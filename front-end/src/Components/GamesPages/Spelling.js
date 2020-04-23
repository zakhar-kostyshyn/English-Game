import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class Spelling extends Component {
    render() {
        return (
            <div>
               <GamePage component='Spelling'/>
            </div>
        )
    }
}
export default connect(null)(Spelling)