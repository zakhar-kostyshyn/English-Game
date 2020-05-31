import React, { Component } from 'react'
import { Rect, Label, Text } from 'react-konva'


class WordsRects extends Component {

    state = {
        rects: []
    }

    
    componentDidMount() {
        this.rectsConfig()
    }

    //  configuration for rects 
    rectsConfig = () => {

        const backdown = 20
        let currentX = 0
        let currentSecondX = 80
        let centerdX = 100
        let centerdSecondX = 160

        if (this.props.words.length <= 6)
            centerdX = 140

        let temp = []
        for (let i = 0; i < this.props.words.length; i++) {

            let widthSize

            if (this.props.words[i].length <= 3)
                widthSize = 70
            else if (this.props.words[i].length > 3 && this.props.words[i].length <= 6)
                widthSize = 120
            else 
                widthSize = 170    

            //  very sensative props for words rects 
            temp = [...temp, {
                index: i,
                height: 70,
                width: widthSize,
                x: currentX < 650 ? currentX + centerdX : currentSecondX + centerdSecondX, 
                y: currentX < 650 ? 0 : 100,
                text: this.props.words[i]
            }]

            if (currentX < 650) currentX += widthSize + backdown
            else currentSecondX += widthSize + backdown

        }

        this.setState({
            rects: temp
        })    
    }

    onClick = e => this.props.clickWordButtonReturn(e)


    render() {
        
        return (
            <Label
                x={35}
                y={390}>

                {/* WORDS RECTS */}
                {this.state.rects.map(rect => (
                    <Label
                        x={rect.x}
                        y={rect.y}
                        key={rect.index}>

                        <Rect
                            width={rect.width}
                            height={rect.height}
                            fill='white'
                            strokeWidth={5}
                            cornerRadius={10}
                            stroke='black'
                        />

                        <Text
                            width={rect.width}
                            height={rect.height}
                            align='center'
                            verticalAlign='middle'
                            fontSize={30}
                            listening={!this.props.isPause}
                            text={rect.text}
                            onClick={this.onClick}
                        />

                        
                    </Label>
                ))}
              
            </Label>
        )
    }

}

export default WordsRects