import { setToken } from './UserAction'
import axios from 'axios'
import { 
    GET_SCORE, POST_SCORE 
} from '../types'

//  action for getting all score from game
export const getAllScore = gameName => dispatch => {
    axios
        .get(`http://localhost:8084/game/score/${gameName}`)
        .then(res => {
            dispatch({
                type: GET_SCORE,
                payload: res.data
            })
        })
}

//  action to create new score in game
export const createNewScore = (game, username, score, scoreTime) => dispatch => {

    const body = JSON.stringify({game, username, score, scoreTime})
    
    axios
        .post("http://localhost:8084/game/score", body, setToken())
        .then(res => {
            dispatch({
                type: POST_SCORE,
                payload: res.data
            })
        })
}