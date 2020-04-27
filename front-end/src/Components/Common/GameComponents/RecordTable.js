import React, { Component } from 'react'
import { Text, Rect, Label, Group } from 'react-konva'


class RecordTable extends Component {

    state = {
        gradient: null
    }

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

        console.log(this.state.props)

         //  stage data for canvas
         const stage = {
            width: 900,
            height: 550
        }

        return(
            <Group>
                {/* gradien */}
                <Rect   
                    width={stage.width}
                    height={stage.height}
                    fill={this.state.gradient}
                    shadowBlur={10}/>

                 {/* creating article */}
                <Label 
                    x={stage.width / 2} 
                    y={70}>

                    <Rect
                        width={300}
                        height={100}         
                        offsetX={150}
                        offsetY={50}
                        fill='white'
                        stroke='black'
                        strokeWidth={10}
                        cornerRadius={50}
                    />
                    <Text
                        width={300}
                        height={100}
                        offsetX={150}
                        offsetY={50}
                        align='center'
                        verticalAlign='middle'
                        text='Table'
                        fontSize={30}   
                        fontFamily='Berkshire Swash'
                        fill='black'
                    />
                </Label>                   
            
                {/* creating table  */}


            </Group>
        )
    } 
}

export default RecordTable