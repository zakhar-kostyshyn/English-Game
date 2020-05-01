import React, { Component } from 'react'
import { Text, Rect, Label, Group } from 'react-konva'
import Backgroud from './Backgroud';


class RecordTable extends Component {

    componentDidMount() {

        //  create gradient and set to state
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let grad = ctx.createLinearGradient(0, 0, 0, 550);

        grad.addColorStop(0.00, '#6b88f2');
        grad.addColorStop(1.00, '#e3b749');

        this.setState({
            gradient: grad
        })
    }

    render() {

        console.log(this.props)

         //  stage data for canvas
         const stage = {
            width: 1000,
            height: 650
        }

        return(
            <Group>
                <Backgroud/>
                <Label
                    x={stage.width / 2}
                    y={stage.height / 2}>
                    <Rect 
                        width={200}
                        height={200}
                        fill='white'
                        stroke='black'
                        strokeWidth={10}
                    />
                    <Text
                       width={200}
                       height={200} 
                       align='center'
                       verticalAlign='middle'
                       fontSize={30}
                       text='HERE SHOULD BE TABLE'
                    />
                </Label>
            </Group>
        )
    } 
}

export default RecordTable