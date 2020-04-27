
import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOGOUT,
    LOAD_SUCCESS,
    INVALID_TOKEN
} from '../types'

const initialState = {
    token: localStorage.getItem("token"),
    username: null,
    isLoginSuccess: false,        //  to indicate that user is logined 
    isUserCreate: false,           //  to indicate that user is registered    
    roles: 'guest'
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOAD_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                isLoginSuccess: true,
                username: action.payload.username
            }
        case INVALID_TOKEN:
            console.log("INVALID_TOKEN")
        case LOGIN_FAIL:
            console.log("LOGIN_FAIL");
            return {
                ...state
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                isUserCreate: true,
            }
        case CREATE_USER_FAIL:
            console.log("CREATE_USER_FAIL");
            return {
                ...state
            }
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                username: null,
                isLoginSuccess: false,       
                isUserCreate: false 
            }
        default:
            return {
                ...state
            }
    }
}