import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import signupAction from "../../store/actions/signupActions";

const Signup = ({ user_info_fun, response }) => {
  const [errPassword, setErrPassword] = useState();
  const [usersConfirmPassword, setUsersConfirmPassword] = useState();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    </>
  );
};

// recive
const recive = (state) => {
  console.log("This is SIGNUPState ", state);
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
