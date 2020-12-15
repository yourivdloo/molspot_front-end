import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import './Admin.css';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            user: Object
        }
    }

    localhost = "http://localhost:8080"
    username = "superpim"
    password = "voetbalman5"

    getAllCandidates() {
        axios.get(this.localhost + '/candidates', {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        }).then(
            result => {
                this.setState({candidates: result.data});
            })
    }

    getCandidateById() {
        axios.get(this.localhost + '/candidates/' + document.getElementById('id').value, {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        })
            .then(result => {
                this.setState({candidates: [result.data]})
            })

    }

    async createNewCandidate() {
        await axios.post(this.localhost + '/candidates/new?name=' + document.getElementById('name').value,null, {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        })
        this.getAllCandidates();
    }

    async eliminateCandidate(id) {
        await axios.put(this.localhost + '/candidates/' + id + '?isEliminated=true',null, {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        })
        this.getAllCandidates();
    }

    async reviveCandidate(id) {
        await axios.put(this.localhost + '/candidates/' + id + '?isEliminated=false',null, {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        })
        this.getAllCandidates()
    }

    componentDidMount() {
        this.getAllCandidates();
    }


    render() {
        return (
            <div className="content">

                <div className="adminbtn-group">
                    <Card className="card" variant="outlined">
                        <CardContent>
                        <Button variant="contained" className="button" onClick={() => this.createNewCandidate()}>Create
                            candidate</Button>

                        <div>
                            <TextField variant="outlined" size="small" label="Name" className="input-field"
                                       id="name"></TextField>
                        </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="cards">
                    {this.state.candidates.map(can => {
                        return can.isEliminated ?
                            <Card className="card" variant="outlined">
                                <CardContent>
                                    <Typography variant="h5">{can.name}</Typography>
                                    <Typography variant="subtitle1" color="secondary">Eliminated</Typography><br/>
                                    <Button color="primary" variant="contained"
                                            onClick={() => this.reviveCandidate(can.id)}>Revive</Button>
                                </CardContent>
                            </Card>
                            :
                            <Card className="card" variant="outlined">
                                <CardContent>
                                    <Typography variant="h5">{can.name}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">Alive</Typography><br/>
                                    <Button id={can.id} color="secondary" variant="contained"
                                            onClick={() => this.eliminateCandidate(can.id)}>Eliminate</Button>
                                </CardContent>
                            </Card>
                    })
                    }
                </div>
            </div>
        );
    }
}

export default Admin;
