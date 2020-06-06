import React, {Component} from "react"
import { Header, Segment } from "semantic-ui-react"
import { connect } from "react-redux"
import styled from "styled-components"
import { getStats } from "../../Actions/StatsAction"

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
    font-family: chewy !important;

`

class StatsPage extends Component {

    componentDidUpdate() {
        if (this.props.username != null)
            this.props.getStats(this.props.username)
    }

    render() {
        return (
            <StyledSegment>
                <StyledHeader as={"h2"}> {"Total score: " + this.props.score + " points"} </StyledHeader>
                <StyledHeader as={"h2"}> {"Total time in game: " + this.props.time + " sec"} </StyledHeader>
                <StyledHeader as={"h2"}> {"Total games played: " + this.props.gameCounter} </StyledHeader>
            </StyledSegment>
        );
    }
}

const mapStateToProps = state => ({
    score: state.StatsReducer.score,
    time: state.StatsReducer.time,
    gameCounter: state.StatsReducer.gameCounter,
    username: state.UserReducer.username
})

export default connect(mapStateToProps, { getStats })(StatsPage)