import axios from "axios";

import { FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_LOADING, FETCH_QUESTIONS_ERROR } from "./questionTypes";

export const fetchQuestionRequest = () => {
  return (dispatch, getState) => {
    dispatch({type : FETCH_QUESTIONS_LOADING });
    axios.get(`http://localhost:4000/api/questions`)
      .then(res => {
        dispatch({ type: FETCH_QUESTIONS_REQUEST, payload: res.data.questions });
        console.log('==============745348579834========');
        console.log(res.data.questions);
        console.log('==========================');
        
        dispatch({type : FETCH_QUESTIONS_LOADING });
      }).catch(error => {
        dispatch({ type: FETCH_QUESTIONS_ERROR, payload: error });
        dispatch({type : FETCH_QUESTIONS_LOADING });
    })
  }
};
