import React, { Component } from 'react'
import {connect} from 'react-redux'
import { CardGroup } from 'semantic-ui-react'
import CardView from "./CardView";

class Games extends Component {
    render() {
        return (
            <CardGroup itemsPerRow={2} centered>
                <CardView name='Spelling Game' path='/home/spelling' color='#FF8D6F'/>
                <CardView name='Vocabulary Game' path='/home/fast_vocab' color='#40FF65' />
                <CardView name='Phrase Game' path='/home/phrase' color='#2D85FF' />
                <CardView name='Clock Time Game' path='/home/time' color='#BEBEFF' />
            </CardGroup>
        )
    }
}

export default connect(null)(Games)