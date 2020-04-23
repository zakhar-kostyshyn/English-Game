import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class FastEnglish extends Component {
    render() {
        return (
            <div>
               <GamePage component='FastEnglish'/>
            </div>
        )
    }
}
export default connect(null)(FastEnglish)