import React, { Component } from 'react'
import { Card, CardHeader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

const StyledCardHeader = styled(CardHeader)`
    
    background-color: ${props => props.color};

`

class CardView extends Component {

    state = {
        redirect: false
    }

    //  make state redirect true
    onRedirect = () => this.setState({ redirect: true })

    render() {

        if (this.state.redirect) {
            return (
                <Redirect push to={this.props.path} />
            )
        }

        return (
            <Card onClick={this.onRedirect}>
                <Card.Content>
                    <StyledCardHeader color={this.props.color} textAlign='center' >{this.props.name}</StyledCardHeader>
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null)(CardView)