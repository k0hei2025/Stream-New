import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import NewCall from './NewCall';
import SignUp from './SignUp';
import Home from './home'
import { Fragment } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';


const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(70, 112, 250)'
    },
    secondary: {
      main: '#333333'
    }
  },
  typography: {
    fontFamily: 'Atkinson+Hyperlegible'
    
  }

})
const App = () =>
{

  const app = (
    
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/newcall" component={NewCall} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );

  
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <Fragment>
      <Nav />
       {app}
      </Fragment>
      </Router>
      </ThemeProvider>
  );
};





export default App;
