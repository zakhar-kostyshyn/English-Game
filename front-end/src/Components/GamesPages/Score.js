import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Header } from 'semantic-ui-react'
import { getAllScore } from '../../Actions/ScoreAction'
import { dataCounter } from '../Common/GamePage/Chat'

class Score extends Component {

    componentDidMount() {
        this.props.getAllScore(this.props.location.state.gameName)
    }

    render() {
        if (this.props.allScore.length > 0) 
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.allScore
                            //  sort every by score
                            .sort((s1, s2) => (parseInt(s1.score) < parseInt(s2.score)) ? 1 : -1)
                            .map(score => (
                                <Table.Row key={score.id}>
                                    <Table.Cell>{score.username}</Table.Cell>
                                    <Table.Cell>{score.score}</Table.Cell>
                                    <Table.Cell>{dataCounter(score.scoreTime)}</Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            )
        else 
            return ( <Header>Loading...</Header> )
    }
}

const mapStateToProps = state => ({
    allScore: state.ScoreReducer.score
})

export default  connect(mapStateToProps, { getAllScore })(Score)