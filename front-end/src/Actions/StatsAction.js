import { setToken } from './UserAction'
import axios from 'axios'
import {
    GET_STATS, POST_STATS
} from '../types'

//  post stats by user
export const postStats = (username, score, time)  => dispatch => {

    const body = JSON.stringify({username, score, time})

    axios
        .post(`http://localhost:8081/user/stats/post`, body, setToken())
        .then(res => {
            dispatch({
                type: POST_STATS,
                payload: res.data
            })
        })
}

//  get stats by user
export const getStats = username  => dispatch => {
    axios
        .get(`http://localhost:8081/user/stats/get/${username}`,setToken())
        .then(res => {
            dispatch({
                type: GET_STATS,
                payload: res.data
            })
        })
}