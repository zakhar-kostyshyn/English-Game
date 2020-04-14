import React, { Component } from 'react'
import { Circle, Text, Rect, Image, Label, Group } from 'react-konva'
import '../../style.css'

class VocabularyGame extends Component {

    state = {

        //  props for two lines of circles
        circles: {
            width: 190,
            height: 190,
            indentBetween: 220,
            indentDown: 200,
        },

        position: {
            x: 250,
            y: 150
        },

        allImages: [],

        //  tree random image from all image
        workingImages: [],
     
        shuffle: []
    }

    onDragEnd = e => {


        const pos = {
            x: e.target.x(),
            y: e.target.y()
        }

        //  i don't know why but drag and drop needs two setState
        this.setState({
            position: {
                x: pos.x,
                y: pos.y
            }
        })

        const circle = this.state.circles
        
        for (let i = 0; i < 3; i++) {
            let calibratiopnCatch = 150

            let x = 250 + circle.indentBetween * this.state.workingImages[i].index
            let y = 150 + circle.indentDown

            let leftBorders = x - circle.width + calibratiopnCatch
            let rightBorders = x + circle.width - calibratiopnCatch
            let topBorders = y - circle.height + calibratiopnCatch
            let bottomBorders = y + circle.height - calibratiopnCatch

            //  check drag catch 
            //  first line check cordinate and second names
            if (pos.x > leftBorders && pos.x < rightBorders && pos.y > topBorders && pos.y < bottomBorders &&
                e.target.name() == this.state.workingImages[i].name) {

                console.log(this.state.workingImages[i].name + " catched ")

                this.state.workingImages[i].visibility = false

                //  check if all images are on their places
                for (let j = 0; j < 3; j++) {
                    if (this.state.workingImages[j].visibility)
                        break;
                    else if (j == 2)
                        console.log("ALL IMAGES ON THEIR")
                }

                //  important to be here and else also important
                //  in's work don't touch it
                this.setState({
                    position: {
                        x: 250,
                        y: 150
                    }
                })  

                break;

            } else {
                this.setState({
                    position: {
                        x: 250,
                        y: 150
                    }
                })  
            }
        }
    }

    componentDidMount() {

        //  create gradient because we can't do this in Konva props
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let grad = ctx.createLinearGradient(0, 0, 0, 550);

        grad.addColorStop(0.00, '#6b88f2');
        grad.addColorStop(1.00, '#e3b749');

        this.setState({
            gradient: grad
        })
    }

    //  populate state.allImages
    componentDidUpdate() {
        if (this.props.images.length > 0 && this.state.allImages.length == 0) {
            
            //  call getTreeRandomImagesObj only when allImage will be populated (DON'T WORK)
            new Promise (resolve => {
                resolve(this.setState({
                    allImages: this.props.images
                }))
            }).then(() => {
                this.getTreeRandomImagesObj()
            })
            
        }
    }

    //  get random three images from state.allImage and set to the state.workingImages
    getTreeRandomImagesObj = () => {

        //  purpose is to collect thre random image and use to set into state
        const tempTreeRandomImagesObjArray = []

        //  load image using input string of bytes from base64
        const loadImage = img => {
            let newImage

            newImage = new window.Image();

            //  sometime method can returned quicker then src will be populate/
            //  so here i am using promise

            
            newImage.src = `data:image/png;base64,${img}`
            return newImage
        }

        //  return well formated for display name of image
        const formatName = name => {

            //  cut of after .
            name = name.replace('.png', '')

            //  make first letter to upper
            name = name[0].toUpperCase() + name.slice(1);
            return name
        }

        let i = 0
        while (i++ < 3) {
            
            let randomIndex = Math.round(Math.random() * this.props.images.length)
            
            tempTreeRandomImagesObjArray.push({
                index: i - 1,
                image: loadImage(this.props.images[randomIndex].image),
                name: formatName(this.props.images[randomIndex].name),
                visibility: true
            })

               // console.log(this.state.allImage) undefined

                // need to delete element with randomIndex
                // this.setState({
                //     allImage: this.state.allImage.slice(randomIndex, 1)
                // })
            }

        this.setState({
            workingImages: tempTreeRandomImagesObjArray
        })

    } 

