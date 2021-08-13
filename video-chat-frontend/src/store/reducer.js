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
});
