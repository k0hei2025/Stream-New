import { applyMiddleware, createStore } from "redux";
import mainReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk)),

);

export default store;
