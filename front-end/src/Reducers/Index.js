import { combineReducers } from "redux";
import ImageReducer from './ImageReducer'
import UserReducer from './UserReducer'
import ChatReducer from './ChatReducer'
import ScoreReducer from './ScoreReducer'
import DescriptionReducer from './DescriptionReducer'


export default combineReducers({
   ImageReducer,
   UserReducer,
   ChatReducer,
   ScoreReducer,
   DescriptionReducer
});