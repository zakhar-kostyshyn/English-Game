import { 
    GET_SCORE,
    POST_SCORE
} from '../types'

const initialState = {
    gameScore: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case POST_SCORE:
        case GET_SCORE:
            console.log(action.payload)
            return {
                ...state,
                gameScore: action.payload
            }  
        default:
            return {
                ...state
            }
    }
}