import './App.css';
import React from 'react';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import NewCall from './Components/NewCall';
import SignUp from './Components/SignUp';
import Home from './Components/home'
import { Fragment } from 'react';

const App = () =>
{

  let app = (
   
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/newcall" exact component={NewCall} />
      <Route path="/signup" exact component={SignUp} />
    </Switch>
   
  );

  
  return (

    <div className="App">
  
      <Nav/>
       {app}
      </div>
   
      
  );
};





export default App;
