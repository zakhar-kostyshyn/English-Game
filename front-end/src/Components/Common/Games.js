import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Card } from 'semantic-ui-react'
import CardView from "./CardView";

const cards_group = (
    <Card.Group itemsPerRow={2} centered>
        <CardView name='Fast Vocabulary' color='CadetBlue' ></CardView>
        <CardView name='Fast Phrases' color='Coral'></CardView>
        <CardView name='Fast English' color='DarkGoldenRod'></CardView>
        <CardView name='Food' color='DarkKhaki'></CardView>
        <CardView name='Description' color='YellowGreen'></CardView>
        <CardView name='Numbers' color='Salmon'></CardView>
        <CardView name='Time' color='LightGreen'></CardView>
        <CardView name='Spelling' color='Olive'></CardView>
    </Card.Group>
)


class Games extends Component {
    render() {
        return (
            <div>
                {cards_group}
            </div>
        )
    }
}

export default connect(null)(Games)