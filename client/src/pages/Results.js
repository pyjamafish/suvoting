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
        fetch("http://ec2-54-243-4-131.compute-1.amazonaws.com:3456/api/senate/leaderboard")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    senateCandidates: result.data.leaderboard
                });
            },
            (error) => {
                console.log("Error retrieving candidates");
            }
        )

        fetch("http://ec2-54-243-4-131.compute-1.amazonaws.com:3456/api/treasury/leaderboard")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    treasuryCandidates: result.data.leaderboard
                });
            },
            (error) => {
                console.log("Error retrieving candidates");
            }
        )
    }

    render() {
        return(
            <div id="vote-container">
                <div id="cand-panel">
                    <h1>Candidate Rankings</h1>
                    <h2>Senate</h2>
                    {this.state.senateCandidates.length !== 0 ? (
                        <div className="candidate-container">
                            {this.state.senateCandidates.map((candidate) => (
                                <Candidate
                                    name={candidate.name}
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
                                    votes={candidate.votes}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No Treasury Candidates</p>
                    )}
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
            <h2>Votes: {props.votes}</h2>
        </div>
    );
}

export default Vote;