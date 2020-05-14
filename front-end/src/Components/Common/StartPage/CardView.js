import React, { Component } from 'react'
import { Card, CardHeader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const StyledCardHeader = styled(CardHeader)`
    
    background-color: ${props => props.color};
    padding: 80px !important;
    border-radius: 2.5em !important;
    box-shadow: 0 0 15px 2px #373636 !important;

`

class CardView extends Component {

    render() {
        return (
            <Card as={Link} to={this.props.path} >
                <Card.Content>
                    <StyledCardHeader color={this.props.color} textAlign='center' >{this.props.name}</StyledCardHeader>
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null)(CardView)