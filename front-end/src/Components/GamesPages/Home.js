import React, { Component } from 'react'
import {connect} from 'react-redux'
import Games from '../Common/StartPage/Games'

class Home extends Component {

    render() {
        return (
            <Games/>   
        )
    }
}

export default  connect(null)(Home)