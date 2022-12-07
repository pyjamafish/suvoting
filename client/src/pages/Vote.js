// Contains code for vote page

import "../styling/Vote.css";
import "../components/Candidate.js";
import React from 'react';


class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            senateCandidates: [],
            treasuryCandidates: []
        };
    }

    componentDidMount() {
        fetch("http://ec2-54-243-4-131.compute-1.amazonaws.com:3456/api/senate/candidates")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    senateCandidates: result.data.candidates
                });
            },
            (error) => {
                console.log("Error retrieving candidates");
            }
        )

        fetch("http://ec2-54-243-4-131.compute-1.amazonaws.com:3456/api/treasury/candidates")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    treasuryCandidates: result.data.candidates
                });
            },
            (error) => {
                console.log("Error retrieving candidates");
            }
        )
    }

    handleSubmit(event) {
        for (var i = 0; i < event.target.senate.length; ++i) {
            if (event.target.senate[i].checked) {
                fetch("http://ec2-54-243-4-131.compute-1.amazonaws.com:3456/api/senate/candidates/" + event.target.senate[i].value + "/votes", {
                    method: 'PATCH'
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                    }
                );
            }
        }

        for (var i = 0; i < event.target.treasury.length; ++i) {
            if (event.target.treasury[i].checked) {
                fetch("http://ec2-54-243-4-131.compute-1.amazonaws.com:3456/api/treasury/candidates/" + event.target.treasury[i].value + "/votes", {
                    method: 'PATCH'
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                    }
                );
            }
        }
        
        alert("Your vote was counted!")
        event.preventDefault();
        window.location.href = "http://ec2-54-243-4-131.compute-1.amazonaws.com:3456/";
    }

    render() {
        return(
            <div id="vote-container">
                <div id="cand-panel">
                    <h1>Candidate Information</h1>
                    <h2>Senate</h2>
                    {this.state.senateCandidates.length !== 0 ? (
                        <div className="candidate-container">
                            {this.state.senateCandidates.map((candidate) => (
                                <Candidate
                                    name={candidate.name}
                                    answers={candidate.answers}
                                    votes={candidate.votes}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No Senate Candidates</p>
                    )}
                    
                    <h2>Treasury</h2>
                    {this.state.treasuryCandidates.length !== 0 ? (
                        <div className="candidate-container">
                            {this.state.treasuryCandidates.map((candidate) => (
                                <Candidate
                                    name={candidate.name}
                                    answers={candidate.answers}
                                    votes={candidate.votes}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No Treasury Candidates</p>
                    )}
                </div>
                <div id="vote-panel">
                    <h1>Vote</h1>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Senate</h2>
                        {this.state.senateCandidates.length !== 0 ? (
                            <div>
                                {this.state.senateCandidates.map((candidate) => (
                                    <div>
                                        <input type="checkbox" name="senate" value={candidate._id}/>
                                        <label for={candidate._id}>{candidate.name}</label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No Senate Candidates</p>
                        )}
                        <h2>Treasury</h2>
                        {this.state.treasuryCandidates.length !== 0 ? (
                            <div>
                                {this.state.treasuryCandidates.map((candidate) => (
                                    <div>
                                        <input type="checkbox" name="treasury" value={candidate._id}/>
                                        <label for={candidate._id}>{candidate.name}</label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No Treasury Candidates</p>
                        )}
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }
};

function Candidate(props) {
	return (
        <div className="candidate-div">
            <h3 className="candidate-name">
                {props.name}
            </h3>
            <ul>
                {props.answers.map((answer) => (
                    <li>
                        {answer}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Vote;