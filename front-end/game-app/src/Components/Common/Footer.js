import React, { Component } from 'react'
import { connect } from 'react-redux'

class Footer extends Component {
    render() {
        return (
            <div>
                Hell from footer
            </div>
        )
    }
}


export default connect(null)(Footer)