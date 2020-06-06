import React, { Component } from 'react'
import { Text, Rect, Label, Group, RegularPolygon } from 'react-konva'
import Backgroud from './Backgroud';
import Loading from './Loading';
import * as _ from 'lodash'


class Result extends Component {

    state = {
        roundsInfo: [],
        showIndex: 1
    }

    onClickNext = () => this.setState({showIndex: ++this.state.showIndex})

    onClickPrevious = () => this.setState({showIndex: --this.state.showIndex})

    onBack = () => window.location.reload()


    componentDidUpdate(prevProps) {

        //  next if get array with data remove last element because of bug in StartGame
        if (this.props.data != null && prevProps.data != null) {
            if (this.props.data.length !== prevProps.data.length) {
                let cutLastElement = this.props.data
                cutLastElement.pop()    //  cut last element from cutLastElement
                this.setState({
                    roundsInfo: cutLastElement
                })
            }
        }
    }
    
    render() {

         //  stage data for canvas
         const stage = {
            width: 1000,
            height: 650
        }

        if (this.state.roundsInfo.length > 0) 
            return(
                <Group>

                    {/* gradien */}
                    <Backgroud/>

                    {/* creating table where will be rect with game's themes and groups */}
                    <Label x={stage.width / 2} y={stage.height / 2} >

                        <Rect
                            width={800}
                            height={400}
                            offsetX={400}
                            offsetY={150}
                            fill='gainsboro'
                            stroke='black'
                            strokeWidth={10}
                            cornerRadius={50}/>

                        {/* represent round stats depends on current roundIndex */}
                        {this.state.roundsInfo.filter(r => r.round === this.state.showIndex).map(r => (
                            <Label
                                x={-350}
                                y={-70}
                                key={r.round}>

                                {/* WORD */}
                                <Text
                                    width={600}
                                    height={60}
                                    text={'Word : ' + _.join(r.word, ', ')}
                                    fontSize={30}
                                    fontFamily='Berkshire Swash'
                                    fill='black'
                                />

                                {/* RIGHT */}
                                <Text
                                    y={50}
                                    width={600}
                                    height={60}
                                    text={'Right : ' + r.right}
                                    fontSize={30}
                                    fontFamily='Berkshire Swash'
                                    fill='black'
                                />

                                {/* ERROR */}
                                <Text
                                    y={100}
                                    width={600}
                                    height={60}
                                    text={'Error : ' + r.error}
                                    fontSize={30}
                                    fontFamily='Berkshire Swash'
                                    fill='black'
                                />

                                {/* TIME */}
                                <Text
                                    y={150}
                                    width={600}
                                    height={60}
                                    text={'Time : ' + r.time + 'sec'}
                                    fontSize={30}
                                    fontFamily='Berkshire Swash'
                                    fill='black'
                                />

                                {/* MARK */}
                                <Text
                                    y={200}
                                    width={600}
                                    height={60}
                                    text={'Mark : ' + r.mark}
                                    fontSize={30}
                                    fontFamily='Berkshire Swash'
                                    fill='black'
                                />

                                {/* ROUND */}
                                <Label
                                    x={100}
                                    y={-180}>

                                    <Rect
                                        width={500}
                                        height={150}
                                        fill='white'
                                        stroke='black'
                                        strokeWidth={10}
                                        cornerRadius={50}/>

                                    <Text
                                        width={500}
                                        height={150}
                                        align='center'
                                        verticalAlign='middle'
                                        text={'Round ' + r.round}
                                        fontSize={60}
                                        fontFamily='Berkshire Swash'
                                        fill='black'
                                        stroke='grey'/>

                                    {/* BACK ROUND TRIANGLE */}
                                    <RegularPolygon
                                        x={-40}
                                        y={70}
                                        rotation={270}
                                        sides={3}
                                        radius={60}
                                        fill='white'
                                        stroke='black'
                                        strokeWidth={5}
                                        onClick={this.onClickPrevious}
                                        visible={this.state.showIndex !== 1}
                                    />

                                    {/* NEXT ROUND TRIANGLE */}
                                    <RegularPolygon
                                        x={540}
                                        y={70}
                                        rotation={90}
                                        sides={3}
                                        radius={60}
                                        fill='white'
                                        stroke='black'
                                        strokeWidth={5}
                                        onClick={this.onClickNext}
                                        visible={this.state.showIndex !== this.state.roundsInfo.length}
                                    />

                                </Label>



                            </Label>
                        ))}

                        {/* SCORE REPRESENT */}
                        <Label
                            x={70}>

                            <Rect
                                width={300}
                                height={70}
                                fill='white'
                                stroke={10}
                                strokeWidth={2}
                            />

                            <Text
                                width={300}
                                height={70}
                                align='center'
                                verticalAlign='middle'
                                text={'Score : ' + this.props.score}
                                fontSize={30}
                                fontFamily='Berkshire Swash'
                                fill='black'
                            />
                        </Label>

                        {/* INDEX OF SCORE REPRESENT */}
                        <Label
                            x={70}
                            y={100}
                            //  if user is not authenticate than indexAddScore = 0 and don't show
                            visible={this.props.indexAddScore}>

                            <Rect
                                width={300}
                                height={70}
                                fill='white'
                                stroke={10}
                                strokeWidth={2}
                            />

                            <Text
                                width={300}
                                height={70}
                                align="center"
                                verticalAlign="middle"
                                text={'Your Rang : ' + this.props.indexAddScore}
                                fontSize={30}
                                fontFamily="Berkshire Swash"
                                fill="black"
                            />
                        </Label>

                        {/* BACK */}
                        <Label
                            x={-100}
                            y={200}>

                            <Rect
                                width={200}
                                height={100}
                                fill='white'
                                stroke={10}
                                strokeWidth={5}
                                cornerRadius={15}
                            />

                            <Text
                                width={200}
                                height={100}
                                align='center'
                                verticalAlign='middle'
                                text='Play Again'
                                fontSize={30}
                                fontFamily='Berkshire Swash'
                                fill='black'
                                onClick={this.onBack}
                            />

                        </Label>

                    </Label>
                </Group>
            )
        else 
            return (
                <Loading/>
            )
    } 
}

export default Result