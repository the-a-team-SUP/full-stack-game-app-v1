import { combineReducers } from 'redux'
import userReducer from './user/userTypes'
import questionReducer from './question/questionTypes';

const rootReducer = combineReducers( {
  user: userReducer,
  question: questionReducer
})

export default rootReducer