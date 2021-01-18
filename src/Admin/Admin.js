import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import './Admin.css';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            episodes: [],
        }
    }

    baseUrl = "http://localhost:8080"

    isCandidatesEmpty() {
        if (this.state.candidates.length == 0) {
            return true
        }
        return false
    }

    isEpisodesEmpty() {
        if (this.state.episodes.length == 0) {
            return true
        }
        return false
    }

    getAllCandidates() {
        axios.get(this.baseUrl + '/candidates', {
            headers: {
                authorization: "Basic " + localStorage.getItem('creds'),
                withCredentials: true
            }
        }).then(
            result => {
                this.setState({candidates: result.data});
            }).catch((e) => {
                if (e.response == null) {
                    this.setState({episodes: []})
                    this.props.history.push('/notfound')
                } else {
                    if (e.response.status == '404') {
                        this.setState({candidates: []})
                    }
                }
            }
        )
    }

    getCandidateById() {
        axios.get(this.baseUrl + '/candidates/' + document.getElementById('id').value, {
            headers: {
                authorization: "Basic " + window.btoa(this.username + ":" + this.password),
                withCredentials: true
            }
        })
            .then(result => {
                this.setState({candidate: result.data})
            })

    }

    async createNewCandidate() {
        await axios.post(this.baseUrl + '/candidates/new?name=' + document.getElementById('name').value, null, {
            headers: {
                authorization: "Basic " + localStorage.getItem('creds'),
                withCredentials: true
            }
        })
        this.getAllCandidates();
    }

    async eliminateCandidate(id) {
        await axios.put(this.baseUrl + '/candidates/' + id + '?isEliminated=true', null, {
            headers: {
                authorization: "Basic " + localStorage.getItem('creds'),
                withCredentials: true
            }
        })
        this.getAllCandidates();
    }

    async reviveCandidate(id) {
        await axios.put(this.baseUrl + '/candidates/' + id + '?isEliminated=false', null, {
            headers: {
                authorization: "Basic " + localStorage.getItem('creds'),
                withCredentials: true
            }
        })
        this.getAllCandidates()
    }

    async deleteCandidate(id) {
        var r = window.confirm("Are you sure you want to delete this candidate?")
        if (r) {
            await axios.delete(this.baseUrl + '/candidates/' + id, {
                headers: {
                    authorization: "Basic " + localStorage.getItem('creds'),
                    withCredentials: true
                }
            })
            this.getAllCandidates()
        }
    }

    async getAllEpisodes() {
        axios.get(this.baseUrl + '/episodes', {
            headers: {
                authorization: "Basic " + localStorage.getItem('creds'),
                withCredentials: true
            }
        }).then(
            result => {
                this.setState({episodes: result.data});
            }).catch((e) => {
                if (e.response == null) {
                    this.setState({episodes: []})
                    this.props.history.push('/notfound')
                } else {
                    if (e.response.status == '404') {
                        this.setState({episodes: []})
                    }
                }
            }
        )
    }

    async createNewEpisode() {
        await axios.post(this.baseUrl + '/episodes/new?startDate=' + document.getElementById('startDate').value, null, {
            headers: {
                authorization: "Basic " + localStorage.getItem('creds'),
                withCredentials: true
            }
        })
        this.getAllEpisodes()
    }

    async endEpisode(id) {
        var r = window.confirm("Are you sure you want to end this episode")
        if (r) {
            //await axios.put(this.baseUrl + '/episodes/' + id + '?hasEnded=true', null, {
            await axios.put(this.baseUrl + '/episodes/' + id + '/end', null, {
                headers: {
                    authorization: "Basic " + localStorage.getItem('creds'),
                    withCredentials: true
                }
            })
            this.getAllEpisodes()
        }
    }

    async deleteEpisode(id) {
        var r = window.confirm("Are you sure you want to delete this episode?")
        if (r) {
            await axios.delete(this.baseUrl + '/episodes/' + id, {
                headers: {
                    authorization: "Basic " + localStorage.getItem('creds'),
                    withCredentials: true
                }
            })
            this.getAllEpisodes()
        }
    }

    componentDidMount() {
        this.getAllCandidates();
        this.getAllEpisodes();
    }


    render() {
        return (
            <div className="content">

                <div className="adminbtn-group">
                    <Card className="card" variant="outlined">
                        <CardContent>
                            <Button variant="contained" className="button" onClick={() => this.createNewCandidate()}>Create
                                candidate
                            </Button>

                            <div>
                                <TextField variant="outlined" size="small" label="Name" className="input-field"
                                           id="name"></TextField>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="card" variant="outlined">
                        <CardContent>
                            <Button variant="contained" className="button" onClick={() => this.createNewEpisode()}>Create
                                episode
                            </Button>

                            <div>
                                <TextField
                                    id="startDate"
                                    label="Start date"
                                    type="datetime-local"
                                    defaultValue="2021-02-25T20:30"
                                    className="input-field"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <Typography variant="h4">Candidates</Typography>
                <div className="cards">
                    {this.isCandidatesEmpty() ?
                        <div><Typography variant="h5">There are no candidates yet</Typography></div> :
                        <div>
                            {

                                this.state.candidates.map(can => {
                                    return can.isEliminated ?
                                        <Card className="card" variant="outlined">
                                            <CardContent>
                                                <Typography variant="h5">{can.name}</Typography>
                                                <Typography variant="subtitle1"
                                                            color="secondary">Eliminated</Typography><br/>
                                                <Button color="primary" variant="contained"
                                                        onClick={() => this.reviveCandidate(can.id)}>Revive
                                                </Button>
                                                <div>
                                                    <Button className="delete"
                                                            onClick={() => this.deleteCandidate(can.id)}>
                                                        <DeleteIcon fontSize="large" color="secondary"></DeleteIcon>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        :
                                        <Card className="card" variant="outlined">
                                            <CardContent>
                                                <Typography variant="h5">{can.name}</Typography>
                                                <Typography variant="subtitle1"
                                                            color="textSecondary">Alive</Typography><br/>
                                                <Button id={can.id} color="secondary" variant="contained"
                                                        onClick={() => this.eliminateCandidate(can.id)}>Eliminate
                                                </Button>
                                                <div>
                                                    <Button className="delete"
                                                            onClick={() => this.deleteCandidate(can.id)}>
                                                        <DeleteIcon fontSize="large" color="secondary"></DeleteIcon>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                })
                            }
                        </div>
                    }
                </div>

                <Typography variant="h4">Episodes</Typography>
                <div className="cards">
                    {this.isEpisodesEmpty() ?
                        <div><Typography variant="h5" color="secondary">There are no episodes yet</Typography></div> :
                        <div>
                            {this.state.episodes.map(e => {
                                return e.hasEnded ?
                                    <Card className="card" variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5">{e.startDate}</Typography>
                                            <Typography variant="subtitle1" color="secondary">ended</Typography><br/>
                                            {/*<Button color="primary" variant="contained"*/}
                                            {/*        onClick={() => this.endEpisode(e.id)}>End</Button>*/}
                                            <div>
                                                <Button className="delete" onClick={() => this.deleteEpisode(e.id)}>
                                                    <DeleteIcon fontSize="large" color="secondary"></DeleteIcon>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    :
                                    <Card className="card" variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5">{e.startDate}</Typography>
                                            <Typography variant="subtitle1" color="textSecondary">not
                                                ended</Typography><br/>
                                            <Button id={e.id} color="secondary" variant="contained"
                                                    onClick={() => this.endEpisode(e.id)}>End
                                            </Button>
                                            <div>
                                                <Button className="delete" onClick={() => this.deleteEpisode(e.id)}>
                                                    <DeleteIcon fontSize="large" color="secondary"></DeleteIcon>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                            })
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Admin;
