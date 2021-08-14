import Sigin from "./Sigin";
import React, { useState } from "react";
import "./css/signup.css";

import Signup from "./Signup";

const Auth = ({ user_info_fun, response }) => {
  const [ghostSignup, setGhostSignup] = useState();

  const ghostSignUpFun = () => {
    setGhostSignup("right-panel-active");
  };

  const ghostSigninFun = () => {
    setGhostSignup("");
  };

  return (
    <>
      <div className={`container ${ghostSignup} `} id="container">
        {/* SignUp Starts from */}

        <Signup />
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
    </>
  );
};

export default Auth;
