import React, {Component} from "react";
import './Profile.css';

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


