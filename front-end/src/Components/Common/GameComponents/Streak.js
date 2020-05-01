import React, { Component } from 'react'
import { Rect, Label } from 'react-konva'


class StreakSpelling extends Component {

    state = {
        rects: []
    }

    //  when componet would be create  it creats 6 rects
    componentDidMount() {

        let temp = []
        for (let i = 0; i < 6; i++) 
            //  very sensative props for rects on sreak line
            temp = [...temp, {
                index: i,
                height: 42,
                width: 130,
                x: 10,
                y: 260 - 50 * i
            }]

        this.setState({
            rects: temp
        })    
    }

    render() {
        return (
            <Label
                x={830}
                y={25}> 
              
                {/* BACKGROUND LINE */}
                <Rect 
                    width={150}
                    height={310}
                    fill='yellow'
                    cornerRadius={20}
                    strokeWidth={10}
                    stroke='black'
                />

                {/* STREAK RECTS */}
                {this.state.rects.map(rect => (
                    <Rect
                        key={rect.index}
                        x={rect.x}
                        y={rect.y}
                        width={rect.width}
                        height={rect.height}
                        fill={ this.props.streak > rect.index ? 'green' : '' }
                        strokeWidth={5}
                        cornerRadius={10}
                        stroke='black'
                    />
                ))}

            </Label>
        )
    }

}

export default StreakSpelling