import { SIGN_UP, SIGN_UP_ERROR } from "../types/SignupTypes";

const initialState = {
  user_info: {},
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_UP_ERROR:
      return {
        ...state,
        user_info: action.user_info,
        error: action.error,
      };
    default:
      return state;
  }
};
