import { 
    GET_DESCRIPTION
} from '../types'   

const initialState = {
    description : null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_DESCRIPTION:
            console.log('GET_DESCRIPTION')
            return {
                ...state,
                description: action.payload
            }
        default:
            return {
                ...state
            }
    }
}