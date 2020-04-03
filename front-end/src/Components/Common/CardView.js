import React, { Component } from 'react'
import { Card, CardHeader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'


const StyledCardHeader = styled(CardHeader)`
    
    padding-top: 100px;
    padding-bottom: 100px;
    background-color: ${props => props.color};

`



class CardView extends Component {

  
    render() {
        return (
            <Card href='#'>
                <Card.Content>
                    <StyledCardHeader color={this.props.color} textAlign='center' >{this.props.name}</StyledCardHeader>
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null)(CardView)