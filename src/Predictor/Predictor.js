import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import './Predictor.css';

class Predictor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            user: Object
        }
    }

    getCandidates(){
        fetch('http://localhost:8080/candidates')
            .then(response => response.json()).then(
            result => {
                this.setState({candidates:result});
            })
    }

    submitPoints(userId, candidateId, amount){
        fetch('http://localhost:8080/suspicions/new?userId='+userId+'&candidateId='+candidateId+'&amount='+amount)
    }

    componentDidMount() {
        this.getCandidates();
    }


    render() {
        return (
            <div>
                <div className="points">
                    <h1>
                        Your points <br></br>
                        200
                    </h1>
                </div>
                <div>
                {this.state.candidates.map(can=> {
                        return can.isEliminated ?
                            <div className="candidate"><h2 className="eliminated">{can.name}</h2> <Input disabled="true" inputProps={{step: 1, min: 0, max: 100, type: 'number'}}/></div>
                            :
                            <div className="candidate"><h2>{can.name}</h2> <Input color="primary" value="0" inputProps={{step: 1, min: 0, max: 100, type: 'number'}}/></div>
                    }
                )}
                </div>
                <Button variant="contained" className="button" onClick={() => this.submitPoints()}>Submit points</Button>
            </div>
        );
    }
}

export default Predictor;
