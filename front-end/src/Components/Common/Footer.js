import React, { Component } from 'react'
import {connect} from 'react-redux'

import styled from 'styled-components'

const StyledFooter = styled.footer`

    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: black;
    text-align: center;
    padding-bottom: 4rem;

    .footerHeader {
        color: white;
    }
`

class Footer extends Component {
    render() {
        return (
            <StyledFooter >
                <h1 className='footerHeader'>Footer</h1>
            </StyledFooter>
        )
    }
}

export default  connect(null)(Footer)