    reIndex = index => {
        let shuffleIndex
        while (true) {
            shuffleIndex = Math.abs(index - Math.round(Math.random() * 2))
            if (!this.state.shuffle.includes(shuffleIndex)) 
                break
        }

        return shuffleIndex;
    } 

    render() {

        const stage = {
            width: 900,
            height: 550
        }
        const circle = this.state.circles
        if (this.props.images.length != 0 && this.state.workingImages.length != 0) {
            return (
                <Label>
                    {/* background */}
                    <Rect   
                        width={stage.width}
                        height={stage.height}
                        fill={this.state.gradient}
                        shadowBlur={10}/>
                    
                    {/* drawing second line of text circles */}
                    {this.state.workingImages.map(imageObject => (
                        <Label
                            key={imageObject.index}
                            name={imageObject.name}
                            x={this.state.position.x + circle.indentBetween * this.reIndex(imageObject.index)}
                            y={this.state.position.y + circle.indentDown}>

                            <Circle 
                                width={circle.width}
                                height={circle.height} 
                                stroke='black'
                                strokeWidth={5}
                                fill='white'  
                                />

                            <Text
                                x={40}    
                                y={70}
                                name={imageObject.name}
                                width={circle.width}
                                height={circle.height}            
                                offsetX={circle.width / 2}
                                offsetY={circle.height / 2}
                                fontSize={30}   
                                fontFamily='Berkshire Swash'
                                fill='black'
                                visible={imageObject.visibility}
                                text={imageObject.name}
                                />

                            <Circle    
                                width={circle.width - 10}
                                height={circle.height - 10}            
                                visible={!imageObject.visibility}
                                fillPatternImage={imageObject.image}
                                fillPatternX={0}
                                fillPatternY={0}
                                fillPatternScaleX={0.4}
                                fillPatternScaleY={0.4}
                                fillPatternRepeat='no-repeat'
                                fillPatternOffsetX={200}
                                fillPatternOffsetY={180}
                                />
                        </Label>
                    ))}

                    {/* drawing second line of text circles */}
                    {this.state.workingImages.map(imageObject => (
                        <Label
                            key={imageObject.index}
                            name={imageObject.name}
                            x={this.state.position.x + circle.indentBetween * imageObject.index}
                            y={this.state.position.y}
                            onDragEnd={this.onDragEnd}
                            draggable>
                        

                            <Circle 
                                width={circle.width}
                                height={circle.height} 
                                fill='white'  
                                stroke='black'
                                strokeWidth={5}
                                visible={imageObject.visibility}
                                />

                            <Circle    
                                width={circle.width - 10}
                                height={circle.height - 10}  
                                visible={imageObject.visibility}          
                                fillPatternImage={imageObject.image}
                                fillPatternX={0}
                                fillPatternY={0}
                                fillPatternScaleX={0.4}
                                fillPatternScaleY={0.4}
                                fillPatternRepeat='no-repeat'
                                fillPatternOffsetX={200}
                                fillPatternOffsetY={180}
                                />

                        </Label>
                    ))}
                </Label>
            )
        } else 
            return (
                //  LOANDING
                <Label>
                    <Rect   
                        width={stage.width}
                        height={stage.height}
                        fill={this.state.gradient}
                        shadowBlur={10}/>
                    <Label x={stage.width / 2} y={stage.height / 2} >
                        <Rect
                            width={500}
                            height={150}
                            offsetX={250}
                            offsetY={75}
                            fill='white'
                            stroke='black'
                            strokeWidth={10}
                            cornerRadius={50}/>
                        <Text
                            offsetX={160}
                            offsetY={30}
                            text='LOADING'
                            fontSize={60}   
                            fontFamily='Berkshire Swash'
                            fill='black'
                            stroke='grey'/>
                    </Label>
                </Label>
            )   
    }
}

export default VocabularyGame2