import { combineReducers } from "redux";
import { questionsReducer } from "../reducers/questionsReducer";

const combinedReducer = combineReducers({
  questions: questionsReducer,
});

export default combinedReducer;
