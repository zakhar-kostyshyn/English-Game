import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameViewInterface from '../Common/GameViewInterface'

class Food extends Component {
    render() {
        return (
            <div>
               <GameViewInterface/>
            </div>
        )
    }
}
export default connect(null)(Food)