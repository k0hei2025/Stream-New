


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './componentsPragya/Navbar';
import Home from './componentsPragya/pages/HomePage/Home';
import Newcall from './componentsPragya/pages/Newcall';
  import { useEffect } from "react";

 import Auth from "./screens/auth/Auth";
import React, { useState } from 'react';
import Video from './Video'
import JoinStart from './Home'
function App() {
 
  const [navState , setNav] = useState();



  
  
  return (
     
       <Router>
 
        
  
        <Navbar />

      <Route path="/" component={Home} exact={true} strict></Route>
      <Route path="/newcall" component={Newcall} exact={true} strict></Route>
        <Route path="/auth" component={Auth} exact={true} strict></Route>
     
        <Route path="/join" exact={true} component={JoinStart} ></Route>
      
       <Route path="/:url" component={Video} exact={true}></Route>
     
       
       </Router>
 

    
  );
}


 export default App;


