import React from 'react';
import './App.css';
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import Overview from "./Overview/Overview";
import Predictor from "./Predictor/Predictor";
import Admin from "./Admin/Admin";
import Login from "./Login/Login";
import Register from "./Register/Register";

function App() {
  return (
    <div className="App">
        <Router>
        <Navbar/>
        <Switch>
            <Route exact from="/" component={Overview}/>
            <Route exact path="/predictor" component={Predictor}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route component={NotFound}/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
