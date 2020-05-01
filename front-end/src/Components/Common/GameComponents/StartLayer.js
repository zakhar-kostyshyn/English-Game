import React, { Component } from 'react'
import { Text, Rect, Label, Group} from 'react-konva'
import Backgroud from './Backgroud'

class StartLayer extends Component {

    render() {
        const stage = {
            width: 1000,
            height: 650
        }
        return (
            <Group>
                <Backgroud/>
                <Text
                    y={-100}
                    width={stage.width}
                    height={stage.height}
                    align="center"
                    verticalAlign='middle'
                    text='Fast Vocabulary Game'
                    fontSize={70}   
                    fontFamily='Berkshire Swash'
                    stroke='grey'
                    fill='black'/>
                <Label 
                    x={stage.width / 2}
                    y={stage.height / 2 + 70}
                    onClick={this.props.changeLayerReturn}>
                    <Rect
                        width={300}
                        height={100}
                        offsetX={150}
                        offsetY={50}
                        fill='white'
                        stroke='black'
                        strokeWidth={10}
                        cornerRadius={50}/>
                    <Text
                        offsetX={50}
                        offsetY={25}
                        text='Start'
                        fontSize={50}   
                        fontFamily='Berkshire Swash'
                        stroke='grey'
                        fill='black'/>
                </Label>
                <Label 
                    x={stage.width / 2}
                    y={stage.height / 2 + 190}
                    >
                    <Rect
                        width={200}
                        height={70}
                        offsetX={100}
                        offsetY={35}
                        fill='white'
                        stroke='black'
                        strokeWidth={10}
                        cornerRadius={50}/>
                    <Text
                        offsetX={50}
                        offsetY={18}
                        text='Rewiev'
                        fontSize={30}   
                        fontFamily='Berkshire Swash'
                        stroke='grey'
                        fill='black'
                    />
                </Label>
            </Group>
        )
    }

}

export default StartLayer