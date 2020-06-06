import React, { Component } from 'react'
import { Rect, Label, Text } from 'react-konva'


class BackPauseRoundSpelling extends Component {

    render() {
        return (
            <Label
                x={110}
                y={100}
                scaleX={0.9}
                scaleY={0.9}>
                    
                {/* BACK */}
                <Label>
                    <Rect
                        width={200}
                        height={100}
                        fill="brown"
                        offsetX={100}
                        offsetY={50}
                        stroke={5}
                        strokeWidth={8}
                        cornerRadius={20}
                    />
                    <Text 
                        width={200}
                        height={100}
                        offsetX={100}
                        offsetY={50}
                        align="center"
                        verticalAlign="middle"
                        fill="#EEFFEF"
                        fontSize={50}
                        text="BACK"
                        onClick={this.props.backReturn}
                        fontFamily="Berkshire Swash"
                />
                </Label>

                {/* ROUND */}
                {/*<Label*/}
                {/*    y={260}>*/}
                {/*    <Rect*/}
                {/*        width={200}*/}
                {/*        height={100}*/}
                {/*        offsetX={100}*/}
                {/*        offsetY={50}*/}
                {/*        fill='green'*/}
                {/*        stroke={5}*/}
                {/*        strokeWidth={8}*/}
                {/*        cornerRadius={20}*/}
                {/*    />*/}
                {/*    <Text */}
                {/*        width={200}*/}
                {/*        height={100}*/}
                {/*        offsetX={100}*/}
                {/*        offsetY={50}*/}
                {/*        align='center'*/}
                {/*        verticalAlign='middle'*/}
                {/*        fontSize={50}*/}
                {/*        text="PAUSE"*/}
                {/*        onClick={this.props.pauseReturn}*/}
                {/*/>*/}
                {/*</Label>*/}
            
                {/* PAUSE */}
                <Label
                    y={130}>
                    <Rect
                        width={200}
                        height={100}
                        offsetX={100}
                        offsetY={50}
                        fill="blue"
                        stroke={5}
                        strokeWidth={8}
                        cornerRadius={20}
                    />
                    <Text
                        width={200}
                        height={100}
                        offsetX={100}
                        offsetY={50}
                        align="center"
                        verticalAlign="middle"
                        fontSize={50}
                        fill="#EEFFEF"
                        text={this.props.round}
                        fontFamily="Berkshire Swash"

                />
                </Label>
            </Label>
        )
    }

}

export default BackPauseRoundSpelling