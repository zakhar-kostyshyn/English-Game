import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage, Text, Rect, Layer, Label, Group } from 'react-konva'
import ChooseTheme from './ChooseTheme'
import VocabularyGame from '../Games/VocabularyGame'
import { getTheme, getImage } from '../../Actions/ImageAction'
import '../../style.css'

class StartGame extends Component {
   
    state = {

        //  gradient for game
        gradient: null,

        //  theme for layer-3 
        theme: "",

        //  canvas layers
        layers: ['layer-3', 'layer-1', 'layer-2']
    }

    componentDidMount() {

        //  create gradient because we can't do this in Konva props
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let grad = ctx.createLinearGradient(0, 0, 0, 550);

        grad.addColorStop(0.00, '#6b88f2');
        grad.addColorStop(1.00, '#e3b749');

        this.setState({
            gradient: grad
        })
    }


    //  change array of layers, remove input layer and insert in the end of array
    //  to display on canvas
    //  after all action set array to state
    changeLayer = layerName => {
        
        const arrayOfLayers = this.state.layers
        const indexOfLayer = arrayOfLayers.indexOf(layerName)
        arrayOfLayers.splice(indexOfLayer, 1)
        arrayOfLayers.push(layerName)

        this.setState({
            layers: arrayOfLayers
        })
    }

    //  set theme from RectHiglight component and this func set 
    //  into props of ChooseTheme and then into RectHiglight, baddd.
    //  but I don't wanna use redux here

    //  after getting theme calls action ImageAction and 
    //  set into reducer state all images from theme

    //  change layer
    setTheme = themeName => {
        this.setState({
            theme: themeName
        })

        //  get theme into ImageReducers state from back-end 
        this.props.getTheme(this.state.theme.toLowerCase())
    
        //  change layer on main
        this.changeLayer('layer-3')        
    }
    

    //  invoke when we click on start button
    onStart = () => this.changeLayer('layer-2')
    
    //  say which main game component shood load in layer with name layer-3
    componentShow = () => {
        switch(this.props.component) {
            case 'Vocabulary':
                return (
                    //  give all images for component which represent layer-3
                    <VocabularyGame images={this.props.images} />
                )
            //  TODO more cases for each game
            default:
                return('no game')
        }
    }

    //  show layer by name from state.layers
    layersShow = name => {

        const stage = {
            width: 900,
            height: 550
        }

        switch(name) {
            case 'layer-1':
                return (
                    //  start and rewiev layer
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
                            stroke='grey'
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
            case 'layer-2':
                return (
                    //  choosing theme for game
                    <ChooseTheme setTheme={this.setTheme}/>
                )
            case 'layer-3':
                return (
                    //  main game layer
                    <Group>
                        {this.componentShow()}
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

const mapStateToProps = state => ({
    images: state.ImageReducer.images
})

export default connect(mapStateToProps, { getTheme })(StartGame)