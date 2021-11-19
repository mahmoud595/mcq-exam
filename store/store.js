import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
import { createWrapper } from "next-redux-wrapper";

const initialstate = {};

const makeStore = (context) =>
  createStore(rootReducer, initialstate, composeWithDevTools());

export default createWrapper(makeStore);
