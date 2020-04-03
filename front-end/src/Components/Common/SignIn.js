import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Form, Button, Icon, Divider } from 'semantic-ui-react'

 class SignIn extends Component {
    render() {
        return (
            <div>
                <Icon name="github" size='big' color='black'  />
                <Icon name="facebook" size='big' color='black' />
                <Icon name="google" size='big' color='black'  />
                <Divider horizontal>OR</Divider>
                <Form>
                    <Form.Field>
                        <Form.Input label='Enter Login' inverted/>
                        <Form.Input label='Enter Password' type='password' inverted/>
                    </Form.Field>
                    <Button type='submit'>Sign In</Button>
                    <Button >Sign Up</Button>
                </Form>
            </div>
        )
    }
}

export default  connect(null)(SignIn)
