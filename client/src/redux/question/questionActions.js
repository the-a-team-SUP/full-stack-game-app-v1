import axios from "axios";

import { FETCH_QUESTIONS_REQUEST } from "./questionTypes";

export const fetchQuestionRequest = () => {
  return {
    type: FETCH_QUESTIONS_REQUEST
  };
};
