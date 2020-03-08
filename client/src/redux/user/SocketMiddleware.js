import SocketClient from "socket.io-client";

const socket = SocketClient("http://localhost:4000");
const createMySocketMiddleware = () => {
  return ({ dispatch }) => {
    socket.on("logged_in_user", (newUser) => {
      return dispatch({
        type: "ADD_LOGGEDIN_USER_FROM_SOCKET",
        newUser: newUser
      });
    });
    return next => (action) => {
      if (action.type === "LOGIN_USER") {
        socket.emit("new_user_logged_in", action.newUser);
        return next(action);
      }
      return next(action);
    };
  };
};

export default createMySocketMiddleware;
