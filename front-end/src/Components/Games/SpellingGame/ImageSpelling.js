import React, { Component } from 'react'
import { Rect, Label, Image } from 'react-konva'


class ImageSpelling extends Component {

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
                    fill='white'
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
                    fillPatternScaleX={0.7}
                    fillPatternScaleY={0.7}
                    fillPatternX={80}
                    fillPatternY={15}
                    fillPatternRepeat='no-repeat'
                />
            </Label>
        )
    }

}

export default ImageSpelling