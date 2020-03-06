import { CREATE_GAME } from "./gameTypes";
import { UPDATE_GAMELIST } from './gameTypes';

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
        isGameOpen: true
      };

    case UPDATE_GAMELIST:
      return {
        ...state,
        gameList: [...state.gameList, action.payload]
      };

    default:
      return state;
  }
};

export default reducer;
