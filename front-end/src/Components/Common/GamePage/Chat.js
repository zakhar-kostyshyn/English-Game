import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, CommentGroup, Header, Form, TextArea, Button } from 'semantic-ui-react'
import { getAllMessage, postNewMessage } from '../../../Actions/ChatAction'
import moment from "moment"
import styled from 'styled-components'

const StyledComment = styled(Comment) `

    border: 1px solid #ccc !important;
    border-radius: 1em !important;
    background-color: #f3f3f3 !important;
    padding: 10px 30px !important;
    margin: 20px 0 !important;

`

const StyledCommentGroup = styled(CommentGroup) `

    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    margin: 50px 50px 10px !important

`

const StyledTextArea = styled(TextArea) `

    border-radius: .8em !important;
    margin: 0 0 16px !important;
    padding: 20px !important;
    display: block !important;
    border: 1px solid #ccc !important;
    box-shadow: inset 0 1px 3px #ddd !important;
    width: 100% !important;
    box-sizing: border-box !important;
    min-height: 140px !important;
    max-width: 100% !important;

`

class Chat extends Component {

    state = {
        message: ""
    }

    ////////      Component       ////////

    componentDidMount() {
        this.props.getAllMessage(this.props.gameName)    
    }

    ////////      Component       ////////

    ////////      Events       ////////

    //  for saving when we write smth 
    onChange = e => this.setState({ [e.target.name] : e.target.value})

    // submit message 
    onSubmit = () => this.props.postNewMessage(this.state.message, this.props.username, this.props.gameName, moment())

    ////////      Events       ////////
    

    render() {
        //  check if message already loaded
        if (this.props.messages) 
            return (
                <StyledCommentGroup>

                    {this.props.messages.map(message => (   //  represent all message from game 
                        <StyledComment key={message.id}>
                            <Comment.Content>
                                <Comment.Author as='a' >{message.username}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{dataCounter(message.date)}</div>
                                </Comment.Metadata>
                                <Comment.Text>{message.message}</Comment.Text>
                            </Comment.Content>
                        </StyledComment>
                    ))}
                    
                    {/* FORM */}
                    {this.props.isLoginSuccess ? 
                        <Form>
                            <StyledTextArea
                                name='message' 
                                rows={5}
                                onChange={this.onChange} 
                                placeholder='Write your comment'
                            />
                            <Button 
                                onClick={this.onSubmit} 
                                content='Add Comment' 
                                labelPosition='left' 
                                icon='edit' 
                                primary
                            />
                        </Form>      
                    :
                        <Header>You should be Registrated to make comment</Header>
                    }
                    
                </StyledCommentGroup>
            )
        else 
            return (
                <Header>Loading...</Header>
            )
    }

}

const mapStateToProps = state => ({
    messages: state.ChatReducer.messages,
    isLoginSuccess: state.UserReducer.isLoginSuccess,
    username: state.UserReducer.username
})

//  count date and convert into sec, days , hour, years
export const dataCounter = date => {
    if (!(date == null)) {
        switch(true) {

            case moment().diff(date, 'minutes') <= 1:
                return "a few second ago"

            case moment().diff(date, 'minutes') > 1 &&  moment().diff(date, 'hours') <= 1:
                return moment().diff(date, 'minutes') + " minutes ago"

            case moment().diff(date, 'hours') > 1 &&  moment().diff(date, 'days') <= 1:
                return moment().diff(date, 'hours') + " hours ago"

            case moment().diff(date, 'days') > 1 &&  moment().diff(date, 'months') <= 1:
                return moment().diff(date, 'days') + " days ago"

            case moment().diff(date, 'months') > 1 &&  moment().diff(date, 'years') <= 1:
                return moment().diff(date, 'months') + " months ago"

            default :
                return moment().diff(date, 'years') + " years ago"
            
        }
    } else {
        return "default"
    }
}

export default connect(mapStateToProps, { getAllMessage, postNewMessage })(Chat)