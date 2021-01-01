import React,{Component} from "react";
import './Overview.css';
import Button from "@material-ui/core/Button";

class Overview extends Component {

    isLoggedIn(){
        console.log("isLoggedIn navbar function")
        if (localStorage.getItem('creds') != null && localStorage.getItem('creds') != ""){
            console.log("creds are present, loggedIn is true")
            return true;
        }
        return false;
    }


    render() {
        return (
            <div className="content">
                <h1>Welcome to Molspot {this.isLoggedIn() ? localStorage.getItem('username') : ''},</h1>
            <br/>
                <h1>we from Molspot wish you a very good time using our application.</h1>
            </div>
        );
    }
}

export default Overview;


