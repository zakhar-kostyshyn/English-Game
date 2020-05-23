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
import ImagePhrase from './ImagePhrase'
import TextField from '../../Common/GameComponents/TextField'
import WordsRects from '../../Common/GameComponents/WordsRects'


class PharaseGame extends Component {

    state = {

        maxRound: 10,

        stage: {
            width: 1000,
            height: 650
        },

        image: null, 
        allImages: [],

        text: [],
        shuffleWords: [],
        successWordIndex: 0,

        streak: 0,
        score: 0,
        time: 0,
        round: 1,
        right: 0,
        error: 0,

        isTimeStop: false,

        statePlayerData: []

    }

    /////////   components  ///////////

    componentDidUpdate() {
        
        //  if StartState represent layer-3
        if (this.props.currentLayer[3] === 'layer-3')
            //  allow if component recive allImages
            if (this.props.allImages.length !== 0 && this.state.allImages.length === 0)
                this.setState({
                    allImages: this.props.allImages
                }, () => this.startGameProcess())            

        //  allow if all words for text was correct given (micro task passed) 
        if (this.state.successWordIndex === this.state.text.length && this.state.text.length > 0)
            this.microTaskComplited()
    }
    

    componentWillUnmount() {
        //  stop timer
        clearInterval(this.state.tick)
    }

    /////////   components  ///////////


    /////////   play process  ///////////

    startGameProcess = () => {
        this.getImageAndWords()
        this.startTimer() 
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

    getImageAndWords = () => {

        const img = _.sample(this.state.allImages)                    //  get image 
        const imgName = img.name.substring(0, img.name.length - 4)     //  get name from image

        const words = _.split(imgName, ' ')        
        const randomSuffleWords = _.shuffle(words)            //  shuffle

        const workImg = new Image()
        workImg.src = `data:image/png;base64,${img.image}` 
        workImg.onload = () => {
            this.setState({
                image: workImg,
                text: words,
                shuffleWords: randomSuffleWords,
                allImages: this.state.allImages.filter(image => image.id !== img.id)
            })
        }
    }

    toDefaultState = () => {
        this.setState({
            image: null, 
            allImages: [],

            shuffleWords: [],
            text: [],
            successWordIndex: 0,

            streak: 0,
            time: 0,
            round: 1,
            right: 0,
            error: 0,

            isTimeStop: false
        })
    }

    correctAnswerHandler = () => {

        //  say well play
        speechSynthesis.speak(new SpeechSynthesisUtterance(this.state.text[this.state.successWordIndex]))

        const streak = 100 * this.state.streak

        //  increase score, streak, right answer and letter index 
        this.setState({
            successWordIndex: ++this.state.successWordIndex,
            score: this.state.time < 10 ? this.state.score + 200 + streak : this.state.score + 100 + streak,
            right: ++this.state.right,
            streak: this.state.streak === 6 ? this.state.streak : ++this.state.streak,
        })
    }

    wrongAnswerHandler = () => {

        //  say wrong
        speechSynthesis.speak(new SpeechSynthesisUtterance("no"))

        //  decrease score, streak and increase errors
        this.setState({
            score: this.state.score - 100,
            error: ++this.state.error,
            streak: 0
        })
    }

    microTaskComplited = () => {

        speechSynthesis.speak(new SpeechSynthesisUtterance(_.join(this.state.text, ' ')))

        //  stop timer
        clearInterval(this.state.tick)

        //  make word to array for normal represent with vocabulary 3 words in result
        let words = []
        words.push(_.join(this.state.text, ' '))

        //  check the end of rounds 
        if (this.state.round === this.state.maxRound)
            this.setState({
                statePlayerData: [...this.state.statePlayerData, {
                    round: this.state.round,
                    word: words,
                    error: this.state.error,
                    right: this.state.right,
                    time: this.state.time,
                    mark: this.state.error > this.state.right ? 'Bad' : this.state.error !== 0 ? 'Good' : "Well Done"
                }],
            }, () => {
                this.endGame()
            })
        else 
            this.setState({

                statePlayerData: [...this.state.statePlayerData, {
                    round: this.state.round,
                    word: words,
                    error: this.state.error,
                    right: this.state.right,
                    time: this.state.time,
                    mark: this.state.error > this.state.right ? 'Bad' : this.state.error !== 0 ? 'Good' : "Well Done"
                }],

                successWordIndex: 0,
                score: this.state.score + 300,

                //  increase count of rounds
                round: ++this.state.round,
                isTimeStop: true,

                time: 0,
                image: null,
                words: [],
                right: 0,
                error: 0

            }, () => this.startGameProcess())
    }

    endGame = () => {

        //  stop timer
        clearInterval(this.state.tick)

        //  return DATA and SCORE about game to top Component StartGame
        this.props.gamePlayerDataAndScoreReturn(this.state.statePlayerData, this.state.score)

        //  state to default
        this.toDefaultState()

        //  change layer on RecordTable
        this.props.changeLayerReturn('layer-4')
    }

    /////////   play process  ///////////


    /////////   events handlers  ///////////

    onClickPause = () => {
        if (this.state.isTimeStop) { 
            this.startTimer(); 
            this.setState({ isTimeStop: false }) 
        } else this.setState({ isTimeStop: true })
    }
    
    onClickBack = () => window.location.reload()

        
    onClickWordButton = e => {
        //  chek if pressed word match with curent successWordIndex
        if (e.target.attrs.text === this.state.text[this.state.successWordIndex])
            this.correctAnswerHandler()
        else this.wrongAnswerHandler()
    }

    /////////   events handlers  ///////////

    render() {

        //  must be ==
        if (this.state.image == undefined) return ( <Loading/> )
        else 
            return (
                <Label>
                    <Backgroud/>
                    
                    {/* IMAGE  */}
                    <ImagePhrase image={this.state.image}/>
             
                    {/* BACK PAUSE ROUND */}
                    <BackPauseRound
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
                    
                    {/* WORD REPRESENT */}
                    <TextField
                        text={this.state.text} 
                        successWordIndex={this.state.successWordIndex}
                    />

                    {/* WORDS */}
                    <WordsRects
                        words={this.state.shuffleWords}
                        isPause={this.state.isTimeStop}
                        clickWordButtonReturn={this.onClickWordButton}
                    />

                </Label>
            )
    }

}


export default PharaseGame