import React,{Component} from "react";
import './Overview.css';

class Overview extends Component {

    isLoggedIn(){
        if (localStorage.getItem('creds') != null && localStorage.getItem('creds') != ""){
            return true;
        }
        return false;
    }


    render() {
        return (
            <div className="content">
                <h1>Welcome to Molspot {this.isLoggedIn() ? localStorage.getItem('username').toString() : ''},</h1>
            <br/>
                {this.isLoggedIn() ?
                    <h1>we from Molspot wish you a very good time using our application.</h1>
                    :
                    <h1>Before we start, try to login.<br/> If you don't have an account consider creating one! :D</h1>
                }
            </div>
        );
    }
}

export default Overview;


