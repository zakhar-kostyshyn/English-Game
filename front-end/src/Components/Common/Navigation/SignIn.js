import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Form, Button, Icon, Divider, Segment, Header, Container, Message, Loader } from 'semantic-ui-react'
import { loginUser, loadingUser } from "../../../Actions/UserAction";
import Registrate from "./Registrate"
import styled from 'styled-components'

const StyledContainer = styled(Container) `

    margin-top: 60px !important;
    padding: 50px !important;
    width: 500px !important;
    background: antiquewhite;
    border-radius: 100px;
`

class SignIn extends Component {

    state = {
        username: "",
        password: ""
    }

    //  make a post request to server with password and login
    onLogin = () => { 
        this.props.loadingUser()
        this.props.loginUser(this.state.username, this.state.password) 
    }
    

    //  set to the state password and username when they change
    onChange = e => this.setState({ [e.target.name]: e.target.value })
    

    render() {
        if (this.props.isUserLoading) 
            return ( 
                <Loader active size='massive'/>
            )
        else 
            if (this.props.showRegistrate) return ( <Registrate onRegistrate={this.props.onRegistrate}/>)
            else
                return (
                    //  signIn container
                    <StyledContainer>
                            {/* sign in segment  */}
                            <Segment>
                                { this.props.isLoginSuccess ?
                                    <div>
                                        <Icon name="check circle" size='huge' color='green'  />
                                        <Header>Yo have successfuly login</Header>
                                        <Button type='submit' onClick={this.props.closeDimmer} >Back Home</Button>
                                    </div>   
                                :
                                    <div>
                                        <Icon name="github" size='big' color='black'  />
                                        <Icon name="facebook" size='big' color='black' />
                                        <Icon name="google" size='big' color='black'  />
                                        <Divider horizontal>OR</Divider>
                                        <Form>
                                            <Form.Field>
                                                <Form.Input name="username" onChange={this.onChange} label='Enter Login' inverted/>
                                                <Form.Input name="password" onChange={this.onChange} label='Enter Password' type='password' inverted/>
                                            </Form.Field>
                                            <Button type='submit' onClick={this.onLogin} >Sign In</Button>
                                        </Form>

                                        <Segment>
                                            <Message onClick={this.props.onRegistrate} positive>
                                                New to Us? Registrate
                                            </Message>
                                        </Segment>
                                    </div>
                                }
                        </Segment>
                    </StyledContainer>
                )
    }
}

const mapStateToProps = state => ({
    name: state.UserReducer.username,
    isLoginSuccess: state.UserReducer.isLoginSuccess,
    isUserLoading: state.UserReducer.isUserLoading
})

export default  connect(mapStateToProps, { loginUser, loadingUser })(SignIn)
