import axios from 'axios'
import { 
    GET_THEME, GET_IMAGE 
} from '../types'

//  action for getting all image from theme
export const getTheme = theme => dispatch => {
    axios
        .get(`http://localhost:8084/game/image/theme/${theme}`)
        .then(res => {
            dispatch({
                type: GET_THEME,
                payload: res.data
            })
        })
}

//  action to get a singl image
export const getImage = name => (dispatch, getState) => {
    axios
        .get(`http://localhost:8084/game/image/name/${name}`)
        .then(res => {
            dispatch({
                type: GET_IMAGE,
                payload: res.data
            })
        })
}