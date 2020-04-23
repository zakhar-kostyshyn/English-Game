import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Header, Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

class Navbar extends Component {
    render() {
        return (

            <header>
                {/* Menu in navbar */}
                <Menu>
                    <Menu.Item name='home' as={Link} to='/home'>
                        <Header>English Game</Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Icon name='home'/>
                        </Menu.Item>
                        <Menu.Item onClick={this.props.showDimmer}>
                            <Icon name='sign-in'/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </header>
        )
    }
}


export default connect(null)(Navbar)