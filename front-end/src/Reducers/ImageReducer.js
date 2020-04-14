import { 
    GET_THEME, 
    GET_IMAGE 
} from '../types'   

const initialState = {
    images : []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_THEME:
            return {
                ...state,
                images: action.payload
            }
        default:
            return {
                ...state
            }
    }
}