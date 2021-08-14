<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import Nav from "./Components/Nav";
=======
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
>>>>>>> 9b7f6f871ea22aeb813347ad5a8dc2d56be68d40
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
<<<<<<< HEAD
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
=======
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
>>>>>>> 9b7f6f871ea22aeb813347ad5a8dc2d56be68d40
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
