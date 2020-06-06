import React, {Component} from 'react';
import {Label, Rect, Text} from "react-konva";

class LettersRectsHighlight extends Component {

    state = {
        isMouseUnder: false
    }

    onMouseOver = () => this.setState({isMouseUnder: true})

    onMouseLeave = () => this.setState({isMouseUnder: false})

    render() {
        let rect = this.props.rect
        return (
            <Label
                x={rect.x}
                y={rect.y}
                onClick={this.props.clickLetterButtonReturn}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}>

                <Rect
                    width={rect.width}
                    height={rect.height}
                    fill={this.state.isMouseUnder ? "#FF9733" : "#FFF1C2"}
                    strokeWidth={5}
                    cornerRadius={10}
                    stroke={"black"}
                    shadowEnabled={this.state.isMouseUnder}
                    shadowBlur={14}
                    shadowColor={"black"}
                />

                <Text
                    width={rect.width}
                    height={rect.height}
                    align={"center"}
                    verticalAlign={"middle"}
                    fontSize={40}
                    listening={!this.props.isPause}
                    text={this.props.letters[rect.index]}
                    onClick={this.onClick}
                    fontFamily={"Berkshire Swash"}
                />

            </Label>
        );
    }
}

export default LettersRectsHighlight;