import React, {Component} from "react";
import './Navbar.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Route , withRouter} from 'react-router-dom';


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    isLoggedIn(){
        console.log("isLoggedIn navbar function")
        if (localStorage.getItem('creds') != null && localStorage.getItem('creds') != ""){
            console.log("creds are present, loggedIn is true")
            return true;
        }
            return false;
    }

    logout(){
        localStorage.clear()
        this.props.history.push('/login')
    }

    navbarAction = url => {
        if (url !== '/logout'){
            this.props.history.push(url)
        } else {
            this.logout()
        }
    }

    async componentDidMount() {
        await this.isLoggedIn()
    }

    render() {
        return (
            <div>
                <AppBar position="static" className="navbar">
                    <Toolbar>
                        <Typography variant="h6" className="title" id="title">
                            Molspot
                        </Typography>
                        <div className="btn-group">
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu" onClick={() => this.navbarAction('/')}>
                                Home
                            </Button>
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu"
                                    onClick={() => this.navbarAction('/predictor')}>
                                Predictor
                            </Button>
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu">
                                Pools
                            </Button>
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu" onClick={() => this.navbarAction('/admin')}>
                                Admin page
                            </Button>
                        </div>
                            {this.isLoggedIn() ?
                                <div className="login-group">
                                <Button edge="start" color="inherit" aria-label="menu" className="nav-button" href="/login"
                                onClick={() => this.navbarAction('/logout')}>Log out</Button>
                                </div>
                                :
                                    <div className="login-group">
                                <Button edge="start" color="inherit" aria-label="menu" className="nav-button"
                                        onClick={() => this.navbarAction('/login')}>Log
                                    in</Button>
                                <Button edge="start" color="inherit" aria-label="menu" className="nav-button"
                                        onClick={() => this.navbarAction('/register')}>Register</Button>
                                    </div>
                            }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter (Navbar)
