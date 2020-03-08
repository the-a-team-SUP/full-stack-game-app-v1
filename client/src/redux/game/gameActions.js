import openSocket from 'socket.io-client';
import { CREATE_GAME } from './gameTypes'
import { JOIN_GAME } from './gameTypes'
import { UPDATE_GAMELIST } from './gameTypes'

export const createGame = (game) =>
{
  return {
    type: CREATE_GAME,
    payload: game
  }
}

export const joinGame = (game) =>
{
  return {
    type: JOIN_GAME,
    payload: game
  }
}

export const updateGameList = (game) =>
{
  return {
    type: UPDATE_GAMELIST,
    payload: game
  }
}

export const createGameHandler = (game) => {
  const pathSocket = "http://127.0.0.1:4000";
  const socket = openSocket(pathSocket);
  socket.emit('makeGame', game);
  return (dispatch) => {
    dispatch(createGame(game))
  }
}

export const joinGameHandler = (game) => {
  const pathSocket = "http://127.0.0.1:4000";
  const socket = openSocket(pathSocket);
  socket.emit('joinRoom', game);
  return (dispatch) => {
    dispatch(joinGame(game))
  }
}
