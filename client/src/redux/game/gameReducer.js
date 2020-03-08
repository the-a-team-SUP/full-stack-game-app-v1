import { CREATE_GAME, ADD_JOINED_USER } from "./gameTypes";
import { UPDATE_GAMELIST } from './gameTypes';
import { JOIN_GAME } from './gameTypes';

const inititalState = {
  loading: false,
  selectedGame: {
    joinedGame: 1,
    users: [
      {
        userId: 1,
        score: 11
      },
      {
        userId: 2,
        score: 12
      },
      {
        userId: 3,
        score: 13
      },
      {
        userId: 4,
        score: 14
      },
      {
        userId: 5,
        score: 15
      }
    ],
  },
  gameList: [],
  game:{},
  error: "",
  isGameOpen: false
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
      console.log('Updated', updatedGameList)
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
