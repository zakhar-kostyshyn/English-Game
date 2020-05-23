import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { Segment, Button } from 'semantic-ui-react'
import StartGame from './StartGame'
import Chat from './Chat'
import { getDescription } from '../../../Actions/DescriptionAction'

const StyledSegment = styled(Segment) `

    width: 90% ;
    background-color: white !important;
    margin: 50px auto 50px !important;
    border-radius: 2.5em !important;
    border: 8px solid #d3d2e1 !important;
    box-shadow: 0 0 26px 2px #373636 !important;

`

const StyledHeader = styled.h1 `

    text-align: center;
    font-weight: 900 !important;
    font-size: 40px !important;
    font-family: chewy;
    
`

const StyledButton = styled(Button) `

    border: 1px solid #444444 !important;
    padding: 30px !important;
    width: 70% !important;
    margin: 10px 15% !important;
    max-width: unset !important;
    font-family: chewy !important;
    font-size: large !important;

`
const StyledTextSegment = styled(Segment) `

    margin: 0 10% !important;
    font-size: 1.5rem !important;
    text-align: justify;

`

const StyleParagraph = styled.p `

    font-family: lobster;

`

class GamePage extends Component {

    openResultsTable = () => {
        localStorage.setItem('gameName', this.props.component)
        window.open('http://localhost:3000/home/score')
    }

    componentDidMount() {
        this.props.getDescription(this.props.component)
    }

    render() {
            return (
                    <StyledSegment placeholder>

                        {/* CANVAS GAME */}
                        <StartGame  component={this.props.component}/>

                        {/* REDIRECT TO SCORE PAGE  */}
                        <StyledButton
                            content='Show All Score'
                            onClick={this.openResultsTable}/>

                        <StyledHeader as={"h1"}> {this.props.component} Game</StyledHeader>
                        {/* <Container> */}
                            <StyledTextSegment>
                                <StyleParagraph>{this.props.description}</StyleParagraph>
                            </StyledTextSegment>

                        <StyledHeader as={"h1"}>Comments</StyledHeader>

                        {/* CHAT */}
                        <Chat gameName={this.props.component}/>

                    </StyledSegment>
            )
    }
}

const mapStateToProps = state => ({
    description: state.DescriptionReducer.description
})

export default connect(mapStateToProps, { getDescription })(GamePage)