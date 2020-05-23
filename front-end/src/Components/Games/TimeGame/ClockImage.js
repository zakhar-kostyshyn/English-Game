import React, {Component} from 'react';
import {Label, Rect, Circle, Text, Line} from "react-konva";

class ClockImage extends Component {

    state = {

        // time numbers
        numbers: [
            {text: "1", x: 50, y: -100, size: 20},
            {text: "2", x: 85, y: -65, size: 20},
            {text: "3", x: 95, y: -20, size: 35},
            {text: "4", x: 85, y: 35, size: 20},
            {text: "5", x: 45, y: 80, size: 20},
            {text: "6", x: -10, y: 90, size: 35},
            {text: "7", x: -60, y: 80, size: 20},
            {text: "8", x: -100, y: 35, size: 20},
            {text: "9", x: -115, y: -20, size: 35},
            {text: "10", x: -100, y: -65, size: 20},
            {text: "11", x: -70, y: -100, size: 20},
            {text: "12", x: -25, y: -120, size: 35}
        ],

        hours: null,
        minutes: null

    }

    componentDidMount() {

    }

    render() {
        return (
            <Label
                x={500}
                y={160}>

                <Rect
                    width={450}
                    height={280}
                    offsetX={225}
                    offsetY={135}
                    fill={"white"}
                    stroke={"black"}
                    strokeWidth={8}
                    cornerRadius={20}
                />

                <Circle
                    radius={125}
                    fill={"#dec25d"}
                    stroke={"#111111"}
                    strokeWidth={6}
                />

                {this.state.numbers.map(n => (
                    <Text
                        width={40}
                        height={30}
                        x={n.x}
                        y={n.y}
                        fontSize={n.size}
                        text={n.text}
                    />
                ))}

                {/*HOUR POINT*/}
                <Line
                    points={[0, 0, 50, 50]}
                    stroke={"#554d09"}
                    strokeWidth={13}
                    lineJoin={"round"}
                />

                {/*HOUR POINT*/}
                <Line
                    points={[0, 0, 50, -100 + 30]}
                    stroke={"#554d09"}
                    strokeWidth={13}
                    lineJoin={"round"}
                />

                <Circle
                    radius={15}
                    fill={"#554d09"}
                    shadowColor={"#111111"}
                    shadowBlur={4}
                />


            </Label>
        );
    }
}

export default ClockImage;