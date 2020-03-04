import { FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_LOADING, FETCH_QUESTIONS_ERROR } from "./questionTypes";

const inititalState = {
  loading: false,
  questions: [],
  error: ""
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        questions: action.payload
      };
    
    case FETCH_QUESTIONS_LOADING:
      return {
        ...state,
        loading: !state.loading
      };

    case FETCH_QUESTIONS_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
