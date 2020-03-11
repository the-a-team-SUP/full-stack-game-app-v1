import { CREATE_GAME, ADD_JOINED_USER } from "./gameTypes";
import { UPDATE_GAMELIST } from './gameTypes';
import { JOIN_GAME } from './gameTypes';
import { UPDATE_GAME } from './gameTypes';

const inititalState = {
  loading: false,
  gameList: [],
  game: {
    id: 1,
    users: []
  },
  error: "",
  isGameOpen:false
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        game: action.payload,
        isGameOpen: "pending"
      };

    case UPDATE_GAMELIST:
      return {
        ...state,
        gameList: [...state.gameList, action.payload]
      };


    case UPDATE_GAME:
      return {
        ...state,
        game: action.payload
      };

    case JOIN_GAME:
      return {
        ...state,
        game: action.payload
      };

    case ADD_JOINED_USER:
      const updatedGameList = state.gameList.map(game => {
        if (game.id === action.payload.id) {
          game.users = action.payload.users
        }
        return game
      })
      
      return {
        ...state,
        gameList: updatedGameList,
        game: action.payload
      };


    default:
      return state;
  }
};

export default reducer;
