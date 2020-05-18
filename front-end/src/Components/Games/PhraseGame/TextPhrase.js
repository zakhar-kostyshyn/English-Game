import React, { Component } from 'react'
import { Rect, Label, Text } from 'react-konva'
import * as _ from 'lodash'


class TextPhrase extends Component {

    state = {
        text: []
    }

    //  create empty word with _ in length
    componentDidMount() {
        const temp = []
        for (let i = 0; i < this.props.text.length; i++) 
            temp.push('...')

        this.setState({
            text: temp
        })    
        
    }
    //  if success index increase show one right letter
    componentDidUpdate(prevProps) {    
        if (prevProps.successWordIndex < this.props.successWordIndex) {
            const temp = this.state.text
            temp[this.props.successWordIndex - 1] = this.props.text[this.props.successWordIndex - 1]
            this.setState({
                text: temp
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
                    fontSize={25}
                    text={_.join(this.state.text, ' ')}
                />
            

            </Label>
        )
    }
}

export default TextPhrase