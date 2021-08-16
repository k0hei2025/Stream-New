// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
// import Dashboard from "./Dashboard/Dashboard";
// import LoginPage from "./LoginPage/LoginPage";
// // import Signup from "./screens/auth/Signup";
// import Home from "./componentsPragya/pages/HomePage/Home";
// import NewCall from "./componentsPragya/pages/Newcall";
// import Auth from "./screens/auth/Auth";
// import Navbar from './componentsPragya/Navbar';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './componentsPragya/Navbar';
import Home from './componentsPragya/pages/HomePage/Home';
import Newcall from './componentsPragya/pages/Newcall';
 import { useEffect } from "react";
  import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
   import LoginPage from "./LoginPage/LoginPage";
    import Dashboard from "./Dashboard/Dashboard";
// import './App.css';



function App() {
  useEffect(() => {
    connectWithWebSocket();
  }, []);
  return (
    <Router>
         <Navbar />
     {/* <Route path="/auth" component={Auth} exact={true} strict></Route> */}
      {/* <Route path="/board" component={Container} exact={true} strict></Route> */}

      <Route
        path="/dashboard"
        component={Dashboard}
        exact={true}
        strict
      ></Route>
       <Route path="/join" component={LoginPage}  ></Route> 
      <Route path="/" component={Home} exact={true} strict></Route>
      <Route path="/newcall" component={Newcall} exact={true} strict></Route>
    </Router>
  );
}k

 export default App;


// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.css';
// import Navbar from './componentsPragya/Navbar';
// import Home from './componentsPragya/pages/HomePage/Home';
// import Newcall from './componentsPragya/pages/Newcall';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Switch>
//         <Route path='/' exact component={Home} />
//         <Route path='/newcall'  component={Newcall} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;
