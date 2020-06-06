import { combineReducers } from "redux";
import ImageReducer from './ImageReducer'
import UserReducer from './UserReducer'
import ChatReducer from './ChatReducer'
import ScoreReducer from './ScoreReducer'
import DescriptionReducer from './DescriptionReducer'
import StatsReducer from './StatsReducer'


export default combineReducers({
   StatsReducer,
   ImageReducer,
   UserReducer,
   ChatReducer,
   ScoreReducer,
   DescriptionReducer
});