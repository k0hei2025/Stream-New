// this.state = {

//   passwordError: "",
//   usersConfirmPassword: "",
// };
import Sigin from "./Sigin";
import React, { useState, useEffect } from "react";

import "./css/signup.css";
import { connect } from "react-redux";
import signupAction from "../../store/actions/signupActions";

const Signup = ({ user_info_fun, response }) => {
  const [ghostSignup, setGhostSignup] = useState();
  const [errPassword, setErrPassword] = useState();
  const [usersConfirmPassword, setUsersConfirmPassword] = useState();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const ghostSignUpFun = () => {
    setGhostSignup("right-panel-active");
  };

  const ghostSigninFun = () => {
    setGhostSignup("");
  };

  useEffect(() => {
    user_info_fun();
  });

  const { email, password, confirmPassword } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setUsersConfirmPassword("Enter Same Password as above");
    } else if (password.length < 8 || confirmPassword < 8) {
      setErrPassword("Enter atleast 8 charecter");
    } else {
      user_info_fun({ email, password });
      setValues({
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("submitted");
    }
  };

  return (
    <>
      <div className={`container ${ghostSignup} `} id="container">
        {/* SignUp Starts from */}

        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange("email")}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange("password")}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <span>
              {" "}
              <p style={{ color: "red" }}>{errPassword}</p>
              <p style={{ color: "red" }}>{usersConfirmPassword}</p>
            </span>
            <button onClick={onSubmit}>Sign Up</button>
          </form>
        </div>
        {/* SignUp Ends Here */}

        {/* Signin Starts from here */}
        <Sigin />
        {/* Signin ends here */}

        {/* Overlay starts from here */}

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={ghostSigninFun}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={ghostSignUpFun}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
        {/* Overlay ends here */}
      </div>
      <p style={{ color: "red" }}>{JSON.stringify(values)}</p>
    </>
  );
};

// recive
const recive = (state) => {
  console.log("This is State ", state);
  return {
    response: state.signup,
  };
};
// dispatch
const send = (dispatch) => {
  return {
    user_info_fun: (obj) => {
      dispatch(signupAction(obj));
    },
  };
};

export default connect(recive, send)(Signup);
