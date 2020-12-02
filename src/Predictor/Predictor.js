import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import './Predictor.css';
import axios from "axios";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class Predictor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            user: Object,
            userIsPresent: Boolean
        }
    }

    localhost = "http://localhost:8080"
    username = "superpim"
    password = "voetbalman5"

    getAllCandidates() {
        fetch(this.localhost + '/candidates', {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        })
            .then(response => response.json()).then(
            result => {
                this.setState({candidates: result});
            })
    }

    getUserById(id) {
        fetch(this.localhost + '/users/' + id, {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        })
            .then(response => response.json()).then(
            result => {
                if (result != null) {
                    this.setState({user: result, userIsPresent: true});
                }
                this.setState({userIsPresent: false});
            })
    }

    submitPoints(userId, candidateId, amount) {
        fetch(this.localhost + '/suspicions/new?userId=' + userId + '&candidateId=' + candidateId + '&amount=' + amount, {
            method: 'POST',
            headers: {authorization: "Basic " + window.btoa(this.username + ":" + this.password), withCredentials: true}
        })
    }

    componentDidMount() {
        this.getAllCandidates();
        this.getUserById();
    }


    render() {
        return (
            <div>
                <div className="points">
                    <h1>
                        Your points <br></br>
                        {this.state.userIsPresent ? this.state.user.points : 200}
                    </h1>
                </div>
                <div>
                    {this.state.candidates.map(can => {
                            return can.isEliminated ?
                                <Card className="candidate">
                                    <CardContent>
                                        <Typography className="eliminated" variant="h5">{can.name}</Typography>
                                        <Input disabled="true" inputProps={{step: 1, min: 0, max: 100, type: 'number'}}/>
                                    </CardContent>
                                </Card>
                                :
                                <Card className="candidate">
                                    <CardContent>
                                        <Typography variant="h5">{can.name}</Typography>
                                        <Input color="primary" placeholder="0"
                                               inputProps={{step: 1, min: 0, max: 100, type: 'number'}}/>
                                    </CardContent>
                                </Card>
                        }
                    )}
                </div>
                <Button variant="contained" className="button" onClick={() => this.submitPoints()}>Submit
                    points</Button>
            </div>
        );
    }
}

export default Predictor;
