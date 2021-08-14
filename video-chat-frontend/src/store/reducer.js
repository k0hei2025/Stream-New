<<<<<<< HEAD
import { combineReducers } from "redux";
import dashboardReducer from "./reducers/dashboardReducer";
import callReducer from "./reducers/callReducer";
import { signupReducer } from "./reducers/signupReducer";
import { signinReducer } from "./reducers/signinReducer";

export default combineReducers({
  dashboard: dashboardReducer,
  call: callReducer,
  signup: signupReducer,
  signin: signinReducer,
=======
import { combineReducers } from 'redux';
import dashboardReducer from './reducers/dashboardReducer';
import callReducer from './reducers/callReducer';

export default combineReducers({
  dashboard: dashboardReducer,
  call: callReducer
>>>>>>> 9b7f6f871ea22aeb813347ad5a8dc2d56be68d40
});
