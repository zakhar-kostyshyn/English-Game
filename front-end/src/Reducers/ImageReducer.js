import { 
    GET_THEME, 
    GET_IMAGE,
    DELETE_THEME
} from '../types'   

const initialState = {
    images : []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_THEME:
            return {
                images: action.payload
            }
        case DELETE_THEME:
            return {
                images: []
            }
        default:
            return {
                ...state
            }
    }
}