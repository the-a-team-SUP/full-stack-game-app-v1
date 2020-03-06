import axios from 'axios'

import { LOGIN_USER } from './userTypes'

export const loginUser = (user) =>
{
  return {
    type: LOGIN_USER,
    payload: user
  }
}

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
