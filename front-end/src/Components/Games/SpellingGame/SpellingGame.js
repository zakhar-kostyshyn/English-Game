import React, { Component } from 'react'
import { Label } from 'react-konva'
import Loading from '../../Common/GameComponents/Loading'
import * as _ from 'lodash'
import Backgroud from '../../Common/GameComponents/Backgroud'
import ImageSpelling from './ImageSpelling'
import LetterSpelling from './LetterSpelling'
import WordSpelling from './WordSpelling'
import BackPauseRound from '../../Common/GameComponents/BackPauseRound'
import Streak from '../../Common/GameComponents/Streak'
import Time from '../../Common/GameComponents/Time'
import Score from '../../Common/GameComponents/Score'
import TimeLine from '../../Common/GameComponents/TimeLine'

class SpellingGame extends Component {

    state = {

        maxRound: 11,

        stage: {
            width: 1000,
            height: 650
        },

        image: null, 
        allImages: [],

        letters: [],
        rightWord: "",
        successLetterIndex: 0,

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
        if (this.props.currentLayer[3] == 'layer-3') 
            //  allow if component recive allImages
            if (this.props.allImages.length != 0 && this.state.allImages.length == 0) 
                this.setState({
                    allImages: this.props.allImages
                }, () => this.startGameProcess())            

        //  allow if letters for word was correct given (micro task passed) 
        if (this.state.successLetterIndex == this.state.rightWord.length && this.state.rightWord.length > 0)     
            this.microTaskComplited()
    }
    

    componentWillUnmount() {
        //  stop timer
        clearInterval(this.state.tick)
    }

    /////////   components  ///////////


    /////////   play process  ///////////

    startGameProcess = () => {
        this.getImageWordLetters()
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

    getImageWordLetters = () => {

        const img = _.sample(this.state.allImages)                    //  get image 
        const imgName = img.name.substring(0, img.name.length - 4)     //  get name from image

        const rightLetters = _.split(imgName, '');                         //  split on letters
        const randomLetters = rightLetters                              

        let size = rightLetters.length
        while (size++ < 15) 
            randomLetters.push(String.fromCharCode(_.random(97, 122)))   // add random letters to 15
        
        const randomSuffleLetters = _.shuffle(randomLetters)            //  shuffle

        const workImg = new Image()
        workImg.src = `data:image/png;base64,${img.image}` 
        workImg.onload = () => {
            this.setState({
                image: workImg,
                rightWord: imgName,
                letters: randomSuffleLetters,
                allImages: this.state.allImages.filter(image => image.id != img.id)
            })
        }

    }

    toDefaultState = () => {
        this.setState({
            image: null, 
            allImages: [],

            letters: [],
            rightWord: "",
            successLetterIndex: 0,

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
        speechSynthesis.speak(new SpeechSynthesisUtterance("well play"))

        const streak = 100 * this.state.streak

        //  increase score, streak, right answer and letter index 
        this.setState({
            successLetterIndex: ++this.state.successLetterIndex,
            score: this.state.time < 10 ? this.state.score + 200 + streak : this.state.score + 100 + streak,
            right: ++this.state.right,
            streak: this.state.streak == 6 ? this.state.streak : ++this.state.streak,
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

    microTaskComplited = () => {

        //  say complite word
        speechSynthesis.speak(new SpeechSynthesisUtterance(this.state.rightWord))

        //  stop timer
        clearInterval(this.state.tick)

        //  make word to array for normal represent with vocabulary 3 words in result
        let words = []
        words.push(this.state.rightWord)

        //  check the end of rounds 
        if (this.state.round + 1 == this.state.maxRound) 
            this.setState({
                statePlayerData: [...this.state.statePlayerData, {
                    round: this.state.round,
                    word: words,
                    error: this.state.error,
                    right: this.state.right,
                    time: this.state.time,
                    mark: this.state.error > this.state.right ? 'Bad' : this.state.error != 0 ? 'Good' : "Well Done"
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
                    mark: this.state.error > this.state.right ? 'Bad' : this.state.error != 0 ? 'Good' : "Well Done"
                }],

                successLetterIndex: 0,
                score: this.state.score + 300,

                //  increase count of rounds
                round: ++this.state.round,
                isTimeStop: true,

                time: 0,
                image: null,
                letters: [],
                rightWord: "", 
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
            this.setState({ isTimeStop: false, time: --this.state.time }) 
        } else this.setState({ isTimeStop: true })
    }
    
    onClickBack = () => {

        //  stop timer
        clearInterval(this.state.tick)

        this.toDefaultState()
        this.props.changeLayerReturn('layer-1')
    }
        
    onClickLetterButton = e => {
        //  chek if pressed letter match with curent successLetterIndex
        if (e.target.attrs.text == this.state.rightWord.charAt(this.state.successLetterIndex)) 
            this.correctAnswerHandler()
        else this.wrongAnswerHandler()
    }

    /////////   events handlers  ///////////

    render() {

        if (this.state.image == undefined) return ( <Loading/> )
        else 
            return (
                <Label>
                    <Backgroud/>
                    
                    {/* IMAGE  */}
                    <ImageSpelling image={this.state.image}/>
             
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

                    {/* LETTERS */}
                    <LetterSpelling 
                        letters={this.state.letters} 
                        clickLetterButtonReturn={this.onClickLetterButton} 
                        isPause={this.state.isTimeStop}
                    />

                    {/* TIME LINE */}
                    <TimeLine time={this.state.time}/>
                    
                    {/* WORD REPRESENT */}
                    <WordSpelling 
                        rightWord={this.state.rightWord} 
                        successLetterIndex={this.state.successLetterIndex}
                    />

                </Label>
            )
    }

}


export default SpellingGame