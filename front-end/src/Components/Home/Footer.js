import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Header } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledFooter = styled.footer`

    background: black;
    padding: 5rem;

    .footerHeader {
        color: white;
    }
`

class Footer extends Component {
    render() {
        return (
            <StyledFooter >
                <Header className='footerHeader' textAlign='center' >Footer</Header>
            </StyledFooter>
        )
    }
}

export default  connect(null)(Footer)