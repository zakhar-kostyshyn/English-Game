import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GameViewInterface from '../Common/GameViewInterface'


class FastVocab extends Component {

    render() {
        return (
            <div>
               <GameViewInterface/> 
            </div>
        )
    }
}
export default connect(null)(FastVocab)