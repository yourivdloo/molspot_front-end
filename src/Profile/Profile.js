import React, {Component} from "react";
import './Profile.css';
import Button from "@material-ui/core/Button";

class Profile extends Component {
    render() {
        return (
            <div className="content">
                <h1>{localStorage.getItem('username')}</h1>
            </div>
        );
    }
}

export default Profile;


