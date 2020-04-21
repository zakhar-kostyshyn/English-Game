import React, { Component } from 'react'
import { Circle, Text, Rect, Image, Label, Group } from 'react-konva'

class ScoreTimeVoice extends Component {

    state = {
        score: 0,
        scoreArray: [],
        markIndex: 0,
        time: 0,
        say: "",
        voice: null,
        stop: false
    }

    //  create timer
    tick = () => {
            //  tick if is not a pause and don't stop to go back
            if (!this.props.pause && !this.state.stop) {

                new Promise(res => {      
                    this.setState({
                        time: this.state.time + 0.1
                    })
                    setTimeout(() => {
                        res()  
                    }, 100)
                }).then(() => {
                    this.tick(!this.state.stop)
                })
            }
            
        
    }

    //  restart timer
    restart = () => {
        this.setState({
            time: 0
        })
    }

    //  create array of score streak which responsible for side table
    createScoreArray = () => {
        let tempArray = []

        for (let i = 0; i < 10; i++) 
        tempArray.push({
                index: i,
                mark: 9 - this.state.markIndex <= i ? true : false
            })
        this.setState({
            scoreArray: tempArray
        })
    }

    componentDidMount() {
         //  start timer
        this.tick(false)

        //  create start score
        this.createScoreArray()

        //  intilize voice
        let voices = window.speechSynthesis.getVoices();
        this.setState({
            voice: voices.filter(voice => { 
                return voice.name == 'Lisa';        //  dont work return undefined
            })[0]
        })

    }

    countingScore = () => Math.trunc(1000 + this.state.markIndex * 100 - this.state.time * 10)
        
    //  back to layer-1
    componentWillUnmount(){
        this.setState({
            score: 0,
            scoreArray: [],
            markIndex: 0,
            time: 0,
            say: "",
            voice: null,
            //  stop timer give true in props
            stop: true
        })
    }

    componentDidUpdate(prevProps) {

        //  catch if player make right choose
        if (prevProps.update < this.props.update) {
            this.restart()
            this.setState({
                //  add index only streak only if it less then 10
                markIndex: this.state.markIndex < 10 ? ++this.state.markIndex : this.state.markIndex,
                score: this.countingScore(),
                 //  save word which sayed
                say: this.props.say
            }, () => {
                //  catch name to say
                let utterance = new SpeechSynthesisUtterance(this.state.say);
                utterance.voice = this.state.voice
                speechSynthesis.speak(utterance)
            })
            //  recreate array score to show right colum
            this.createScoreArray()
        }

        //  catch if player make wrong choose
        if (prevProps.error < this.props.error) {

            this.setState({
                score: this.state.score - 100,
                markIndex: --this.state.markIndex,
                // say: this.props.say
            }, () => {
                //  catch name to say           (say wrong even if player didn't do error, because palyer didn't put on right place)
                // let utterance = new SpeechSynthesisUtterance('wrong');
                // utterance.voice = this.state.voice
                // speechSynthesis.speak(utterance)
            })

            this.createScoreArray()
        }

        //  if unset continue ticks()
        if (prevProps.pause != this.props.pause) 
            if (!this.props.pause) 
                this.tick(false)

      
    }

    render() {        
        return (
            <Group>
                <Group>
                    {/* represent score */}
                    <Label
                        x={680}
                        y={435}
                        >

                        <Rect 
                            cornerRadius={15}
                            width={200}
                            height={100} 
                            fill='white'  
                            stroke='black'
                            strokeWidth={5}
                            />

                        <Text
                            x={0}
                            y={-10}
                            width={200}
                            height={100} 
                            align='center'
                            verticalAlign='middle'
                            fontSize={40}   
                            fontFamily='Berkshire Swash'
                            fill='black'
                            text={this.state.score}
                            />
                    </Label>

                    {/* score line */}
                    <Label 
                    x={780}
                    y={50}>

                    <Rect 
                        cornerRadius={15}
                        width={80}
                        height={350} 
                        fill='white'  
                        stroke='black'
                        strokeWidth={5}
                        />

                    {/* score in rectangles */}
                    {this.state.scoreArray.map(circle => (
                        <Rect
                            y={35 * circle.index} 
                            key={circle.index}
                            cornerRadius={10}
                            width={80}
                            height={35} 
                            fill={circle.mark ? 'black' : 'white'}
                            stroke='black'
                            strokeWidth={5}
                        />

                    ))}
                    

                    </Label>
                </Group>
                <Group>
                 {/* represent time */}
                <Label
                    x={30}
                    y={435}
                    >
                    <Rect 
                        cornerRadius={15}
                        width={200}
                        height={100} 
                        fill='white'  
                        stroke='black'
                        strokeWidth={5}
                        />

                    <Text
                        x={0}
                        y={-10}
                        width={200}
                        height={100} 
                        align='center'
                        verticalAlign='middle'
                        fontSize={40}   
                        fontFamily='Berkshire Swash'
                        fill='black'
                        text={Math.trunc(this.state.time)}
                        />
                    
                </Label>

                {/* time line */}
                <Label
                    x={250}
                    y={480}
                    >
                    <Rect 
                        cornerRadius={15}
                        width={410}
                        height={50} 
                        fill='white'  
                        stroke='black'
                        strokeWidth={5}
                        />

                    <Rect 
                        cornerRadius={15}
                        //  count to reduce line
                        width={410 - this.state.time * 30 >= 0 ? 410 - this.state.time * 30 : 0}
                        height={50} 
                        fill='black'  
                        stroke='black'
                        strokeWidth={5}
                        visible={410 - this.state.time * 30 >= 0 ? true : false}
                        />    

                </Label>

            </Group>
            </Group>
        )
    }
}

export default ScoreTimeVoice