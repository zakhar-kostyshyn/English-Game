import React, { Component } from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledSegment = styled(Segment) `

    text-align: center;
    background: khaki !important;
    padding: 50px 50px 50px 50px !important;
    border-radius: 7.5em!important;
    box-shadow: 0 0 15px 2px #373636 !important;

`

const StyledHeader = styled(Header) `

    text-align: center;
    font-weight: 900 !important;
    font-size: 40px !important;
    font-family: chewy;

`

class Profile extends Component {
    render() {
        return (
            <StyledSegment>
                <StyledHeader as='h1' >PROFILE</StyledHeader>
                <StyledHeader as='h3' >{'Your Email: ' + this.props.email}</StyledHeader>
                <StyledHeader as='h3' >{'Your Username: ' + this.props.username}</StyledHeader>
                <StyledHeader as='h3' >{'Your Name: ' + this.props.name}</StyledHeader>
                <StyledHeader as='h3' >{'Your Surname: ' + this.props.surname}</StyledHeader>
            </StyledSegment>
        )
    }
}

const mapStateToProps = state => ({
    email: state.UserReducer.email,
    username: state.UserReducer.username,
    name: state.UserReducer.name,
    surname: state.UserReducer.surname
})

export default connect(mapStateToProps)(Profile)