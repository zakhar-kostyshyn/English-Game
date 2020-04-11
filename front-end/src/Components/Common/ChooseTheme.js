import React, { Component } from 'react'
import { Group, Rect, Label, Text } from 'react-konva'
import RectHiglight from './RectHiglight'

class ChooseTheme extends Component {

    state = {
        gradient: null,
        allLabels: labes(),
        rectFill: 'gainsboro'
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

        //  stage data for canvas
        const stage = {
            width: 900,
            height: 550
        }

        return (
            <Group>

                {/* gradien */}
                <Rect   
                    width={stage.width}
                    height={stage.height}
                    fill={this.state.gradient}
                    shadowBlur={10}/>

                {/* creating table where will be rect with game's themes and groups */}
                <Label x={stage.width / 2} y={stage.height / 2} > 
                    <Rect
                        width={800}
                        height={400}
                        offsetX={400}
                        offsetY={150}
                        fill={this.state.rectFill}
                        stroke='black'
                        strokeWidth={10}
                        cornerRadius={50}/>       
                        
                        <Label x={34} >
                            <Rect
                                width={700}
                                height={280}
                                offsetX={350}
                                offsetY={100}
                                fill='gainsboro'/>
       
                                {/* create labels using data from state */}
                                {this.state.allLabels.map(l => (
                                    <Label  x={l.xx} y={l.yy} key={l.id}>
                                        <RectHiglight setTheme={this.props.setTheme} name={l.name}/>
                                    </Label> 
                                )) }
                        </Label>
                </Label>

                {/* creating article */}
                <Label x={stage.width / 2} y={100} >
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
                        text='Select Theme'
                        fontSize={60}   
                        fontFamily='Berkshire Swash'
                        fill='black'
                        stroke='grey'/>
                </Label>
            </Group>
        )
    }
}

//  create array which contain cordinates for 2 line themes
const labes = () => {
    const textNames = ['Animals', 'Clothers', 'Foods', 'Home', 'Jobs', 'Numbers', 'Letters', 'Body', 'Colors', 'Places']
    const array = []
    for (let i = 0, x = -320, y = -20; i < 10; i++, x += 150) { 
        if (i == 5) {
            x = -320
            y = 130
        } 
        array.push({
            xx: x,
            yy: y,
            id: i,
            name: textNames[i]
        })    
    }
    return array;
}

export default ChooseTheme

