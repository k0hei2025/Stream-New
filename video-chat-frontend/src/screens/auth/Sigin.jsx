import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import signinAction from "../../store/actions/signinActions";

const Sigin = ({ user_info_fun, response }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    user_info_fun();
  });

  const { email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    user_info_fun(values);
    setValues({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="form-container sign-in-container">
        <form>
          <h1>Sign in</h1>

          <input
            type="emil"
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
            required
          />
          <p style={{ color: "red" }}>{password}</p>
          <Router>
            <NavLink to="">Forgot your password?</NavLink>
          </Router>
          <button onClick={onSubmit}>Sign In</button>
        </form>
      </div>
    </>
  );
};

// recive
const recive = (state) => {
  console.log("This is State ", state);
  return {
    response: state.signin,
  };
};
// dispatch
const send = (dispatch) => {
  return {
    user_info_fun: (obj) => {
      dispatch(signinAction(obj));
    },
  };
};

export default connect(recive, send)(Sigin);
