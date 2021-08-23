import React, { useState, useEffect, useRef } from "react";
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


  const emailRef = useState();
  const passRef = useState();


  const { email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  const history = useHistory();
  // let data = JSON.stringify(response.sigin_info.registered);

  const onSubmit = async (event) => {
    event.preventDefault();

    user_info_fun(values);

    // if (data === true) {
    return await history.push("/newcall");
    // }
  };

  // let err = JSON.stringify(response.error)


  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    console.log(email, password);

    if (password.length > 8) {
      console.log('password is valid');
      const data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEPyDFaklwGS8C3zUVG1I_8-6WtJk6rFM`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          'Content- Type': 'application/json'
        }
      })

      const resData = await data.json();
      console.log(resData);


    }
  }











  return (
    <>
      {/* <h1>{sigin_info}</h1> */}
      <div className="form-container sign-in-container">

        <form onSubmit={onSubmit}>
          <h1>Sign in</h1>
          <h1>{JSON.stringify(response.sigin_info.registered)}</h1>

          <input
            type="emil"
            placeholder="Email"
            value={email}
            ref={emailRef}
            onChange={handleChange("email")}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            ref={passRef}
            onChange={handleChange("password")}
            required
          />


          <Router>
            <NavLink to="">Forgot your password?</NavLink>
          </Router>

          <input type='submit' onClick={submitHandler} />

        </form>
      </div>
    </>
  );
};

// recive


export default Sigin;
