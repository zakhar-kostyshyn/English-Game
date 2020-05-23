import React, { Component } from 'react'
import {Card, CardHeader, CardContent, Header} from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const StyledCardContent = styled(CardContent) `

     background: darkmagenta !important;
     box-shadow: auto !important;
`

const StyledCardHeader = styled(CardHeader) `
    
    background-color: ${props => props.color};
    padding: 80px !important;
    border-radius: 2.5em !important;
    box-shadow: 0 0 15px 2px #373636 !important;
    text-align: center;
  
`

class CardView extends Component {

    render() {

        return (
            <Card style={{boxShadow: "unset", background: "unset"}} as={Link} to={this.props.path} >
                <StyledCardContent>
                    <StyledCardHeader
                        as={"h1"}
                        style={{fontFamily: "chewy", color: "black"}}
                        color={this.props.color} textAlign='center' >{this.props.name}</StyledCardHeader>
                </StyledCardContent>
            </Card>
        )
    }
}

export default connect(null)(CardView)