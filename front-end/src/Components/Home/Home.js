import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Dimmer, Segment, Header, DimmerInner, Icon } from 'semantic-ui-react'
import Navbar from './Navbar'
import Footer from './Footer'
import MainPart from './MainPart'

import styled from 'styled-components'


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
                        as={Segment} 
                        active={this.state.show} 
                        onClickOutside={this.closeDimmer}
                    >
                        <Icon.Group size='big'>
                            <Icon name="github" />
                            <Icon name="facebook" />
                            <Icon name="google" />
                        </Icon.Group>
                    </Dimmer.Inner>
                </Dimmer.Dimmable>
            
        )
    }
}

export default  connect(null)(Home)