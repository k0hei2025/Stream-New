import axios from "axios";

import { SIGN_UP, SIGN_UP_ERROR } from "../types/SignupTypes";

const signupAction = (user_details) => {
  console.log("this is main kfb", user_details);
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        user_details,
      );

      console.log("This is the response", res);
      const { data } = res;
      dispatch({
        type: SIGN_UP,
        user_info: data,

        error: "",
      });
    } catch (err) {
      dispatch({
        type: SIGN_UP_ERROR,
        user_info: {},
        error: err.message,
      });
    }
  };
};

export default signupAction;
