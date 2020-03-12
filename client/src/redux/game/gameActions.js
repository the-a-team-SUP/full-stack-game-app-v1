import openSocket from 'socket.io-client';
import { CREATE_GAME, UPDATE_GAMELIST, JOIN_GAME, UPDATE_GAME, ADD_JOINED_USER, UPDATE_GAME_SCORE, END_GAME, END_GAME_TO_ALL } from './gameTypes';
import { socketToListen } from '../../Helpers/socket.ioHelper';

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

export const addJoinedUser = (game) =>
{
  return {
    type: ADD_JOINED_USER,
    payload: game
  }
}
export const updateGame = (game) =>
{
  return {
    type: UPDATE_GAME,
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
  const pathSocket = "https://express-react-redux-game.herokuapp.com/";
  const socket = openSocket(pathSocket);
  socket.emit('makeGame', game);
  return (dispatch) => {
    dispatch(createGame(game))
  }
}

export const joinGameHandler = (game) => {
  const pathSocket = "https://express-react-redux-game.herokuapp.com/";
  const socket = openSocket(pathSocket);
  socket.emit('joinRoom', game);
  return (dispatch) => {
    dispatch(joinGame(game))
  }
}

export const updateGameScoreAction = (data) => {
  return {
    type: UPDATE_GAME_SCORE,
    payload: data
  }
}

export const endGame = () => {
  return {
    type: END_GAME,
    payload: 'done'
  }
}

export const endGameHandler = (gameResult) => {
  const socket = openSocket(socketToListen);
  socket.emit('clientEndGame', gameResult, () => {});
  return (dispatch) => {
    dispatch(endGame())
  }
}

export const endGameToAll = (gameResult) => {
  return {
    type: END_GAME_TO_ALL,
    payload: gameResult
  }
}
