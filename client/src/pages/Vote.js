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
                console.log(result.data.candidates);
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
        event.preventDefault();
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
                                        <input type="checkbox" name="senate-pick" value={candidate._id}/>
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
                                        <input type="checkbox" name="treasury-pick" value={candidate._id}/>
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
            <p>
                {props.responses}
            </p>
        </div>
    );
}

export default Vote;