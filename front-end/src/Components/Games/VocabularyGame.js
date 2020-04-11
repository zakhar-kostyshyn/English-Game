import React, { Component } from 'react'
import { Stage, Text, Rect, Layer, Label, Group } from 'react-konva'
import '../../style.css'

class VocabularyGame extends Component {

    state = {
        //  gradient for game
        gradient: null,
        time: 0,
        score: 0
    }

    componentDidMount() {

        //  create gradient because we can't do this in Konva props
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let grad = ctx.createLinearGradient(0, 0, 0, 550);

        grad.addColorStop(0.00, '#6b88f2');
        grad.addColorStop(1.00, '#e3b749');

        this.setState({
            gradient: grad
        })
    }

    render() { 

        const stage = {
            width: 900,
            height: 550
        }

        return (
            <Label>
                <Rect   
                    width={stage.width}
                    height={stage.height}
                    fill={this.state.gradient}
                    shadowBlur={10}/>
            </Label>
        )           
    }
}

export default VocabularyGame