import { 
    GET_SCORE, 
    POST_SCORE 
} from '../types'

const initialState = {
    score : [],
    indexAddScore: 0
}

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_SCORE:
            console.log('POST_SCORE')
            return {
                ...state,
                indexAddScore: action.payload
            }
        case GET_SCORE:
            console.log('GET_SCORE')
            return {
                ...state,
                score: action.payload
            }
        default:
            return {
                ...state
            }
    }
}