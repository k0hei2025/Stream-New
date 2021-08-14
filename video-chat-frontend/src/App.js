<<<<<<< HEAD
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./LoginPage/LoginPage";
// import Signup from "./screens/auth/Signup";
import Home from "./Components/home";
import NewCall from "./Components/NewCall";
import Auth from "./screens/auth/Auth";
=======
import './App.css';
import {BrowserRouter as Router,
Switch,
Route
} from 'react-router-dom';
import {useEffect} from 'react';
import {connectWithWebSocket} from './utils/wssConnection/wssConnection';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';
>>>>>>> 9b7f6f871ea22aeb813347ad5a8dc2d56be68d40

function App() {
  useEffect(() => {
    connectWithWebSocket();
<<<<<<< HEAD
  }, []);
  return (
    <Router>
      {/* <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route> */}
      {/* </Switch> */}

      <Route path="/auth" component={Auth} exact={true} strict></Route>
      {/* <Route path="/board" component={Container} exact={true} strict></Route> */}

      <Route
        path="/dashboard"
        component={Dashboard}
        exact={true}
        strict
      ></Route>
      <Route path="/join" component={LoginPage} exact={true} strict></Route>
      <Route path="/" component={Home} exact={true} strict></Route>
      <Route path="/newcall" component={NewCall} exact={true} strict></Route>
=======
  },[]);
  return (
    <Router>
      <Switch>
        <Route path='/dashboard'>
          <Dashboard/>
        </Route>
        <Route path='/'>
          <LoginPage/>
        </Route>
      </Switch>
>>>>>>> 9b7f6f871ea22aeb813347ad5a8dc2d56be68d40
    </Router>
  );
}

export default App;
