import { LOGIN_USER, LOGOUT_USER } from "./userTypes";

const initialStatus = {
  loggedInUsers: [],
  message: ' ',
  onlineUsers: []
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
      // loggedInUsers: [ ...state.loggedInUsers, action.newUser ],
      onlineUsers: [...state.onlineUsers, action.newUser]
    };
  } else if (action.type === "ADD_FETCHED_USERS") {
    const otherUsers = action.users.filter((user) => {
      return user.userID !== state.loggedInUsers[0].userID.toString();
    });
    return {
      ...state,
      // loggedInUsers: [ ...state.loggedInUsers, ...action.users ]
      onlineUsers: [...otherUsers]
    };
  } else if (action.type === LOGOUT_USER) {
    const userToLogout = action.user
    const unloggedOutUsers = state.loggedInUsers.filter(users => {
      localStorage.setItem('message', action.serverData.data.message);
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
