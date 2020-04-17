import React, { Component } from 'react'
import { Circle, Text, Rect, Image, Label, Group } from 'react-konva'

class ScoreTime extends Component {

    state = {
        score: 0,
        scoreArray: [],
        markIndex: 0,
        time: 0,

    }

    //  create timer
    tick = () => {
        new Promise(res => {      
            this.setState({
                time: this.state.time + 0.1
            })
            setTimeout(() => {
                res()
            }, 100)
        }).then(() => {
            this.tick()
        })
    }

    restart = () => {
        this.setState({
            time: 0
        })
    }

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
        this.tick()

        //  create start score
        this.createScoreArray()
    }

    countingScore = () => Math.trunc(1000 + this.state.markIndex * 100 - this.state.time * 10)
        

    componentDidUpdate(prevProps) {

        //  catch if player make right choose
        if (prevProps.update < this.props.update) {
            this.restart()
            this.setState({
                markIndex: ++this.state.markIndex,
                score: this.countingScore()
            })
            //  recreate array score to show right colum
            this.createScoreArray()
        }

        //  catch if player make wrong choose
        if (prevProps.error < this.props.error) {
            this.setState({
                score: this.state.score - 100,
                markIndex: --this.state.markIndex
            })
            this.createScoreArray()
        }
  
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

export default ScoreTime