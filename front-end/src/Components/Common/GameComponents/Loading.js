import React, { Component } from 'react'
import { Text, Rect, Label} from 'react-konva'
import Backgroud from './Backgroud'

class Loading extends Component {


    render() {

        const stage = {
            width: 1000,
            height: 650
        }
        return (
            <Label>
                <Backgroud/>
                <Label x={stage.width / 2} y={stage.height / 2} >
                    <Rect
                        width={500}
                        height={150}
                        offsetX={250}
                        offsetY={75}
                        fill='white'
                        stroke='black'
                        strokeWidth={10}
                        cornerRadius={50}/>
                    <Text
                        offsetX={160}
                        offsetY={30}
                        text='LOADING'
                        fontSize={60}   
                        fontFamily='Berkshire Swash'
                        fill='black'
                        stroke='grey'/>
                </Label>
            </Label>
        )
    }

}

export default Loading