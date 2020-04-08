import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage, Text, Rect, Layer, Label, Group } from 'react-konva'
import '../../style.css'

class VocabularyGame extends Component {

    state = {
        gradient: null,
        layers: ['layer-2', 'layer-1']
    }

    componentDidMount() {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let g = ctx.createLinearGradient(0, 0, 0, 550);

        g.addColorStop(0.00, '#6b88f2');
        g.addColorStop(1.00, '#e3b749');

        this.setState({
            gradient: g
        })
    }

    onStart = () => {
        const reLayers = this.state.layers;
        const index = reLayers.indexOf('layer-2')
        reLayers.splice(index, 1)
        reLayers.push('layer-2')

        this.setState({
            layers: reLayers
        })
    }

    layersShow = name => {
        const stage = {
            width: 900,
            height: 550
        }
        switch(name) {
            case 'layer-1':
                return (
                    <Group>
                        <Rect   
                            width={stage.width}
                            height={stage.height}
                            fill={this.state.gradient}
                            shadowBlur={10}/>
                        <Text
                            y={-100}
                            width={stage.width}
                            height={stage.height}
                            align="center"
                            verticalAlign='middle'
                            text='Fast Vocabulary Game'
                            fontSize={70}   
                            fontFamily='Berkshire Swash'
                            fill='black'/>
                        <Label 
                            x={stage.width / 2}
                            y={stage.height / 2 + 70}
                            onClick={this.onStart}>
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
                                fill='black'
                            />
                        </Label>
                    </Group>
                )
            case 'layer-2':
                return (
                    <Group>
                        <Rect   
                            width={stage.width}
                            height={stage.height}
                            fill={this.state.gradient}
                            shadowBlur={10}/>
                    </Group>
                )
            default:
                return('no layer');
        }
    }

    render() { 
        return (
            <Stage width={900} height={550}>
                {this.state.layers.map(layer => ( 
                    <Layer key={layer}>
                        {this.layersShow(layer)}
                    </Layer>
                ))}
            </Stage>
        )
    }
}

export default connect(null)(VocabularyGame)