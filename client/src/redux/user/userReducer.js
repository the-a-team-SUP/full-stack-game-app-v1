import { FETCH_USERS_REQUEST } from './userTypes'

const inititalState = {
    laoding: false,
    user: {},
    error: ''
}

const reducer = (state = inititalState, action) =>
{
  switch ( action.type ) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    
    default: return state
  }
}

export default reducer