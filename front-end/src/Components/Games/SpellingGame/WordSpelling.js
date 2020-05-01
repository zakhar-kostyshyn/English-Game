import React, { Component } from 'react'
import { Rect, Label, Text } from 'react-konva'
import * as _ from 'lodash'


class WordSpelling extends Component {

    state = {
        word: []
    }

    //  create empty word with _ in length
    componentDidMount() {
        const temp = []
        for (let i = 0; i < this.props.rightWord.length; i++) 
            temp.push('_')

        this.setState({
            word: temp
        })    
        
    }
    //  if success index increase show one right letter
    componentDidUpdate(prevProps) {    
        if (prevProps.successLetterIndex < this.props.successLetterIndex) {
            const temp = this.state.word
            temp[this.props.successLetterIndex - 1] = this.props.rightWord[this.props.successLetterIndex - 1]
            this.setState({
                word: temp
            })
        }
            
    }

    render() {
        
        return (
            <Label
                x={500}
                y={340}>

                <Rect
                    width={500}
                    height={50}
                    offsetX={250}
                    offsetY={25}
                    fill='white'
                    stroke='black'
                    strokeWidth={2}
                    cornerRadius={20}
                />

                <Text
                    width={500}
                    height={50}
                    offsetX={250}
                    offsetY={25}
                    fill='black'
                    align='center'
                    verticalAlign='middle'
                    fontSize={40}
                    text={_.join(this.state.word, '   ')}
                />
            

            </Label>
        )
    }
}

export default WordSpelling