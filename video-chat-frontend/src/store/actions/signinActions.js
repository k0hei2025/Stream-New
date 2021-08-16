import axios from "axios";
import { SIGN_IN } from "../types/SigninTypes";

const signinAction = (user_details) => {
  console.log("this is main kfb", user_details);

  return async (dispatch, getState) => {

    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEPyDFaklwGS8C3zUVG1I_8-6WtJk6rFM",
        user_details,
      );


      // console.log("This is the response", res);
 
      const { data } = res;
      dispatch({
        type: SIGN_IN,
        sigin_info: data,
      });

      window.localStorage.setItem(
        "userCredentials",
        JSON.stringify(getState().signin.sigin_info),
      );
 
    } catch (err) {
      console.log(err);
    }
  };
};

export default signinAction;
