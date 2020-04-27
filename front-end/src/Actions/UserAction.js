import axios from 'axios'

import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOGOUT,
    LOAD_SUCCESS,
    INVALID_TOKEN
} from '../types'

//  login user by username and password
export const loginUser = (login, password) => dispatch => {
    
    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }
    
    const body = JSON.stringify({login, password})

    axios
        .post("http://localhost:8081/user/login", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: LOGIN_FAIL
            })
        })

}

//  load user exactly. If token is valid
export const loadUser = () => dispatch => {

    axios
        .post("http://localhost:8081/user/load", setToken())
        .then(res => {
            dispatch({
                type: LOAD_SUCCESS,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: INVALID_TOKEN
            })
        })

}

export const createUser = (name, surname, username, password, email) => dispatch => {
    
    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }
    
    const body = JSON.stringify({name, surname, username, password, email})

    axios
        .post("http://localhost:8081/user/create", body, config)
        .then(res => {
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: CREATE_USER_FAIL
            })
        })

}

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

//  set token to Authorization
export const setToken = () => {

    const token = localStorage.getItem('token')
    
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else axios.defaults.headers.common['Authorization'] = null
     
}