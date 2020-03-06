import { CREATE_GAME, ADD_JOINED_USER, UPDATE_GAMELIST, UPDATE_GAME, JOIN_GAME, UPDATE_GAME_SCORE, END_GAME, END_GAME_TO_ALL } from './gameTypes';

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

    case UPDATE_GAME_SCORE:
      return {
        ...state,
        game: { ...state.game, users: [...action.payload ] }
      };

    case END_GAME:
      return {
        ...state,
        game: { ...state.game, open: false },
        isGameOpen: action.payload
      };

    case END_GAME_TO_ALL:
      return {
        ...state,
        game: { ...state.game, users: action.payload.users, open: false },
        isGameOpen: action.payload.gameStatus
      };

    default:
      return state;
  }
};

export default reducer;
