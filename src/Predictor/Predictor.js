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
            suspicions: [],
            first: Boolean,
            availablePoints: 0,
            msg: "",
        }
    }

    baseUrl = "http://localhost:8080"

    async getAllCandidates() {
        await axios.get(this.baseUrl + '/candidates', {
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

    async getUserById() {
        await axios.get(this.baseUrl + '/users/' + localStorage.getItem('id'), {
            headers: {
                authorization: "Basic " + localStorage.getItem("creds"),
                withCredentials: true
            }
        })
            .then(
                result => {
                    if (result != null) {
                        this.setState({user: result.data, availablePoints: result.data});
                    }
                })
    }

    async getSuspicionsByUser() {
        await axios.get(this.baseUrl + '/suspicions/' + localStorage.getItem('id'), {
            headers: {
                authorization: "Basic " + localStorage.getItem('creds'),
                withCredentials: true
            }
        })
            .then(
                result => {
                    this.setState({suspicions: result.data});
                    if (this.state.suspicions.length !== 0) {
                        this.setState({first: false})
                    }
                })
    }

    async resetUserPoints(points) {
        await axios.put(this.baseUrl + '/users/' + this.state.user.id + '?points=' + points, null, {
            headers: {authorization: "Basic " + localStorage.getItem('creds'), withCredentials: true}
        })
    }

    async validateSubmission() {
        let newSusSum = 0;
        console.log(this.state.candidates)
        for(var i=0;i<this.state.candidates.length;i++){
            var el = document.getElementById(this.state.candidates[i].id)
            if(el != null && el!= undefined){
                if(el.value != null && typeof(el.value) != typeof(string)){
                    console.log(el.value)
                    newSusSum = newSusSum + parseInt(el.value)
                }
            }
        }
        var points = this.calculateTotalPoints()
        var susSum = points - this.state.user.points;
        console.log("points "+points+" : oldSusAmount "+susSum);
        console.log("newSusAmount: "+newSusSum)
        if (newSusSum <= points) {
             var result = await this.resetUserPoints(points);
             await this.submitPoints();
        } else{
            this.setState({msg: "Oops, you have added way too many points!"})
            document.getElementById("msg").classList.add("eliminated")
        }
    }

    async submitPoints() {
        document.getElementById("msg").classList.add("eliminated")
        this.setState({msg: "Saving..."})
        if (this.state.first) {
            for (var i = 0; i < this.state.candidates.length; i++) {
                if (!this.state.candidates[i].isEliminated) {
                    var candidateId = this.state.candidates[i].id
                    console.log("canID: "+candidateId)
                    var amount = document.getElementById(this.state.candidates[i].id).value
                    console.log("amount: "+amount)
                    await axios.post(this.baseUrl + '/suspicions/new?userId=' + localStorage.getItem('id') + '&candidateId=' + candidateId + '&amount=' + amount, null, {
                        headers: {
                            authorization: "Basic " + localStorage.getItem('creds'),
                            withCredentials: true
                        }
                    }).then(
                        result => {
                            if (i == this.state.candidates.length-1){
                                this.setState({msg: "Suspicions succesfully saved", finished: true});
                            }
                        }).catch((e) => {
                            this.setState({msg: "Something went wrong", finished: true})
                    })
                }
            }
        } else {
            for (var i = 0; i < this.state.candidates.length; i++) {
                if (!this.state.candidates[i].isEliminated) {
                    // var suspicionId = this.state.suspicions[i].id;
                    var suspicion = this.state.suspicions.find((x) => x.candidate.id === this.state.candidates[i].id);
                    var suspicionId = suspicion.id;
                    var amount = document.getElementById(this.state.candidates[i].id).value
                    console.log(suspicionId + " : " + amount);
                    console.log(this.baseUrl + '/suspicions/' + suspicionId + '?amount=' + amount)
                    await axios.put(this.baseUrl + '/suspicions/' + suspicionId + '?amount=' + amount, null, {
                        headers: {
                            authorization: "Basic " + localStorage.getItem('creds'),
                            withCredentials: true
                        }
                    }).then(
                        result => {
                            if (i == this.state.candidates.length-1){
                                this.setState({msg: "Suspicions succesfully saved", finished: true})
                            }
                        }).catch((e) => {
                        this.setState({msg: "Something went wrong", finished: true})
                    })
                }
            }
        }

    }

    getCandidatePoints() {
        for (var i = 0; i < this.state.candidates.length; i++) {
            var id = this.state.candidates[i].id;
            var suspicion = this.state.suspicions.find(sus => {
                return sus.candidate.id == id;
            })
            if (typeof suspicion !== 'undefined') {
                document.getElementsByName(id)[0].value = suspicion.amount;
            }
        }
    }

    calculateTotalPoints() {
        var points = this.state.user.points;
        for (var i = 0; i < this.state.suspicions.length; i++) {
            points = points + this.state.suspicions[i].amount;
        }
        return points
    }

    async componentDidMount() {
        await this.getAllCandidates();
        await this.getUserById();
        await this.getSuspicionsByUser();
        this.getCandidatePoints();
    }


    render() {
        return (
            <div>
                <div className="points">
                    <h3>
                        Your points <br/>
                        {this.calculateTotalPoints()}
                    </h3>
                </div>
                {this.state.msg == "Saving..." ?
                    <div className="msg">
                        <Typography variant="h6">{this.state.msg}</Typography>
                        <img className="loading" src="https://lh3.googleusercontent.com/proxy/qlmXX6XKHGg0bVLFrqb2128HyMhcbsLbktcSdB9nkkq6CvQg7MwexB-3uvyLIcIz4T6PE0r7li93whNx8GdaiCVFQ-BcgA1D"></img>
                    </div> :
                    <div className="msg">
                        <br/>
                        <Typography id="msg" variant="h5">{this.state.msg}</Typography>
                    </div>
                }
                <div>
                    {this.state.candidates.map(can => {
                            return can.isEliminated ?
                                <Card className="candidate">
                                    <CardContent>
                                        <Typography className="eliminated" variant="h6">{can.name}</Typography>
                                        <Input disabled="true" inputProps={{step: 1, min: 0, max: 100, type: 'number'}}
                                               name={can.id.toString()}/>
                                    </CardContent>
                                </Card>
                                :
                                <Card className="candidate">
                                    <CardContent>
                                        <Typography variant="h6">{can.name}</Typography>
                                        <Input color="primary" defaultValue={0}
                                               inputProps={{step: 1, min: 0, max: this.state.availablePoints, type: 'number'}}
                                               name={can.id.toString()} id={can.id}/>
                                    </CardContent>
                                </Card>
                        }
                    )}
                </div>
                <Button variant="contained" className="button" onClick={() => this.validateSubmission()}>Submit
                    points</Button>
            </div>
        );
    }
}

export default Predictor;
