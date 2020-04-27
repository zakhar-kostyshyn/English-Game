import axios from 'axios'
import { setToken } from './UserAction'

import { 
    GET_SCORE,
    POST_SCORE
} from '../types'


//  get all score from game by name
export const allScoreFromGameWithName = gameName => dispatch => {
    
    axios
        .get(`http://localhost:8081/game-service/game/${gameName}`)
        .then(res => {
            dispatch({
                type: GET_SCORE,
                payload: res.data
            })
        })
}

//  post score by game, username and score
export const postScore = (game, username, score) => dispatch => {
       
    const body = JSON.stringify({game, username, score})

    axios
        .post("http://localhost:8081/game-service/game/score", body, setToken)
        .then(res => {
            dispatch({
                type: POST_SCORE,
                payload: res.data
            })
        })
}
