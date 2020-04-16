import React, { Component } from 'react'
import { Circle, Text, Rect, Image, Label, Group } from 'react-konva'
import '../../style.css'

class VocabularyGame extends Component {

    state = {
        
        allImages: [],

        firstLineImages: [],

        secondLineImages: [],

        //  using get random display of name's circles using in reIndex method
        shuffle: [],

        image: null

    }

    onDragStart = e => {
        
        //  all next stuff using to remove obj and set it in the end of array for the latest drawing
        const index = e.target.attrs.index
        const images = this.state.firstLineImages
        const image = images[index]

        images.splice(e.target.attrs.index, 1)
        images.push(image)

        this.setState({
            firstLineImages: images
        })
    }

    onDragEnd = e => {

        //  back to normal indexing after dragging
        this.setState({
            firstLineImages: this.state.firstLineImages.sort((a, b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
        })

        const pos = {
            x: e.target.x(),
            y: e.target.y()
        }


        this.setState({
            firstLineImages: this.state.firstLineImages
                .map(image => (image.index == e.target.attrs.index ? {...image, x: pos.x, y: pos.y} : image))
        })
   
        //  check if player made right choose with pair (image - name) 
        //  change visibility to hide and show shapes
        //  alert if all images on right places
        for (let i = 0; i < 3; i++) {

            const secondLine = this.state.secondLineImages

            //  calibrate catching areat 
            let calibratiopnCatch = 120

            //  current x and y
            let x = secondLine[i].x
            let y = secondLine[i].y

            //  create catch area
            let leftBorders = x - secondLine[i].width + calibratiopnCatch
            let rightBorders = x + secondLine[i].width - calibratiopnCatch
            let topBorders = y - secondLine[i].height + calibratiopnCatch
            let bottomBorders = y + secondLine[i].height - calibratiopnCatch

            //  check catching
            if (pos.x > leftBorders && pos.x < rightBorders && pos.y > topBorders && pos.y < bottomBorders &&
                e.target.name() == secondLine[i].name) {

                    console.log(secondLine[i].name + " catched ")

                    //  change visibility to hide image circl and show image on text circle
                    this.setState({
                        secondLineImages: this.state.secondLineImages
                            .map(image => (image.name == e.target.name() ? {...image, visibility: false} : image)),
                        firstLineImages: this.state.firstLineImages
                            .map(image => (image.name == e.target.name() ? {...image, visibility: false} : image))
                    })

                    //  check if all images are on their places
                    for (let j = 0; j < 3; j++) {
                        if (this.state.firstLineImages[j].visibility)
                            break;
                        else if (j == 2)
                            this.populateWithRandomImage()
                    }

                }
        }

        //  back to start circle's position
        this.setState({
            firstLineImages: this.state.firstLineImages
                .map(image => (image.index == e.target.attrs.index ? {...image, x: 250 + 220 * image.index, y: 150} : image)),
                
        })

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

    componentDidUpdate() {
        if (this.props.images.length > 0 && this.state.allImages.length == 0) {
            this.setState({
                allImages : this.props.images 
            }, () => {
                this.populateWithRandomImage()
            })
        }
    }

    populateWithRandomImage = () => {


        let firstLine = []
        let secondLine = []

        //  return well formated for display name of image
        const formatName = name => {

            //  cut of after .
            name = name.replace('.png', '')

            //  make first letter to upper
            name = name[0].toUpperCase() + name.slice(1);

            return name
        }

        //  in purpose to shuffle text circles
        //  array which will represent suffle indexs
        let suffleArray = []

        //  update state.shuffle at start 
        this.setState({
            shuffle: [{
                index: 0,
                canUse: true
            },{
                index: 1,
                canUse: true
            },{
                index: 2,
                canUse: true
            }]

        }, () => {

            suffleArray = this.state.shuffle

            //  this code work
            for (let i = 0; i < 3; i++) 
                while (true) {

                    let random = Math.round(Math.random() * 2) 

                    let noSuchRandom = true

                    //  check if it is object with such index and canUse = false
                    for (let i = 0; i < 3; i++) 
                        if (suffleArray[i].index == random && suffleArray[i].canUse == false)
                            noSuchRandom = false
                    
                    if (!noSuchRandom) continue

                    //  find obj which never used
                    for (let i = 0; i < 3; i++)
                        if (suffleArray[i].canUse) {
                            suffleArray[i].canUse = false
                            suffleArray[i].index = random
                            noSuchRandom = false
                            break
                        }

                    if (!noSuchRandom) break

                }

            //  save randomise in state
            this.setState({
                shuffle: suffleArray
            }, () => {

                //  when we saved shuffle we can use it
                const state = this.state

                for (let i = 0; i < 3; i++) {

                    let randomIndex = Math.round(Math.random() * state.allImages.length)

                    //  check if name by this random index exist    also error can cause here
                    if (firstLine.length > 0)
                        if (firstLine.find(image => image.name == formatName(state.allImages[randomIndex].name)) != undefined) {
                            i--
                            continue
                    }

                    const img = new window.Image()
                    //  error can cause here because image don't load
                    img.src = `data:image/png;base64,${state.allImages[randomIndex].image}`
                   
                    firstLine.push  ({
                        //  counting x for every circle depends on index
                        x: 250 + 220 * i,
                        y: 150,
                        width: 190,
                        height: 190,
                        index: i,
                        image: img,
                        name: formatName(state.allImages[randomIndex].name),
                        visibility: true
                    })

                    secondLine.push({
                        //  shuffle before set x
                        x: 250 + 220 * state.shuffle[i].index,
                        y: 350,
                        width: 190,
                        height: 190,
                        index: state.shuffle[i].index,
                        image: img,
                        name: formatName(state.allImages[randomIndex].name),
                        visibility: true
                    })
                
                }

                this.setState({
                    firstLineImages: firstLine,
                    secondLineImages: secondLine,
                    //  i think it's not the best variant TODO remake
                    allImages: this.state.allImages
                        .filter(image => formatName(image.name) != firstLine[0].name)
                        .filter(image => formatName(image.name) != firstLine[1].name)
                        .filter(image => formatName(image.name) != firstLine[2].name)
                })            

            })
        })
    }


    render() {

        const stage = {
            width: 900,
            height: 550
        }

        //  check for recived arrays of images
        if (this.state.allImages.length > 0 && this.state.firstLineImages.length > 0 && this.state.secondLineImages.length > 0) {
            return (
                <Label>
                    {/* background */}
                    <Rect   
                        width={stage.width}
                        height={stage.height}
                        fill={this.state.gradient}
                        shadowBlur={10}/>

                    {/* second line drawing */}
                    {this.state.secondLineImages.map(image => (
                        <Label
                            key={image.index}
                            name={image.name}
                            x={image.x}
                            y={image.y}>

                            <Circle 
                                width={image.width}
                                height={image.height} 
                                stroke='black'
                                strokeWidth={5}
                                fill='white'  
                                />

                            <Text
                                x={40}    
                                y={70}
                                name={image.name}
                                width={image.width}
                                height={image.height}            
                                offsetX={image.width / 2}
                                offsetY={image.height / 2}
                                fontSize={30}   
                                fontFamily='Berkshire Swash'
                                fill='black'
                                visible={image.visibility}
                                text={image.name}
                                />

                            <Circle    
                                width={image.width - 10}
                                height={image.height - 10}            
                                visible={!image.visibility}
                                fillPatternImage={image.image}
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

                    {/* first line drawing */}
                    {this.state.firstLineImages.map(image => (
                        <Label
                            key={image.index}
                            name={image.name}
                            index={image.index}
                            x={image.x}
                            y={image.y}
                            onDragStart={this.onDragStart}
                            onDragEnd={this.onDragEnd}
                            visible={image.visibility}
                            draggable>    
                                
                            <Circle 
                                width={image.width}
                                height={image.height} 
                                fill='white'  
                                stroke='black'
                                strokeWidth={5}
                                />

                            <Circle    
                                width={image.width - 10}
                                height={image.height - 10}        
                                fillPatternImage={image.image}
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
        } else {
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
}

export default VocabularyGame3