import { SIGN_UP } from "../types/SignupTypes";

const initialState = {
  user_info: {},
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        user_info: action.user_info,
      };
    default:
      return state;
  }
};
