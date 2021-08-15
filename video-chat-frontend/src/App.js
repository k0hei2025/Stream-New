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
import Board from "./screens/whiteboard/Board";

function App() {
  useEffect(() => {
    connectWithWebSocket();
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
      <Route path="/board" component={Board} exact={true} strict></Route>

      <Route
        path="/dashboard"
        component={Dashboard}
        exact={true}
        strict
      ></Route>
      <Route path="/join" component={LoginPage} exact={true} strict></Route>
      <Route path="/" component={Home} exact={true} strict></Route>
      <Route path="/newcall" component={NewCall} exact={true} strict></Route>
    </Router>
  );
}

export default App;
