import React, { Component } from 'react'
import { Label, Text, Rect } from 'react-konva'
import Loading from '../../Common/GameComponents/Loading'


class LineVocabulary extends Component {

    onClickFirstLine = e => {
        this.props.onClickFirstLineReturn(e)
    }

    onClickSecondLine = e => {
        this.props.onClickSecondLineReturn(e)
    }

    
    render() {      
 
        const positions = {
            width: 180,
            height: 170,
            x: 230,
            y: 100,
            scale: 0.4
        }

        //  run only when arrays create in VocabularyGame
        if (this.props.firstLineImages[2] != undefined && this.props.secondLineImages[2] != undefined) {
            return (                
                <Label>

                    {/* FIRST LINE */}
                    <Label 
                        x={positions.x}
                        y={positions.y}>

                        <Label
                            name={this.props.firstLineImages[0].name}
                            onClick={this.onClickFirstLine}>
                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='white'
                                cornerRadius={20}
                            />

                            <Rect
                                width={positions.width - 10}
                                height={positions.height - 10}
                                fillPatternImage={this.props.firstLineImages[0].image}
                                fillPatternScaleX={positions.scale}
                                fillPatternScaleY={positions.scale}
                                fillPatternOffsetX={-10}
                                fillPatternOffsetY={-30}
                                fillPatternRepeat='no-repeat'
                                cornerRadius={20}
                                visible={this.props.firstLineImages[0].visible}
                            />

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='green'
                                cornerRadius={20}
                                visible={!this.props.firstLineImages[0].visible}
                            />

                        </Label>

                        <Label
                            name={this.props.firstLineImages[1].name}
                            onClick={this.onClickFirstLine}
                            x={190}>

                            
                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='white'
                                cornerRadius={20}
                            />

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                fillPatternImage={this.props.firstLineImages[1].image}
                                fillPatternScaleX={positions.scale}
                                fillPatternScaleY={positions.scale}
                                fillPatternOffsetX={-10}
                                fillPatternOffsetY={-30}
                                fillPatternRepeat='no-repeat'
                                strokeWidth={5}
                                stroke='black'
                                cornerRadius={20}
                                visible={this.props.firstLineImages[1].visible}
                            />

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='green'
                                cornerRadius={20}
                                visible={!this.props.firstLineImages[1].visible}
                            />

                        </Label>

                        <Label
                            name={this.props.firstLineImages[2].name}
                            onClick={this.onClickFirstLine}
                            x={190 + 190}>

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='white'
                                cornerRadius={20}
                            />

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                fillPatternImage={this.props.firstLineImages[2].image}
                                fillPatternScaleX={positions.scale}
                                fillPatternScaleY={positions.scale}
                                fillPatternOffsetX={-10}
                                fillPatternOffsetY={-30}
                                fillPatternRepeat='no-repeat'
                                strokeWidth={5}
                                stroke='black'
                                cornerRadius={20}
                                visible={this.props.firstLineImages[2].visible}
                            /> 

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='green'
                                cornerRadius={20}
                                visible={!this.props.firstLineImages[2].visible}
                            />

                        </Label>

                    </Label>
                        
                    {/* SECOND LINE */}
                    <Label 
                        x={positions.x}
                        y={positions.y + 200}>

                        <Label
                            name={this.props.secondLineImages[0].name}
                            onClick={this.onClickSecondLine}>

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                fill='white'
                                strokeWidth={5}
                                stroke='black'
                                cornerRadius={20}
                            />

                            <Text
                                width={positions.width}
                                height={positions.height}
                                align='center'
                                verticalAlign='middle'
                                fontSize={35}
                                text={this.props.secondLineImages[0].name}
                                visible={this.props.secondLineImages[0].visible}
                            />

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='green'
                                cornerRadius={20}
                                visible={!this.props.secondLineImages[0].visible}
                            />

                        </Label>

                        <Label 
                            onClick={this.onClickSecondLine}
                            name={this.props.secondLineImages[1].name}
                            x={190}>

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                fill='white'
                                strokeWidth={5}
                                stroke='black'
                                cornerRadius={20}
                            />

                             <Text
                                width={positions.width}
                                height={positions.height}
                                align='center'
                                verticalAlign='middle'
                                fontSize={35}
                                text={this.props.secondLineImages[1].name}
                                visible={this.props.secondLineImages[1].visible}
                            />

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='green'
                                cornerRadius={20}
                                visible={!this.props.secondLineImages[1].visible}
                            />

                        </Label>

                        <Label
                            onClick={this.onClickSecondLine}
                            name={this.props.secondLineImages[2].name}
                            x={190 + 190}>

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                fill='white'
                                strokeWidth={5}
                                stroke='black'
                                cornerRadius={20}
                            /> 

                            <Text
                                width={positions.width}
                                height={positions.height}
                                align='center'
                                verticalAlign='middle'
                                fontSize={35}
                                text={this.props.secondLineImages[2].name}
                                visible={this.props.secondLineImages[2].visible}
                            />

                            <Rect
                                width={positions.width}
                                height={positions.height}
                                strokeWidth={5}
                                stroke='black'
                                fill='green'
                                cornerRadius={20}
                                visible={!this.props.secondLineImages[2].visible}
                            />

                        </Label>

                    </Label>
                    
                </Label>
            )
        } else {
            return (<Loading/>)
        }
    }

}

export default LineVocabulary