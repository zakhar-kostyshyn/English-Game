import React, { Component } from 'react'
import { connect } from 'react-redux'
import Games from '../Common/StartPage/Games'
import { Segment } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledSegment = styled(Segment)`
    margin: auto 10% !important; 
    padding: 30px !important;
    background: darkmagenta !important;
    border-radius: 2.5em !important;
    box-shadow: 0 0 15px 2px #373636 !important;
    border: 8px solid #d3d2e1 !important;
`

class Home extends Component {

    render() {
        return (
            <StyledSegment>
                <Games/>
            </StyledSegment>
        )
    }
}

export default  connect(null)(Home)