import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Card } from 'semantic-ui-react'
import CardView from "./CardView";


class Games extends Component {
    render() {
        return (
            <Card.Group itemsPerRow={2} centered>
                <CardView name='Spelling' path='/home/spelling' color='Olive'></CardView>
                <CardView name='Fast Vocabulary' path='/home/fast_vocab' color='CadetBlue' ></CardView>
                <CardView name='Fast Phrases' path='/home/fast_phrases' color='Coral'></CardView>
                <CardView name='Fast English' path='/home/fast_english' color='DarkGoldenRod'></CardView>
                <CardView name='Food' path='/home/food' color='DarkKhaki'></CardView>
                <CardView name='Description' path='/home/decription' color='YellowGreen'></CardView>
                <CardView name='Numbers' path='/home/numbers' color='Salmon'></CardView>
                <CardView name='Time' path='/home/time' color='LightGreen'></CardView>
            </Card.Group>
        )
    }
}

export default connect(null)(Games)