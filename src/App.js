


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './componentsPragya/Navbar';
import Homes from './componentsPragya/pages/HomePage/Home';
import Newcall from './componentsPragya/pages/Newcall';
import { useEffect } from "react";


import Authentication from './Authentication/signup'
import React, { useState } from 'react';
import Video from './Video'
import { Home } from './Home'
function App() {






  return (

    <Router>



      <Navbar />

      <Route path="/" component={Homes} exact={true} strict></Route>
      <Route path="/newcall" component={Newcall} exact={true} strict></Route>
      <Route path="/auth" component={Authentication} exact={true} strict></Route>

      <Route path="/join" exact={true} component={Home} ></Route>

      <Route path="/join/:url" component={Video} exact={true}></Route>


    </Router>



  );
}

export default App;


