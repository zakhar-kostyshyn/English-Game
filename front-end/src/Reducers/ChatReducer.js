import { 
    GET_CHAT, 
    POST_MESSAGE 
} from '../types'   

const initialState = {
    messages : []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_MESSAGE:
            console.log('POST_MESSAGE')
        case GET_CHAT:
            console.log('GET_CHAT')
            return {
                ...state,
                messages: action.payload
            }
        default:
            return {
                ...state
            }
    }
}