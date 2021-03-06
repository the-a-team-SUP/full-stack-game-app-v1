import { LOGIN_USER, LOGOUT_USER } from './userTypes'
import axios from 'axios'

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

export const logoutUser = (userID) => {
  return (dispatch) => axios.post('https://express-react-redux-game.herokuapp.com/api/facebooklogout', { userID }).then(data => {
    dispatch({
      type: LOGOUT_USER,
      user: userID,
      serverData: data
    })

  }).catch(error => dispatch({
    type: LOGOUT_USER,
    user: userID,
    serverData: error
  })
  )
}

export const postUser = (user) => {
  const { name, email, picture, userID } = user;
  return (dispatch) => axios.post('https://express-react-redux-game.herokuapp.com/api/facebooklogin', {
    name,
    email,
    picture,
    userID
  }).then(response => {
    dispatch(loginUser(user))
  }).catch(error => console.log(error))
}
