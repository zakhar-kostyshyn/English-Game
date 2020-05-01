import React, { Component } from 'react'
import { Label } from 'react-konva'
import Loading from '../../Common/GameComponents/Loading'
import * as _ from 'lodash'
import Backgroud from '../../Common/GameComponents/Backgroud'
import BackPauseRound from '../../Common/GameComponents/BackPauseRound'
import Streak from '../../Common/GameComponents/Streak'
import Time from '../../Common/GameComponents/Time'
import Score from '../../Common/GameComponents/Score'
import TimeLine from '../../Common/GameComponents/TimeLine'
import LinesVocabulary from './LinesVocabulary';




class VocabularyGame extends Component {

    state = {

        maxRound: 5,

        stage: {
            width: 1000,
            height: 650
        },

        allImages: [],
        firstLineImages: [], 
        secondLineImages: [],
        
    
        streak: 0,
        score: 0,
        time: 0,
        round: 0,
        right: 0,
        error: 0,

        isTimeStop: false,

        statePlayerData: [],

        name: null

    }


    /////////   components  ///////////

    componentDidUpdate() {

        //  if StartState represent layer-3
        if (this.props.currentLayer[3] == 'layer-3') {
            //  allow if component recive allImages
            if (this.props.allImages.length != 0 && this.state.allImages.length == 0) {
                this.setState({
                    allImages: this.props.allImages
                }, () => this.startGameProcess())  
            }
        }

        if (this.state.secondLineImages.length > 0)
            if (!this.state.secondLineImages[0].visible && !this.state.secondLineImages[1].visible && !this.state.secondLineImages[2].visible)                
                this.microTaskComplited()
    }

    componentWillUnmount() {
        //  stop timer
        clearInterval(this.state.tick)
    }

    /////////   components  ///////////

    /////////   play process  ///////////

    startGameProcess = () => {
        this.getImagesForLines()
        this.startTimer() 
    }

    getImagesForLines = () => {
        const treeRandomImages = []

        //  my callback hell......
        //  oh my LORD this language is exciting
        //  next lines get and remove 3 image obj from this.props.allImage, add this images to firstLine and secondLine 
        //  and additionaly suffle second line
        treeRandomImages[0] = _.sample(this.state.allImages)
        this.setState({ 
            allImages: this.state.allImages.filter(image => image.id != treeRandomImages[0].id) 
        }, () => {
            treeRandomImages[1] = _.sample(this.state.allImages)
            this.setState({ 
                allImages: this.state.allImages.filter(image => image.id != treeRandomImages[1].id) 
            }, () => {
                treeRandomImages[2] = _.sample(this.state.allImages)
                this.setState({
                    allImages: this.state.allImages.filter(image => image.id != treeRandomImages[2].id)
                }, () => {
                    //  okay load images to lines and remove image this also should be rework
                    const firstImage = new Image()
                    firstImage.src = `data:image/png;base64,${treeRandomImages[0].image}` 
                    firstImage.onload = () => {
                        this.setState({
                        firstLineImages: [...this.state.firstLineImages, {
                            visible: true,
                            image: firstImage,
                            name: treeRandomImages[0].name.substring(0, treeRandomImages[0].name.length - 4),
                        }],
        
                        secondLineImages: [..._.shuffle(this.state.secondLineImages), {
                            visible: true,
                            image: firstImage,
                            name: treeRandomImages[0].name.substring(0, treeRandomImages[0].name.length - 4),
                        }],
        
                        allImages: this.state.allImages.filter(image => image.id != treeRandomImages[0].id)
                    })}
        
                    const secondImage = new Image()
                    secondImage.src = `data:image/png;base64,${treeRandomImages[1].image}` 
                    secondImage.onload = () => {this.setState({
                        firstLineImages: [...this.state.firstLineImages, {
                            visible: true,
                            image: secondImage,
                            name: treeRandomImages[1].name.substring(0, treeRandomImages[1].name.length - 4),
                        }],
        
                        secondLineImages: [..._.shuffle(this.state.secondLineImages), {
                            visible: true,
                            image: secondImage,
                            name: treeRandomImages[1].name.substring(0, treeRandomImages[1].name.length - 4),
                        }],
        
                        allImages: this.state.allImages.filter(image => image.id != treeRandomImages[0].id)
                        
                    })}
        
        
                    const thirdImage = new Image()
                    thirdImage.src = `data:image/png;base64,${treeRandomImages[2].image}`
                    thirdImage.onload = () => {this.setState({
                        firstLineImages: [...this.state.firstLineImages, {
                            visible: true,
                            image: thirdImage,
                            name: treeRandomImages[2].name.substring(0, treeRandomImages[2].name.length - 4),
                        }],
        
                        secondLineImages: [..._.shuffle(this.state.secondLineImages), {
                            visible: true,
                            image: thirdImage,
                            name: treeRandomImages[2].name.substring(0, treeRandomImages[2].name.length - 4),
                        }],
        
                        allImages: this.state.allImages.filter(image => image.id != treeRandomImages[0].id)
        
                    })}
                })
            })
        })

      
    }

