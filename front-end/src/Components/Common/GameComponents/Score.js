import React, { Component } from 'react'
import { Rect, Label, Text } from 'react-konva'


class ScoreSpelling extends Component {

    render() {
        return (
            <Label
                x={870}
                y={560}>
              
                <Label>
                    <Rect 
                        width={200}
                        height={150}
                        offsetX={100}
                        offsetY={75}
                        fill='black'
                        cornerRadius={20}
                        strokeWidth={10}
                        stroke='white'
                    />

                    <Text
                        width={200}
                        height={150}
                        offsetX={100}
                        offsetY={75}
                        fill='white'
                        align='center'
                        verticalAlign='middle'
                        fontSize={50}
                        text={this.props.score}
                    />
                </Label>

            </Label>
        )
    }

}

export default ScoreSpelling