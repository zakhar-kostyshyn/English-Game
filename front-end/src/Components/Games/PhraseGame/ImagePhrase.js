import React, { Component } from 'react'
import { Rect, Label } from 'react-konva'


class ImagePhrase extends Component {

    state = {
        gradient: null
    }

    componentDidMount() {
        //  create gradient because we can't do this in Konva props
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let grad = ctx.createLinearGradient(0, 0, 35, 390);

        grad.addColorStop(0.00, '#50717E');
        grad.addColorStop(1.00, 'white');

        this.setState({
            gradient: grad
        })
    }

    render() {
        return (
            <Label
                x={500}
                y={160}>
                <Rect
                    width={450}
                    height={270}
                    offsetX={225}
                    offsetY={135}
                    fill={this.state.gradient}
                    stroke='black'
                    strokeWidth={8}
                    cornerRadius={20}
                />
                <Rect 
                    width={450}
                    height={270}
                    offsetX={225}
                    offsetY={135}
                    fillPatternImage={this.props.image}
                    fillPatternScaleX={0.8}
                    fillPatternScaleY={0.8}
                    fillPatternX={80}
                    fillPatternY={15}
                    fillPatternRepeat='no-repeat'
                />
            </Label>
        )
    }

}

export default ImagePhrase