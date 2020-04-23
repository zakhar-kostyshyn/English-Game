import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class FastVocab extends Component {

    render() {
        return (
            <GamePage component='Vocabulary'/> 
        )
    }
}
export default connect(null)(FastVocab)