    startTimer = () => {
        let intervalId = setInterval(() => this.timer(), 1000)

        this.setState({
            tick: intervalId,
            time: this.state.time,
            isTimeStop: false,
        })
    }

    timer = () => {
        if (this.state.isTimeStop) clearInterval(this.state.tick)
        this.setState({
            time: ++this.state.time
        })
    }

    wrongAnswerHandler = () => {

        //  say wrong
        speechSynthesis.speak(new SpeechSynthesisUtterance("wrong"))

        //  decrease score, streak and increase errors
        this.setState({
            score: this.state.score - 100,
            error: ++this.state.error,
            streak: 0
        })
    }

    correctAnswerHandler = name => {

        //  say well play
        speechSynthesis.speak(new SpeechSynthesisUtterance(name))

        const streak = 100 * this.state.streak

        //  increase score, streak, right answer and letter index 
        this.setState({
            score: this.state.time < 10 ? this.state.score + 200 + streak : this.state.score + 100 + streak,
            right: ++this.state.right,
            streak: ++this.state.streak,
            name: null,
            firstLineImages: this.state.firstLineImages.map(img => img.name == name ? {
                image: img.image,
                name: img.name,
                visible: false
            } : img),
            secondLineImages: this.state.secondLineImages.map(img => img.name == name ? {
                image: img.image,
                name: img.name,
                visible: false
            } : img)
        })
    }

    microTaskComplited = () => {

        //  stop timer
        clearInterval(this.state.tick)


        //  check the end of rounds 
        if (this.state.round == this.state.maxRound) 
            this.endGame();
        else 
            this.setState({
                //  save data about microtask to represent in the end of game and then safe to user stats
                statePlayerData: [...this.state.statePlayerData, {
                    word: this.state.firstLineImages,
                    errors: this.state.error,
                    time: this.state.time,
                    streak: this.state.streak,
                    score: this.state.score
                }],

                score: this.state.score + 300,

                //  increase count of rounds
                round: ++this.state.round,
                isTimeStop: true,
                streak: ++this.state.streak,

                time: 0,
                firstLineImages: [],
                secondLineImages: [],
                right: 0,
                error: 0

            }, () => this.startGameProcess())
    }

    endGame = () => {

        //  stop timer
        clearInterval(this.state.tick)

        //  return DATA about game to top Component StartGame
        this.props.gamePlayerDataReturn(this.state.statePlayerData)

        //  return SCORE about game to top Component StartGame
        this.props.scoreReturn(this.state.score)

        //  state to default
        this.toDefaultState()

        //  change layer on RecordTable
        this.props.changeLayerReturn('layer-4')

    }

    toDefaultState = () => {
        this.setState({
            firstLineImages: [], 
            secondLineImages: [], 
            allImages: [],

            streak: 0,
            score: 0,
            time: 0,
            round: 0,
            right: 0,
            error: 0,

            isTimeStop: false,       

            statePlayerData: []
        })
    }

    /////////   play process  ///////////

    /////////   events handlers  ///////////

    onClickFirstLine = e => {
        this.setState({
            name: e.currentTarget.attrs.name
        })
    }

    onClickSecondLine = e => {

        if (this.state.name == null)
            return
        
        if (this.state.name == e.currentTarget.attrs.name)
            this.correctAnswerHandler(e.currentTarget.attrs.name)
        else
            this.wrongAnswerHandler()
    }

    onClickPause = () => {
        if (this.state.isTimeStop) { 
            this.startTimer(); 
            this.setState({ isTimeStop: false, time: --this.state.time }) 
        } else this.setState({ isTimeStop: true })
    }

    onClickBack = () => {

        //  stop timer
        clearInterval(this.state.tick)

        this.toDefaultState()
        this.props.changeLayerReturn('layer-1')
    }

    /////////   events handlers  ///////////


    render() {
        if (this.state.firstLineImages.length == 0 || this.state.secondLineImages.length == 0) return ( <Loading/> )
        else 
            return (
                <Label>
                    <Backgroud/>

                    {/* BACK PAUSE ROUND */}
                    <BackPauseRound 
                        backReturn={this.onClickBack}
                        pauseReturn={this.onClickPause}
                        round={this.state.round}
                    />

                    {/* STREAK TABLE */}
                    <Streak streak={this.state.streak}/>

                    {/* TIME */}
                    <Time time={this.state.time}/>

                    {/* SCORE */}
                    <Score score={this.state.score}/>

                    {/* TIME LINE */}
                    <TimeLine time={this.state.time}/>

                    {/* TWO LINES */}
                    <LinesVocabulary
                        firstLineImages={this.state.firstLineImages}
                        secondLineImages={this.state.secondLineImages}
                        onClickFirstLineReturn={this.onClickFirstLine}
                        onClickSecondLineReturn={this.onClickSecondLine}
                    />

                </Label>
            )
    }
}

export default VocabularyGame