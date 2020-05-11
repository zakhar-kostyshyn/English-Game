import { setToken } from './UserAction'
import axios from 'axios'
import { 
    GET_CHAT, POST_MESSAGE 
} from '../types'

//  get all message for game by game name
export const getAllMessage = gameName => dispatch => {
    axios
        .get(`http://localhost:8084/chat/${gameName}`)
        .then(res => {
            dispatch({
                type: GET_CHAT,
                payload: res.data
            })
        })
}

//  get all message for game by game name
export const postNewMessage = (message, username, game, date) => dispatch => {

    const body = JSON.stringify({message, username, game, date})
    
    axios
        .post("http://localhost:8084/chat/create", body, setToken())
        .then(res => {
            dispatch({
                type: POST_MESSAGE,
                payload: res.data
            })
        })
}
