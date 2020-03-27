import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../Components/Common/Navbar'
import Footer from '../Components/Common/Footer'

class Home extends Component {
    render() {
        return (            
            <div>
                <Navbar/>
                <div>
                    Main Part
                </div>
                <Footer/>
            </div>
        )
    }
}

export default connect(null)(Home)