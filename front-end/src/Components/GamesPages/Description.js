import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameViewInterface from '../Common/GameViewInterface'

class Description extends Component {
    render() {
        return (
            <div>
               <GameViewInterface component='Description'/>
            </div>
        )
    }
}
export default connect(null)(Description)