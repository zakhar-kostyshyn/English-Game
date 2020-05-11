import React, { Component } from 'react'
import { connect } from 'react-redux'
import Games from '../Common/StartPage/Games'
import { Segment } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledSegment = styled(Segment)`



`

class Home extends Component {

    render() {
        return (
            <Games/> 
        )
    }
}

export default  connect(null)(Home)