import React, { Component } from 'react'
import { Rect, Label, Text } from 'react-konva'


class LetterSpelling extends Component {

    state = {
        rects: []
    }

    //  when componet would be create  it creats 15 rects
    componentDidMount() {

        let temp = []
        for (let i = 0; i < 15; i++) 
            //  very sensative props for letters rects 
            temp = [...temp, {
                index: i,
                height: 80,
                width: 80,
                x: i < 10 ? 95 * i : (235 + 95 * (i - 10)),         //  reresent and second line if i < 10
                y: i < 10 ? 0 : 100        
            }]

        this.setState({
            rects: temp
        })    
    }

    onClick = e => this.props.clickLetterButtonReturn(e)


    render() {
        
        return (
            <Label
                x={35}
                y={380}>

                {/* LETTERS RECTS */}
                {this.state.rects.map(rect => (
                    <Label
                        x={rect.x}
                        y={rect.y}
                        key={rect.index}>

                        <Rect
                            width={rect.width}
                            height={rect.height}
                            fill='white'
                            strokeWidth={5}
                            cornerRadius={10}
                            stroke='black'
                        />

                        <Text
                            width={rect.width}
                            height={rect.height}
                            align='center'
                            verticalAlign='middle'
                            fontSize={40}
                            listening={!this.props.isPause}
                            text={this.props.letters[rect.index]}
                            onClick={this.onClick}
                        />

                    </Label>
                ))}
              
            </Label>
        )
    }

}

export default LetterSpelling