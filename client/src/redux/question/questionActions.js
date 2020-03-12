import axios from "axios";

import { FETCH_QUESTIONS_REQUEST, RETRIEVE_QUESTIONS_REQUEST, FETCH_QUESTIONS_LOADING, FETCH_QUESTIONS_ERROR } from "./questionTypes";

export const retrieveQuestionRequest = (data) => {
  return {
    type: RETRIEVE_QUESTIONS_REQUEST,
    payload: data
  }
}

export const fetchQuestionRequest = () => {
  return (dispatch, getState) => {
    dispatch({type : FETCH_QUESTIONS_LOADING });
    axios.get(`https://express-react-redux-game.herokuapp.com/api/questions`)
      .then(res => {
        dispatch({ type: FETCH_QUESTIONS_REQUEST, payload: res.data.questions });
        dispatch({type : FETCH_QUESTIONS_LOADING });
      }).catch(error => {
        dispatch({ type: FETCH_QUESTIONS_ERROR, payload: error });
        dispatch({type : FETCH_QUESTIONS_LOADING });
    })
  }
};

// export const retrieveQuestionRequest = (questions) => {
//   return (dispatch) => {
//     dispatch(updateQuestions(questions));
//   }
// };

// export const retrieveQuestionRequest = (questions) => {
//   return (dispatch, getState) => {
//     dispatch({ type: RETRIEVE_QUESTIONS_REQUEST, payload: questions });
//   }
// };
