import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameViewInterface from '../Common/GameViewInterface'

class FastEnglish extends Component {
    render() {
        return (
            <div>
               <GameViewInterface component='FastEnglish'/>
            </div>
        )
    }
}
export default connect(null)(FastEnglish)