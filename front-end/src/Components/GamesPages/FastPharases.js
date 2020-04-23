import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePage from '../Common/GamePage/GamePage'

class FastPharases extends Component {
    render() {
        return (
            <div>
               <GamePage component='FastPharases'/>
            </div>
        )
    }
}
export default connect(null)(FastPharases)