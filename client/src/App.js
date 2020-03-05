import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Landing from "./Components/Landing";
import Score from "./Components/Score";
import MyFaceComponent from './Components/MyFaceComponent';
import List from './Components/List';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={MyFaceComponent} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/scores" exact component={Score} />
          <Route path="/list" exact component={List} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
