import { combineReducers } from 'redux'
import questionReducer from './question/questionReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers( {
  user: userReducer,
  question: questionReducer
})

export default rootReducer