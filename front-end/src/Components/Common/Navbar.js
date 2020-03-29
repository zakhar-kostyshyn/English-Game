import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Header, Menu, Icon} from 'semantic-ui-react'

// import styled from 'styled-components'

// const StyledMenu = styled(Menu)`
//     padding-top: 5rem;
// `

class Navbar extends Component {
    render() {
        return (
            <Menu>
                <Menu.Item name='home'>
                    <Header>English Game</Header>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Icon name='home'/>
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='sign-in'/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default connect(null)(Navbar)