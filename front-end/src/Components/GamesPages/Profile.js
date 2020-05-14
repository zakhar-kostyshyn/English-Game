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

class Profile extends Component {
    render() {
        return (
            <StyledSegment>
                <Header as='h1' >PROFILE</Header>
                <Header as='h3' >{'Your Email: ' + this.props.email}</Header>
                <Header as='h3' >{'Your Username: ' + this.props.username}</Header>
                <Header as='h3' >{'Your Name: ' + this.props.name}</Header>
                <Header as='h3' >{'Your Surname: ' + this.props.surname}</Header>
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