import React, { Component } from 'react'
import { Rect, Label } from 'react-konva'


class TimeLineSpelling extends Component {

    state = {
        rects: []
    }

    //  when componet would be create  it creats 10 rects
    componentDidMount() {
        let temp = []
        for (let i = 0; i < 10; i++) 
            //  very sensative props for rects on time line
            temp = [...temp, {
                index: i,
                height: 50,
                width: 40,
                x: 9 + 47 * i,
                y: 5
            }]
        this.setState({
            rects: temp
        })    
    }


    render() {
        
        return (
            <Label
                x={260}
                y={580}>

                {/* BACKGROUND LINE */}
                <Rect
                    width={480}
                    height={60}    
                    fill='white'
                    stroke='black'
                    strokeWidth={8}
                    cornerRadius={20}
                />

                {/* TIME RECTS */}
                {this.state.rects.map(rect => (
                    <Rect
                        key={rect.index}
                        x={rect.x}
                        y={rect.y}
                        width={rect.width}
                        height={rect.height}
                        fill='red'
                        strokeWidth={5}
                        cornerRadius={10}
                        stroke='black'
                        visible={this.props.time > rect.index}
                    />
                ))}

            </Label>
        )
    }
}

export default TimeLineSpelling