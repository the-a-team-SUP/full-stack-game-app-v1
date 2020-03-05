import { LOGIN_USER } from "./userTypes";

const initialStatus = {
  loggedInUsers: []
};

const reducer = (state = initialStatus, action) => {
  if(action.type === LOGIN_USER){
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
  }
  return state;
};

export default reducer;
