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
import TextField from "../../Common/GameComponents/TextField";
import WordsRects from "../../Common/GameComponents/WordsRects";
import ClockImage from "./ClockImage";



class TimeGame extends Component {

    state = {

        maxRound: 10,

        stage: {
            width: 1000,
            height: 650
        },

        hours: null,
        minutes: null,

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

        statePlayerData: [],

        onlyFirstUpdate: true

    }

    /////////   components  ///////////

    componentDidUpdate() {

        //  if StartState represent layer-3
        if (this.props.currentLayer[3] === 'layer-3' && this.state.onlyFirstUpdate)
            this.setState({
                onlyFirstUpdate: false
            }, () => this.startGameProcess())



        //  allow if all words for text was correct given (micro task passed)
        if (this.state.successWordIndex === this.state.text.length && this.state.text.length > 0)
            this.microTaskComplited()
    }

    //  stop timer when unmount
    componentWillUnmount() {
        clearInterval(this.state.tick)
    }

    /////////   components  ///////////

    /////////   play process  ///////////

    startGameProcess = () => {
        console.log("startGameProcess")
        this.getRandomMinutesHoursAndCreateText()
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

    toDefaultState = () => {
        this.setState({
            hours: null,
            minutes: null,

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
            }, () => this.endGame())
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
                text: [],
                score: this.state.score + 300,

                //  increase count of rounds
                round: ++this.state.round,
                isTimeStop: true,

                time: 0,
                words: [],
                right: 0,
                error: 0

            }, () => this.startGameProcess())
    }


    getRandomMinutesHoursAndCreateText = () => {

        console.log("getRandomMinutesHoursAndCreateText")

        let hours = _.random(1, 12)

        let minutes = _.random(0, 59)
        minutes -= minutes % 5

        let createdText = []

        let objText = this.convertToText(hours, minutes)
        createdText = objText.text

        let shuffleText = _.concat(createdText, objText.wordsToShuffleText)
        shuffleText = _.shuffle(shuffleText)

        this.setState({
            hours: hours,
            minutes: minutes,
            text: createdText,
            shuffleWords: shuffleText
        })

    }

    //  convert minutes and hour to text
    convertToText = (hours, minutes) => {
        const hour_text = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "one"]
        const minute_text = ["ten", "five", "ten", "ten", "twenty", "twenty five", "ten", "twenty five", "twenty", "twenty", "ten", "five"]

        let text = []
        let wordsToShuffleText = []

        let past = " past "
        let to = " to "
        let half = " half "
        let quarter = " quarter "
        let its = " It's "
        let oclock = " o'clock "


        switch (true) {
            case minutes === 0:
                text.push(its, hour_text[hours - 1], oclock)
                wordsToShuffleText.push(half, past, hour_text[hours])
                break
            case minutes === 15:
                text.push(its, quarter, past, hour_text[hours - 1])
                wordsToShuffleText.push(half, to, hour_text[hours])
                break
            case minutes === 45:
                text.push(its, quarter, to, hour_text[hours])
                wordsToShuffleText.push(half, past, hour_text[hours - 1])
                break
            case minutes === 30:
                text.push(its, half, past, hour_text[hours - 1])
                wordsToShuffleText.push(" O'clock ", " To ", hour_text[hours])
                break
            case minutes < 30:
                text.push(its, minute_text[minutes / 5], past, hour_text[hours - 1])
                wordsToShuffleText.push(quarter, to, hour_text[hours])
                break
            case minutes > 30:
                text.push(its, minute_text[minutes / 5], to, hour_text[hours])
                wordsToShuffleText.push(quarter, past, hour_text[hours - 1])
                break
            default:
                text = "bad minutes"
                break
        }

        return {text, wordsToShuffleText}
    }

    /////////   play process  ///////////

    /////////   events handlers  ///////////

    onClickPause = () => {
        if (this.state.isTimeStop) {
            this.startTimer();
            this.setState({ isTimeStop: false })
        } else this.setState({ isTimeStop: true })
    }

    onClickWordButton = e => {
        //  check if pressed word match with curent successWordIndex
        if (e.target.attrs.text === this.state.text[this.state.successWordIndex])
            this.correctAnswerHandler()
        else this.wrongAnswerHandler()
    }

    /////////   events handlers  ///////////

    render() {
        if (this.state.text.length === 0) return ( <Loading/> )
        else
            return (
                <Label>
                    <Backgroud/>

                    {/*TIME IMAGE*/}
                    <ClockImage
                        hours={this.state.hours}
                        minutes={this.state.minutes}
                    />

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

export default TimeGame