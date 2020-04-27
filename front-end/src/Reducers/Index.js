import { combineReducers } from "redux";
import ImageReducer from './ImageReducer'
import UserReducer from './UserReducer'
import TableReducer from './TableReducer'

export default combineReducers({
   ImageReducer,
   UserReducer,
   TableReducer
});