import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class Phrase extends Component {
    render() {
        return (
            <div>
               <GamePage component='Phrase'/>
            </div>
        )
    }
}
export default connect(null)(Phrase)