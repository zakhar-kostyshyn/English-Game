import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameViewInterface from '../Common/GameViewInterface'
import VocabularyGame from "../Games/VocabularyGame";

class FastVocab extends Component {

    render() {
        return (
            <GameViewInterface component='Vocabulary'/> 
        )
    }
}
export default connect(null)(FastVocab)