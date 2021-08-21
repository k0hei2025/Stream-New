

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.css';
// import Navbar from './componentsPragya/Navbar';
// import Home from './componentsPragya/pages/HomePage/Home';
// import Newcall from './componentsPragya/pages/Newcall';
//  import { useEffect } from "react";
//   import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
//    import LoginPage from "./LoginPage/LoginPage";
//     import Dashboard from "./Dashboard/Dashboard";
//     import Board from "./screens/whiteboard/Board";
//     import Auth from "./screens/auth/Auth";
// import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './componentsPragya/Navbar';
import Home from './componentsPragya/pages/HomePage/Home';
import Newcall from './componentsPragya/pages/Newcall';
import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
  import { useEffect } from "react";
    import Dashboard from "./Dashboard/Dashboard";
 import LoginPage from "./LoginPage/LoginPage";
 import Auth from "./screens/auth/Auth";
import React, { useState } from 'react';

// =======
// import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
// import Dashboard from "./Dashboard/Dashboard";
// import LoginPage from "./LoginPage/LoginPage";
// // import Signup from "./screens/auth/Signup";
// import Home from "./Components/home";
// import NewCall from "./Components/NewCall";
// import Auth from "./screens/auth/Auth";
// import Board from "./screens/whiteboard/Board";
// >>>>>>> 461da3d289ae86b45333c75c4d485f274f0f3c2c

function App() {
  useEffect(() => {
    connectWithWebSocket();
  }, []);
  const [show, setShow] = useState(true);
  return (
    <Router>
      

      {/*<Navbar open={show}/>*/}
     {/* <Route path="/auth" component={Auth} exact={true} strict></Route> 
       <Route path="/board" component={Container} exact={true} strict></Route> */}

    
      {/* <Route path="/auth" component={Auth} exact={true} strict></Route>
      <Route path="/board" component={Board} exact={true} strict></Route> */}

<Route
        path="/dashboard"
        component={Dashboard}
        exact={true}
        strict
      ></Route> 

       <Route path="/join" component={LoginPage}  ></Route>  
       <div>
      <Route path="/" component={Home} exact={true} strict></Route>
      <Route path="/newcall" component={Newcall} exact={true} strict></Route>
        <Route path="/auth" component={Auth} exact={true} strict></Route>
        </div>
              
    </Router>
    
  );
}


 export default App;


// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.css';
// import Navbar from './componentsPragya/Navbar';
// import Home from './componentsPragya/pages/HomePage/Home';
// import Newcall from './componentsPragya/pages/Newcall';

