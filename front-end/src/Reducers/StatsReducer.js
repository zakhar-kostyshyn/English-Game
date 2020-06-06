import {
    GET_STATS, POST_STATS
} from '../types'

const initialState = {
    score: 0,
    time: 0,
    gameCounter: 0

}

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_STATS:
            console.log("POST_STATS")
        case GET_STATS:
            console.log("GET_STATS")
            return {
                ...state,
                score: action.payload.score,
                time: action.payload.time,
                gameCounter: action.payload.gameCounter
            }
        default:
            return {
                ...state
            }
    }
}