import { LOGIN_USER, LOGOUT_USER } from "./userTypes";
import axios from 'axios';

const initialStatus = {
  loggedInUsers: []
};

const reducer = (state = initialStatus, action) => {
  if (action.type === LOGIN_USER) {
    const incomingUserData = action.newUser;
    const updatedLoggedInUsers = [
      ...state.loggedInUsers,
      incomingUserData
    ];
    return {
      ...state,
      loggedInUsers: updatedLoggedInUsers
    }
  } else if (action.type === "ADD_LOGGEDIN_USER_FROM_SOCKET") {
    return {
      ...state,
      loggedInUsers: [...state.loggedInUsers, action.newUser]
    };
  } else if (action.type === "ADD_FETCHED_USERS") {
    return {
      ...state,
      loggedInUsers: [...state.loggedInUsers, ...action.users]
    };
  } else if (action.type === LOGOUT_USER) {
    const userToLogout = action.user
    const unloggedOutUsers = state.loggedInUsers.filter(users => {
      return users.userID !== userToLogout;
    })
    axios.post('api/facebooklogout', { userID: userToLogout });
    return {
      ...state,
      loggedInUsers: unloggedOutUsers
    }
  }
  return state;
};

export default reducer;
