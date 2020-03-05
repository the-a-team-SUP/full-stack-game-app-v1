import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import questionReducer from './question/questionReducer';

const rootReducer = combineReducers( {
  user: userReducer,
  question: questionReducer
})

export default rootReducer