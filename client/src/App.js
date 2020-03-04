import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Landing from "./Components/Landing";
import Score from "./Components/Score";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/scores" exact component={Score} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
