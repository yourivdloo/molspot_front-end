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
    fetch('http://localhost:8080/candidates?id=')
        .then(response => response.json())
        .then(result => {
            this.setState({candidates:result});
        })
}

    render() {
        return (
            <div>
                <div className="header-box">
                    <h1 className="header">Requests</h1>
                </div>

                <div className="">
                    <div className="left">
                     <Button variant="contained" className="button" onClick={() => this.getAllCandidates()}>Get all candidates</Button>
                  </div>

                  <div className="right">
                      <div>
                          <Button variant="contained" className="button" onClick={() => this.getCandidateById()}>Get candidate by id</Button>
                        </div>

                       <div>
                       <TextField variant="outlined" size="small" label="Id" className="input-field"></TextField>
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
