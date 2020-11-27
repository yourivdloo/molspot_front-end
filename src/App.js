import React from 'react';
import './App.css';
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import Overview from "./Overview/Overview";
import Profile from "./Profile/Profile";
import Predictor from "./Predictor/Predictor";
import Admin from "./Admin/Admin";

function App() {
  return (
    <div className="App">
        <Router>
        <Navbar/>
        <Switch>
            <Route exact from="/" component={Overview}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/predictor" component={Predictor}/>
            <Route exact path="/admin" component={Admin}/>
            <Route component={NotFound}/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
