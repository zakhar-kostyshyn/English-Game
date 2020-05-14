import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Header, Menu, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { logoutUser, loadUser } from '../../../Actions/UserAction'
import styled from 'styled-components'

const StyledMenu = styled(Menu)`

    background: #95b4f1 !important;
    margin-bottom: 50px !important;
    padding: 20px 20px 20px 40px;
    border-radius: 2.5em !important;
    box-shadow: 0 0 15px 2px #373636 !important;
`


class Navbar extends Component {

    state = {
        activeProfile: false  
    }

    onLogOut = () => {
        this.props.logoutUser();
    }

    componentDidMount() {        
        //  if token exist in local storage load user
        if (localStorage.getItem("token"))
            this.props.loadUser()
    }

    render() {
        return (
            <header>
                {/* Menu in navbar */}
                <StyledMenu borderless>
                    <Menu.Item name='home' as={Link} to='/home'>
                        <Header>English Game</Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        {/* if guest is not auhtenticate then show sing-in icon else show username icon and name */}
                        {   this.props.isLoginSuccess ?
                            <Menu.Menu position='right'>
                                <Menu.Item>{this.props.username}</Menu.Item>
                                <Menu.Item>
                                    <Dropdown icon='user'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to='/home/profile'>Profile</Dropdown.Item>
                                            <Dropdown.Item as={Link} to='/home' onClick={this.onLogOut}>Log Out</Dropdown.Item>
                                            <Dropdown.Item >Stats</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Item>
                            </Menu.Menu>
                        :
                            <Menu.Item onClick={this.props.showDimmer}>
                                <Icon name='sign-in'/>
                            </Menu.Item>
                        }
                    </Menu.Menu>
                </StyledMenu>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    username: state.UserReducer.username,
    isLoginSuccess: state.UserReducer.isLoginSuccess
})

export default connect(mapStateToProps, { logoutUser, loadUser })(Navbar)