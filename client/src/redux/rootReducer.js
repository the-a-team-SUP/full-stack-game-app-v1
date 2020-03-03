import { combineReducers } from 'redux'
import userReducer from './user/userTypes'

const rootReducer = combineReducers( {
  user: userReducer
})

export default rootReducer