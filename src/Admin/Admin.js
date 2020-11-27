import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import './Admin.css';
import axios from "axios";
import TextField from "@material-ui/core/TextField";

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

    getAllCandidates(){
        fetch(this.localhost+'/candidates', {headers: {authorization: "Basic " + window.btoa(this.username +":"+ this.password), withCredentials: true}})
            .then(response => response.json()).then(
            result => {
                this.setState({candidates:result});
            })
    }

    getCandidateById() {
        fetch(this.localhost+'/candidates/'+document.getElementById('id').value, {headers: {authorization: "Basic " + window.btoa(this.username +":"+ this.password), withCredentials: true}})
            .then(response => response.json())
            .then(result => {
                console.log(result)
                console.log(this.state.candidates)
                this.setState({candidates: [result]})
                console.log(this.state.candidates);
            })

    }

    createNewCandidate() {
        fetch(this.localhost+'/candidates/new?name='+document.getElementById('name').value, {method: 'POST', headers: {authorization: "Basic " + window.btoa(this.username +":"+ this.password), withCredentials: true}})
    }

    eliminateCandidate() {
        fetch(this.localhost+'/candidates/'+document.getElementById('eliminationId').value+'?isEliminated=true', {method: 'PUT', headers: {authorization: "Basic " + window.btoa(this.username +":"+ this.password), withCredentials: true}})
    }

    reviveCandidate() {
        fetch(this.localhost+'/candidates/'+document.getElementById('reviveId').value+'?isEliminated=false', {method: 'PUT', headers: {authorization: "Basic " + window.btoa(this.username +":"+ this.password), withCredentials: true}})
    }

    componentDidMount() {
        this.getAllCandidates();
    }


    render() {
        return (
            <div className="content">

                <div className="btn-group">
                    <div className="block">
                        <Button variant="contained" className="button" onClick={() => this.getAllCandidates()}>Get all candidates</Button>
                    </div>

                    <div className="block">
                        <div>
                            <Button variant="contained" className="button" onClick={() => this.getCandidateById()}>Get candidate by id</Button>
                        </div>

                        <div>
                            <TextField variant="outlined" size="small" label="Id" className="input-field" id="id"></TextField>
                        </div>
                    </div>

                    <div className="block">
                        <Button variant="contained" className="button" onClick={() => this.createNewCandidate()}>Create candidate</Button>

                        <div>
                            <TextField variant="outlined" size="small" label="Name" className="input-field" id="name"></TextField>
                        </div>
                    </div>

                    <div className="block">
                        <div>
                            <Button variant="contained" className="button" onClick={() => this.eliminateCandidate()}>Eliminate candidate by id</Button>
                        </div>

                        <div>
                            <TextField variant="outlined" size="small" label="Id" className="input-field" id="eliminationId"></TextField>
                        </div>
                    </div>

                    <div className="block">
                        <div>
                            <Button variant="contained" className="button" onClick={() => this.reviveCandidate()}>Revive candidate by id</Button>
                        </div>

                        <div>
                            <TextField variant="outlined" size="small" label="Id" className="input-field" id="reviveId"></TextField>
                        </div>
                    </div>
                </div>

                <div className="top-padding">
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>IsEliminated</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.candidates.map(can=>(
                            <tr key={can.id}>
                                <td>{can.id}</td>
                                <td>{can.name}</td>
                                <td>{can.isEliminated.toString()}</td>
                            </tr>

                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Admin;
