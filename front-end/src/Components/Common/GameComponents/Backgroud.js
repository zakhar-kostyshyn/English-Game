import React, { Component } from 'react'
import { Rect } from 'react-konva'

class Backgroud extends Component {

    state = {
        gradient: null
    }

    componentDidMount() {
        
        //  create gradient because we can't do this in Konva props
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let grad = ctx.createLinearGradient(0, 0, 0, 650);

        grad.addColorStop(0.00, '#6b88f2');
        grad.addColorStop(1.00, '#e3b749');

        this.setState({
            gradient: grad
        })
    }

    render() {

        const stage = {
            width: 1000,
            height: 650
        }
        return (
            <Rect   
                width={stage.width}
                height={stage.height}
                fill={this.state.gradient}
                shadowBlur={10}/>    
        )
    }

}

export default Backgroud