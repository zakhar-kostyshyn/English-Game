import React, { Component } from 'react'
import {connect} from 'react-redux'
import Games from '../Common/Games'
import { Segment } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledSegment = styled(Segment)`
    
   
    
`

class MainPart extends Component {
    render() {
        return (
            <StyledSegment>
                <Games/>
            </StyledSegment>
        )
    }
}

export default connect(null)(MainPart)