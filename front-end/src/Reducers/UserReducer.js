
import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOGOUT,
    LOAD_SUCCESS,
    INVALID_TOKEN,
    LOADING
} from '../types'

const initialState = {
    token: localStorage.getItem("token"),
    username: null,
    isLoginSuccess: false,        //  to indicate that user is logined 
    isUserCreate: false,           //  to indicate that user is registered    
    isUserLoading: false,
    role: [],
    email: null,
    name: null, 
    surname: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING: 
            console.log('LOADING')
            return {
                ...state,
                isUserLoading: true
            }
        case LOAD_SUCCESS:
            console.log('LOAD_SUCCESS')
        case LOGIN_SUCCESS:
            console.log('LOGIN_SUCCESS')
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                isUserLoading: false,
                isLoginSuccess: true,
                username: action.payload.username,
                role: action.payload.roles,
                email: action.payload.email,
                name: action.payload.name,
                surname: action.payload.surname
            }
        case INVALID_TOKEN:
            console.log("INVALID_TOKEN")
        case LOGIN_FAIL:
            console.log("LOGIN_FAIL");
            return {
                ...state
            }
        case CREATE_USER_SUCCESS:
            console.log("CREATE_USER_SUCCESS");
            return {
                ...state,
                isUserLoading: false,
                isUserCreate: true,
            }
        case CREATE_USER_FAIL:
            console.log("CREATE_USER_FAIL");
            return {
                ...state
            }
        case LOGOUT:
            localStorage.removeItem("token")
            console.log("LOGOUT");
            return {
                ...state,
                username: null,
                isLoginSuccess: false,       
                isUserCreate: false, 
                isUserLoading: false
            }
        default:
            return {
                ...state
            }
    }
}