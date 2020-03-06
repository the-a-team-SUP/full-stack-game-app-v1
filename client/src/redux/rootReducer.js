import { combineReducers } from 'redux'
import questionReducer from './question/questionReducer';
import userReducer from './user/userReducer';
import gameReducer from './game/gameReducer';

const rootReducer = combineReducers( {
  user: userReducer,
  question: questionReducer,
  game: gameReducer
})

export default rootReducer