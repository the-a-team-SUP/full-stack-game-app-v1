import { LOGIN_USER } from './userTypes'

const inititalState = {
    user: {
      
    }
}

const reducer = (state = inititalState, action) =>
{
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      }
    
    default: return state
  }
}

export default reducer