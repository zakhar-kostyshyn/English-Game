import React, { Component } from 'react'
import { Rect, Label, Text } from 'react-konva'
import LettersRectsHighlight from "./LettersRectsHighlight";


class LetterSpelling extends Component {

    state = {
        rects: []
    }


    componentDidMount() {
        this.rectsConfig()
    }

    //  create 9 rects with letters
    rectsConfig = () => {

        let firstLineStartX = 95
        let secondLineStartX = 150
        let distanceBetweenLines = 100
        let maxRectInFirstLine = 7

        let temp = []
        for (let i = 0; i < 11; i++)
            //  very sensitive props for letters rects
            temp = [...temp, {
                index: i,
                height: 80,
                width: 80,
                x: i < maxRectInFirstLine ? firstLineStartX * i :
                    (secondLineStartX + firstLineStartX * (i - maxRectInFirstLine)),  //  represent first and second line if i < 6
                y: i < maxRectInFirstLine ? 0 : distanceBetweenLines
            }]

        this.setState({
            rects: temp
        })
    }

    render() {
        
        return (
            <Label
                x={170}
                y={380}>

                {/* LETTERS RECTS */}
                {this.state.rects.map(rect => (
                    <LettersRectsHighlight
                        rect={rect}
                        key={rect.index}
                        clickLetterButtonReturn={this.props.clickLetterButtonReturn}
                        letters={this.props.letters}
                    />
                ))}
              
            </Label>
        )
    }

}

export default LetterSpelling