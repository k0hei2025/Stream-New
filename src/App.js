import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home';
import Newcall from './components/pages/Newcall';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/newcall'  component={Newcall} />
      </Switch>
    </Router>
  );
}

export default App;
