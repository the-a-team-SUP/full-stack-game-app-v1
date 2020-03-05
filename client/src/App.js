import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Landing from "./components/Landing";
import Score from "./components/Score";

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
