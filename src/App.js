import React from 'react';
import './App.css';
import Request from "./Request/Request";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import Overview from "./Overview/Overview";
import Profile from "./Profile/Profile";

function App() {
  return (
    <div className="App">
        <Router>
        <Navbar/>
        <Switch>
            <Route exact from="/" component={Overview}/>
            <Route exact path="/request" component={Request}/>
            <Route exact path="/profile" component={Profile}></Route>
            <Route component={NotFound}/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
