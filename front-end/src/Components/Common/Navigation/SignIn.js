import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Form, Button, Icon, Divider, Segment, Header, Container, Message } from 'semantic-ui-react'
import { loginUser } from "../../../Actions/UserAction";
import Registrate from "./Registrate"

class SignIn extends Component {

    state = {
        username: "",
        password: ""
    }

    //  make a post request to server with password and login
    onLogin = () => {
        this.props.loginUser(this.state.username, this.state.password)
    }

    //  set to the state password and username when they change
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        if (this.props.showRegistrate) 
            return (
                <Registrate onRegistrate={this.props.onRegistrate}/>
            )
        else
            return (
                //  signIn container
                <Container>
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
                </Container>
            )
    }
}

const mapStateToProps = state => ({
    name: state.UserReducer.username,
    isLoginSuccess: state.UserReducer.isLoginSuccess
})

export default  connect(mapStateToProps, { loginUser })(SignIn)
