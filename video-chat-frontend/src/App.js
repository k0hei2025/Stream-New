import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./LoginPage/LoginPage";
import Signup from "./screens/auth/Signup";
import Home from "./Components/home";
import NewCall from './Components/NewCall';

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

      <Route path="/auth" component={Signup} exact={true} strict></Route>
      <Route
        path="/dashboard"
        component={Dashboard}
        exact={true}
        strict
      ></Route>
      {/* <Route path="/" component={LoginPage} exact={true} strict></Route> */}
      <Route path="/" component={Home} exact={true} strict></Route>
      <Route path="/newcall" component={NewCall} exact={true} strict></Route>
    </Router>
  );
}

export default App;
