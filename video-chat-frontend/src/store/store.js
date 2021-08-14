<<<<<<< HEAD
import { applyMiddleware, createStore } from "redux";
import mainReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk)),
=======
import { createStore } from 'redux';
import mainReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  mainReducer,
  composeWithDevTools()
>>>>>>> 9b7f6f871ea22aeb813347ad5a8dc2d56be68d40
);

export default store;
