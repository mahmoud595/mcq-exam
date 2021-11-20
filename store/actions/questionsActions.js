import {
  GET_ANSWER,
  GET_TOTAL_SCORE,
  CREATE_EXAM,
} from "../types/questionsTypes";

export const getAnswer = (answerId, questionId) => {
  return {
    type: GET_ANSWER,
    payload: {
      answerId,
      questionId,
    },
  };
};

export const getTotalScore = () => {
  return {
    type: GET_TOTAL_SCORE,
  };
};

export const createExam = () => {
  return {
    type: CREATE_EXAM,
  };
};
