import axios from 'axios'
import { 
    GET_THEME, GET_IMAGE, DELETE_THEME
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
export const deleteTheme = () => dispatch => dispatch({type: DELETE_THEME})

