import { combineReducers } from "redux";
import dashboardReducer from "./reducers/dashboardReducer";
import callReducer from "./reducers/callReducer";
import { signupReducer } from "./reducers/signupReducer";
import { signinReducer } from "./reducers/signinReducer";
import scheduleReducer from "./reducers/scheduleReducer";

export default combineReducers({
  dashboard: dashboardReducer,
  call: callReducer,
  signup: signupReducer,
  signin: signinReducer,
  schedule: scheduleReducer,
});
