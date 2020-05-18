
// StartGame contain together all layers of game layer-3 often deffer
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { Stage, Layer, Group } from 'react-konva'
import ChooseTheme from '../GameComponents/ChooseTheme'
import { getTheme } from '../../../Actions/ImageAction'
import Result from '../GameComponents/Result'
import VocabularyGame from '../../Games/VocabularyGame/VocabularyGame'
import SpellingGame from '../../Games/SpellingGame/SpellingGame'
import PhraseGame from '../../Games/PhraseGame/PhraseGame'
import TimeGame from '../../Games/TimeGame/TimeGame'
import StartLayer from '../GameComponents/StartLayer'
import { createNewScore } from '../../../Actions/ScoreAction'
import moment from "moment"



class StartGame extends Component {
   
    state = {

        //  theme for layer-3 
        theme: "",

        //  canvas layers
        layers: ['layer-4', 'layer-3', 'layer-2', 'layer-1'],

        playerScore: 0,
        playerData: null,

        task: null,
        isTaskComplited: false,

        //  ensure in DidUpdate that I make only one post request
        isScorePost: false
    }


    componentDidUpdate() {
        //  when game end post score  
        if (this.state.layers[3] == 'layer-4' && !this.state.isScorePost) {

            this.props.createNewScore(
                this.props.component, 
                this.props.username, 
                this.state.playerScore,
                moment())

            //  only one
            this.setState({
                isScorePost: true
            })
        }
    }


    //  save date and score from game 
    gamePlayerDataAndScoreReturn = (data, score) => {
        this.setState({
            playerData: data,
            playerScore: score
        })
    }

    //  changeLayer already is
    task = isComlited => {
        this.setState({
            isTaskComplited: isComlited
        })
    }

    startChangeLayerReturn = () => this.changeLayer('layer-2')



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
    //  but I don't know how to use redux with Konva canvas 

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
    
    //  say which main game component shood load in layer with name layer-3
    componentShow = () => {
        switch(this.props.component) {
            case 'Vocabulary':
                return (
                    //  give all images for component which represent layer-3
                    <VocabularyGame 
                        currentLayer={this.state.layers}
                        allImages={this.props.images}
                        gamePlayerDataAndScoreReturn={this.gamePlayerDataAndScoreReturn}
                        changeLayerReturn={this.changeLayer}
                        task={this.state.task}
                        taskReturn={this.taskReturn}
                    />
                )
            case 'Spelling':
                return (
                    <SpellingGame
                        currentLayer={this.state.layers}
                        allImages={this.props.images}
                        gamePlayerDataAndScoreReturn={this.gamePlayerDataAndScoreReturn}
                        changeLayerReturn={this.changeLayer}
                        task={this.state.task}
                        taskReturn={this.taskReturn}
                    />
                ) 
            case 'Phrase' :
                return (
                    <PhraseGame
                        currentLayer={this.state.layers}
                        allImages={this.props.images}
                        gamePlayerDataAndScoreReturn={this.gamePlayerDataAndScoreReturn}
                        changeLayerReturn={this.changeLayer}
                        task={this.state.task}
                        taskReturn={this.taskReturn}
                    />
                ) 
            case 'Time' :
                return (
                    <TimeGame
                        currentLayer={this.state.layers}
                        gamePlayerDataAndScoreReturn={this.gamePlayerDataAndScoreReturn}
                        changeLayerReturn={this.changeLayer}
                        task={this.state.task}
                        taskReturn={this.taskReturn}
                    />
                )  
            //  TODO more cases for each game
            default:
                return('no game')
        }
    }

    //  show layer by name from state.layers
    layersShow = name => {

        switch(name) {
            case 'layer-1':
                return (
                    //  start and rewiev layer
                    <StartLayer 
                        setTheme={this.setTheme}
                        changeLayerReturn={this.startChangeLayerReturn} 
                        component={this.props.component}/>
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
            case 'layer-4':
                return (
                    //  show table set to the props name of game
                    <Result 
                        data={this.state.playerData} 
                        score={this.state.playerScore}
                        indexAddScore={this.props.indexAddScore}
                    />
                )    
            default:
                return('no layer');
        }
    }

    render() {         
        return (
            <Segment style={{ margin: 'auto'}}>
                <Stage width={1000} height={650}>
                        {this.state.layers.map(layer => ( 
                            <Layer key={layer}>
                                {this.layersShow(layer)}
                            </Layer>
                        ))}
                </Stage>
            </Segment>
        )
    }
}

const mapStateToProps = state => ({
    images: state.ImageReducer.images,
    indexAddScore: state.ScoreReducer.indexAddScore,
    username: state.UserReducer.username
})

export default connect(mapStateToProps, { getTheme, createNewScore })(StartGame)