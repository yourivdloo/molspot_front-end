import React,{Component} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './Request.css';

class Request extends Component {

constructor(props) {
    super(props);
    this.state = {
        candidates:[]
    }
}

getAllCandidates() {
    fetch('http://localhost:8080/candidates')
        .then(response => response.json()).then(
            result => {
                this.setState({candidates:result});
            })
}

getCandidateById() {
    fetch('http://localhost:8080/candidates/'+document.getElementById('id').value)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            console.log(this.state.candidates)
            this.setState({candidates: [result]})
            console.log(this.state.candidates);
        })

}

createNewCandidate() {
    fetch('http://localhost:8080/candidates/new?name='+document.getElementById('name').value, {method: 'POST'})
}

eliminateCandidate() {
    fetch('http://localhost:8080/candidates/'+document.getElementById('eliminationId').value+'?isEliminated=true', {method: 'PUT'})
}

reviveCandidate() {
    fetch('http://localhost:8080/candidates/'+document.getElementById('reviveId').value+'?isEliminated=false', {method: 'PUT'})
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
                          <TextField variant="outlined" size="small" label="Id" className="input-field" id="id"/>
                      </div>
                    </div>

                    <div className="block">
                        <Button variant="contained" className="button" onClick={() => this.createNewCandidate()}>Create candidate</Button>

                        <div>
                            <TextField variant="outlined" size="small" label="Name" className="input-field" id="name"/>
                        </div>
                    </div>

                    <div className="block">
                        <div>
                            <Button variant="contained" className="button" onClick={() => this.eliminateCandidate()}>Eliminate candidate by id</Button>
                        </div>

                        <div>
                            <TextField variant="outlined" size="small" label="Id" className="input-field" id="eliminationId"/>
                        </div>
                    </div>

                    <div className="block">
                        <div>
                            <Button variant="contained" className="button" onClick={() => this.reviveCandidate()}>Revive candidate by id</Button>
                        </div>

                        <div>
                            <TextField variant="outlined" size="small" label="Id" className="input-field" id="reviveId"/>
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

export default Request;
