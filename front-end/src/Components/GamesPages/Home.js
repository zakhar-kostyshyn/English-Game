import React, { Component } from 'react'
import {connect} from 'react-redux'
import Games from '../Common/Games'

import styled from 'styled-components'



class Home extends Component {

    render() {
        return (
            <Games/>   
        )
    }
}

export default  connect(null)(Home)