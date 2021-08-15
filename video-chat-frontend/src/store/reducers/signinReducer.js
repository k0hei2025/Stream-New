import { SIGN_IN } from "../types/SigninTypes";

const initialState = {
  sigin_info: window.localStorage.getItem("userCredentials")
    ? JSON.parse(window.localStorage.getItem("user_details") || "{}")
    : {},
};

export const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        sigin_info: action.sigin_info,
      };
    default:
      return state;
  }
};
