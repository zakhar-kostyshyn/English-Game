import { combineReducers } from "redux";
import ImageReducer from './ImageReducer'
import UserReducer from './UserReducer'
import ChatReducer from './ChatReducer'
import ScoreReducer from './ScoreReducer'

export default combineReducers({
   ImageReducer,
   UserReducer,
   ChatReducer,
   ScoreReducer
});