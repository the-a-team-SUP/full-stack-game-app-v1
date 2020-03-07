import { LOGIN_USER, LOGOUT_USER } from './userTypes'
import axios from 'axios'

export const loginUser = (user) =>
{
  return {
    type: LOGIN_USER,
    payload: user
  }
}

export const logoutUser = (userID) => {
  return { 
      type: LOGOUT_USER,
      user: userID

  };
};

export const postUser = (user) => {
  const { name, email, picture, userID } = user;
  return (dispatch) => axios.post('http://localhost:4000/api/facebooklogin', {
      name,
      email,
      picture,
      userID
    }).then(response => {
      console.log(response)
      dispatch(loginUser(user))
    }).catch(error => console.log(error))
}
