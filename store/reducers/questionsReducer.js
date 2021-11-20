import {
  GET_ANSWER,
  GET_TOTAL_SCORE,
  CREATE_EXAM,
} from "../types/questionsTypes";
import { randomArrayShuffle } from "../../utils/helperFunctions";
import { questions } from "../../utils/questions";

const initialState = {
  questions: [],
  totalScore: null,
};

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANSWER:
      const questionsCopy = [...state.questions];

      questionsCopy.forEach((question) => {
        if (question.id === action.payload.questionId) {
          question.selectedAnswer = action.payload.answerId;
        }
      });
      return {
        ...state,
        questions: questionsCopy,
      };

    case GET_TOTAL_SCORE:
      let score = 0;
      const newQuestionsCopy = [...state.questions];
      newQuestionsCopy.forEach((question) => {
        if (question.correctAnswer === question.selectedAnswer) {
          score += 10;
        }
      });
      return {
        ...state,
        totalScore: score,
      };
    case CREATE_EXAM:
      const exam = randomArrayShuffle(questions);
      return {
        ...state,
        questions: exam,
      };
    default:
      return state;
  }
};
