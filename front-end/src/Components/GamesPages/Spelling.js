import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameViewInterface from '../Common/GameViewInterface'

class Spelling extends Component {
    render() {
        return (
            <div>
               <GameViewInterface component='Spelling'/>
            </div>
        )
    }
}
export default connect(null)(Spelling)