import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, NavLink, useHistory } from "react-router-dom";
import signinAction from "../../store/actions/signinActions";

const Sigin = ({ user_info_fun, response }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    user_info_fun();
  }, []);

  const { email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();

    user_info_fun(values);
    if (JSON.stringify(response.sigin_info.registered) === "true") {
      history.push("/newcall");
    }
  };

  // let err = JSON.stringify(response.error)

  return (
    <>
      {/* <h1>{sigin_info}</h1> */}
      <div className="form-container sign-in-container">
        <form onSubmit={onSubmit}>
          <h1>Sign in</h1>
          <h1 style={{ color: "red" }}>{JSON.stringify(response.error)}</h1>
          {/* <h1>{sigin_info}</h1> */}
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
          <Router>
            <NavLink to="">Forgot your password?</NavLink>
          </Router>
          <button>Sign In</button>
        </form>
      </div>
    </>
  );
};

// recive
const recive = (state) => {
  console.log("This is SIGNINState ", state.signin);
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
