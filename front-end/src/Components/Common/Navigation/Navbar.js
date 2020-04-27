import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Header, Menu, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { logoutUser, loadUser } from '../../../Actions/UserAction'


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
                <Menu>
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
                                            <Dropdown.Item>Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={this.onLogOut}>Log Out</Dropdown.Item>
                                            <Dropdown.Item>Class</Dropdown.Item>
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
                </Menu>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    username: state.UserReducer.username,
    isLoginSuccess: state.UserReducer.isLoginSuccess
})

export default connect(mapStateToProps, { logoutUser, loadUser })(Navbar)