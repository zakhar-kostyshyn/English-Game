import React, { Component } from 'react'
import { Rect, Group, Text } from 'react-konva'

class RectHiglight extends Component {

    state = {
        rectColor: 'white',
        rectShadowX: 1,
        rectShadowY: 1,
        rectscaleX: 1,
        rectscaleY: 1,
        duration: 0
    }

    onMouseOver = () => {
        this.setState({
            rectColor: 'grey',
            rectShadowX: 5,
            rectShadowY: 5,
            rectscaleX: 1.2,
            rectscaleY: 1.2
        })
        
    }

    onMouseOut = () => {
        this.setState({
            rectColor: 'white',
            rectShadowX: 1,
            rectShadowY: 1,
            rectscaleX: 1,
            rectscaleY: 1,
            duration: 0.5 
        })
    }

    //  using setTheme from ...Game to set game's state with label name
    onClickLabel = () => {
        this.props.setTheme(this.props.name)
    }
    
    render() {
        return (
            <Group>
                <Rect 
                    width={100}
                    height={100}
                    offsetX={50}
                    offsetY={50}
                    fill={this.state.rectColor}
                    stroke='black'
                    strokeWidth={5}
                    cornerRadius={20}
                    duration={this.state.duration}
                    shadowOffsetX={this.state.rectShadowX}
                    shadowOffsetY={this.state.rectShadowY}
                    scaleX={this.state.rectscaleX}
                    scaleY={this.state.rectscaleY}
                    onClick={this.onClickLabel}
                    onMouseOut={this.onMouseOut}
                    onMouseOver={this.onMouseOver}/> 
                <Text
                    width={100}
                    height={100}
                    offsetX={50}
                    offsetY={50}
                    fontSize={24}
                    align='center'
                    verticalAlign='middle'  
                    fontFamily='Berkshire Swash'
                    fill='black'
                    onClick={this.onClickLabel}
                    onMouseOut={this.onMouseOut}
                    onMouseOver={this.onMouseOver}
                    text={this.props.name}/>
            </Group>
        )
    }
}

export default RectHiglight;
