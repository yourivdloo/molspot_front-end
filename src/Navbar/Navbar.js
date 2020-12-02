import React, {Component} from "react";
import './Navbar.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Navbar extends Component {

    render() {
        return (
            <div>
                <AppBar position="static" className="navbar">
                    <Toolbar>
                        <Typography variant="h6" className="title" id="title">
                            Molspot
                        </Typography>
                        <div className="btn-group">
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu" href="/">
                                Home
                            </Button>
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu"
                                    href="/profile">
                                Profile
                            </Button>
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu"
                                    href="/predictor">
                                Predictor
                            </Button>
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu">
                                Pools
                            </Button>
                            <Button edge="start" className="nav-button" color="inherit" aria-label="menu" href="/admin">
                                Admin page
                            </Button>
                        </div>
                        <div className="login-group">
                            <Button edge="start" color="inherit" aria-label="menu" className="nav-button" href="/login">Log
                                in</Button>
                            <Button edge="start" color="inherit" aria-label="menu" className="nav-button"
                                    href="/register">Register</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;
