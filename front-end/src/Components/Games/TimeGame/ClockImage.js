import React, {Component} from 'react';
import {Label, Rect, Circle, Text, Line} from "react-konva";

class ClockImage extends Component {

    state = {

        // stats for numbers, minutes and hours lines
        timeData: [
            {text: "1", x: 50, y: -100, size: 20, minutesX: 50 - 5, minutesY: -100 + 20, hourX: 50 - 15, hourY: -100 + 50},
            {text: "2", x: 85, y: -65, size: 20, minutesX: 85 - 10, minutesY: -65 + 15, hourX: 85 - 30, hourY: -65 + 41},
            {text: "3", x: 95, y: -20, size: 35, minutesX: 95 - 5, minutesY: -20 + 15, hourX: 95 - 25, hourY: -20 + 20},
            {text: "4", x: 85, y: 35, size: 20, minutesX: 85 - 3, minutesY: 35 + 4, hourX: 85 - 25, hourY: 35 + 5},
            {text: "5", x: 45, y: 80, size: 20, minutesX: 45 + 2, minutesY: 80 - 2, hourX: 45 - 15, hourY: 80 - 25},
            {text: "6", x: -10, y: 90, size: 35, minutesX: -10, minutesY: 90 - 8, hourX: -10, hourY: 90 - 20},
            {text: "7", x: -60, y: 80, size: 20, minutesX: -60 + 8, minutesY: 80 - 8, hourX: -60 + 15, hourY: 80 - 25},
            {text: "8", x: -100, y: 35, size: 20, minutesX: -100 + 16, minutesY: 35 + 2, hourX: -100 + 30, hourY: 35 - 10},
            {text: "9", x: -115, y: -20, size: 35, minutesX: -115 + 25, minutesY: -20 + 15, hourX: -115 + 45, hourY: -20 + 15},
            {text: "10", x: -100, y: -65, size: 20, minutesX: -100 + 25, minutesY: -65 + 18, hourX: -100 + 45, hourY: -65 + 20},
            {text: "11", x: -70, y: -100, size: 20, minutesX: -70 + 20, minutesY: -100 + 25, hourX: -70 + 38, hourY: -100 + 45},
            {text: "12", x: -25, y: -120, size: 35, minutesX: -25 + 22, minutesY: -120 + 30, hourX: -25 + 32, hourY: -120 + 50}
        ]

    }

    componentDidMount() {
        console.log("minutes : " + this.props.minutes)
        console.log("hours : " + this.props.hours)
    }

    //  get from state.timeData points for minutes line
    getMinutesPoints = () => {
        let data
        if (this.props.minutes === 0)
            data = this.state.timeData[11]
        else
            data = this.state.timeData[this.props.minutes / 5 - 1]

        return [0, 0, data.minutesX, data.minutesY]
    }

    //  get from state.timeData points for hour line
    getHoursPoints = () => {
        let data = this.state.timeData[this.props.hours - 1]
        return [0, 0, data.hourX, data.hourY]
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
                    fill={"#d0bc71"}
                    stroke={"#111111"}
                    strokeWidth={6}
                />

                {this.state.timeData.map(n => (
                    <Text
                        key={n.text}
                        width={40}
                        height={30}
                        x={n.x}
                        y={n.y}
                        fontSize={n.size}
                        text={n.text}
                        shadowColor={"#111111"}
                        shadowBlur={2}
                    />
                ))}

                {/*MINUTES POINT*/}
                <Line
                    points={this.getMinutesPoints()}
                    stroke={"#e3850d"}
                    strokeWidth={15}
                    lineJoin={"round"}
                    shadowColor={"#111111"}
                    shadowBlur={5}
                    tension={1}
                    lineCap={"round"}
                />

                {/*HOURS POINT*/}
                <Line
                    points={this.getHoursPoints()}
                    stroke={"#97bd07"}
                    strokeWidth={12}
                    lineJoin={"round"}
                    shadowColor={"#111111"}
                    shadowBlur={5}
                    tension={1}
                    lineCap={"round"}
                />

                <Circle
                    radius={15}
                    fill={"#0e96ec"}
                    shadowColor={"#111111"}
                    shadowBlur={5}
                />


            </Label>
        );
    }
}

export default ClockImage;