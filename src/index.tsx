import React from 'react';
import { render } from 'react-dom';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HeartBeat from './Heartbeat';


render(
  <React.Fragment>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heartbeat" element={<HeartBeat />} />
      </Routes>
    </Router>
  </React.Fragment>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
