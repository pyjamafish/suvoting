// Contains code for vote page

import "../styling/Vote.css";
import React from 'react';
import { Link } from "react-router-dom";

class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: []
        };
    }

    componentDidMount() {
        fetch("http://ec2-54-243-4-131.compute-1.amazonaws.com:3456/api/senate/candidates", {
            method: "POST",
            headers: {
				"Content-Type": "application/json",
			},
            mode: 'cors'
        })
        .then(res => res.json())
        .then(
        (result) => {
        //   this.setState({
        //     candidates: result.candidates
        //   });
            console.log(result.candidates);
        },
        (error) => {
          console.log("Error retrieving candidates");
        }
      )
    }

    render() {
        return(
            <p>Vote</p>
        );
    }
};

export default Vote;