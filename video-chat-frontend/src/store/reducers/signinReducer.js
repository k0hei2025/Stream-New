import { SIGN_IN, SIGN_IN_ERROR } from "../types/SigninTypes";

const initialState = {
  sigin_info: {},
};

export const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_IN_ERROR:
      return {
        ...state,
        sigin_info: action.sigin_info,
        error: action.error,
      };
    default:
      return state;
  }
};
