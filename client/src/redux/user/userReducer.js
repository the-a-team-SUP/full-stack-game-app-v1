import { LOGIN_USER, LOGOUT_USER } from "./userTypes";

const initialStatus = {
  loggedInUsers: [],
  message: ' '
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
    return {
      ...state,
      loggedInUsers: unloggedOutUsers,
      message: action.serverData.data.message
    }
  }
  return state;
};

export default reducer;
