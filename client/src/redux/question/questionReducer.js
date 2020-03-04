import { FETCH_QUESTIONS_REQUEST } from "./questionTypes";

const inititalState = {
  laoding: false,
  question: {},
  error: ""
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default reducer;
