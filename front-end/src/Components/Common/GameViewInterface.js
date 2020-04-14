import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Segment, Header, Container } from 'semantic-ui-react'
import VocabularyGame from '../Games/VocabularyGame'
import StartGame from './StartGame'

const StyledParagraph = styled.p `

`

class GameViewInterface extends Component {
    render() {
        return (
            <div>
                <Segment placeholder>

                    {/* Canvas */}
                    <StartGame component={this.props.component}/>


                    <Header>{this.props.name} Game</Header>
                    {/* <Container> */}
                        <StyledParagraph>
                            This is a simple game for learning basic English vocabulary. 
                            You drag the images to match the words and then click on the words
                            to match the images.

                            The aim of this game is provide learners with a quick and easy 
                            way to practice or review vocabulary items. The game rapidly presents images, 
                            text and audio. In this way, there is a lot of repetition and reinforcement 
                            of vocabulary. It is hoped that by being simple and quick, 
                            it can be engaging and more interesting. If students can stay engaged with 
                            the game, then they will continue to get the presentation and repetition 
                            of vocabulary items. While it is less effective if students just guess all 
                            the responses, the user does need to click on the correct word/image to progress.

                            There are 2 parts to this game. In the first part, you are show 
                            sets of 3 or 4 images. You then have to click and drag these images 
                            to the matching words. When the image is moved to the correct word, 
                            it will stick there and the audio plays. Once you have matched 10 images, 
                            you proceed to the next part. In the second part, you are presented with 
                            a big image and you are required to click on the corresponding word from a 
                            set of 3 below. You keep on clicking until you get the right word and when 
                            you do, the audio is played. When you have done this for 10 items, 
                            you go back to the first part and then this repeats 2 or 3 times.

                            There are about 30 sets of content available to use and each set have 
                            about 25 items. The sets are grouped as follows:

                            Animals, Animals 2, Bathroom, Body, Buildings, Clothes, Clothes 2, 
                            Colors, Computer, Countries, Food, Food 2, Food 3, Garden, Home, Home 2, 
                            Hospital, Jobs, Jobs 2, Kitchen, Letters, Music, Nature, Numbers, Personal,
                            Places, Sports, Stationery, Subjects, Things, Transport.

                            You can email me with any problems or feedback by using the contact form 
                            that is linked at the bottom of the page
                        </StyledParagraph>
                    {/* </Container> */}
                    <Header>Comments</Header>
                </Segment>
            </div>
        )
    }
}

export default connect(null)(GameViewInterface)