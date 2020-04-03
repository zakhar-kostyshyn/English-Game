import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Dimmer, Segment, Container} from 'semantic-ui-react'
import SignIn from '../Common/SignIn'
import Navbar from './Navbar'
import Footer from './Footer'
import MainPart from './MainPart'

import styled from 'styled-components'

const StyledContainer = styled(Container) `

    margin-top: 60px !important;
    background: white !important;
    padding: 50px !important;

`

class Home extends Component {

    state = {
        show: false
    }

    //  callback to open dimmer
    showDimmer = () => this.setState({ show: true }) 
    
    //  callback to close dimmer
    closeDimmer = () => this.setState({ show: false })

    render() {
        return (
            
                <Dimmer.Dimmable as={Segment} dimmed={this.state.show}>
                    <Navbar showDimmer={this.showDimmer}/>
                    <MainPart/>
                    <Footer/>
                    <Dimmer.Inner 
                        verticalAlign='top'
                        as={Segment} 
                        active={this.state.show} 
                        onClickOutside={this.closeDimmer}>
                        <StyledContainer>
                            <SignIn/>
                        </StyledContainer>
                    </Dimmer.Inner>
                </Dimmer.Dimmable>
            
        )
    }
}

export default  connect(null)(Home)