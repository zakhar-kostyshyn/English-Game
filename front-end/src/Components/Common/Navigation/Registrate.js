import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createUser, loadingUser } from "../../../Actions/UserAction";
import { Form, Button, Icon, Segment, Header, Loader, Container } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledContainer = styled(Container) `

    margin-top: 60px !important;
    padding: 50px !important;
    width: 500px !important;
    background: antiquewhite;
    border-radius: 100px;
`

class Registrate extends Component {

    state = {
        username: "",
        password: "",
        surname: "",
        name: "",
        email: ""
    }

    //  create new user
    onCreate = () => {
        this.props.loadingUser()
        this.props.createUser(
            this.state.name, 
            this.state.surname, 
            this.state.username, 
            this.state.password, 
            this.state.email
            )
    }

    //  set to the state password and username when they change
    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        if (this.props.isUserLoading) 
            return ( 
                <Loader active size='massive'/>
            )
        else 
            if (this.props.isUserCreate) 
                return (
                    <Segment>
                        <Icon name="check circle" size='huge' color='green'  />
                        <Header>Yo have successfuly registrated</Header>
                        <Button type='submit' onClick={this.props.onRegistrate} >Back To Login</Button>
                    </Segment>
                )
            else 
                return(
                    // registration user form 
                    <StyledContainer>
                        <Segment>
                            <Header>Registration</Header>
                            <Form>
                                <Form.Field>
                                    <Form.Input name="username" onChange={this.onChange} label='Enter username' inverted/>
                                    <Form.Input name="name" onChange={this.onChange} label='Enter name' inverted/>
                                    <Form.Input name="surname" onChange={this.onChange} label='Enter surname' inverted/>
                                    <Form.Input name="email" onChange={this.onChange} label='Enter email' type='email' inverted/>
                                    <Form.Input name="password" onChange={this.onChange} label='Enter Password' type='password' inverted/>
                                </Form.Field>
                                <Button type='submit' onClick={this.onCreate} >Sign In</Button>
                            </Form>
                        </Segment>
                    </StyledContainer>
                )
    }
}

const mapStateToProps = state => ({
    isUserCreate: state.UserReducer.isUserCreate,
    isUserLoading: state.UserReducer.isUserLoading
})

export default  connect(mapStateToProps, { createUser, loadingUser })(Registrate)