import axios from 'axios'
import { 
    GET_DESCRIPTION
} from '../types'

//  get all message for game by game name
export const getDescription = gameName => dispatch => {
    axios
        .get(`http://localhost:8084/game/text/${gameName}`)
        .then(res => {
            dispatch({
                type: GET_DESCRIPTION,
                payload: res.data
            })
        })
}

