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
        }
    }

    baseUrl = "http://localhost:8080"

    getAllCandidates() {
        axios.get(this.baseUrl + '/candidates', {
            headers: {
                authorization: "Basic " + localStorage.getItem('creds'),
                withCredentials: true
            }
        })
            .then(
                result => {
                    this.setState({candidates: result.data});
                })
    }

    getUserById() {
        axios.get(this.baseUrl + '/users/' + localStorage.getItem('id'), {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        })
            .then(
                result => {
                    if (result!=null) {
                        this.setState({user: result.data});
                    }
                })
    }

    submitPoints(userId, candidateId, amount) {
        axios.post(this.baseUrl + '/suspicions/new?userId=' + userId + '&candidateId=' + candidateId + '&amount=' + amount,null, {
            headers: {authorization: "Basic " + localStorage.getItem('creds'), withCredentials: true}
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
                        {this.state.user.points}
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
