// Contains code for create candidate profile page

import "../styling/Create.css";
import React from 'react';
import { Link } from "react-router-dom";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({position: event.target.value});
    }

    render() {
        return(
            <div id="create-div">
                <h1 id="create-header">Create Candidate Profile</h1>
                <h3>Postition</h3>
                <div>
                    <input type="radio" name="position" value="senate" onChange={this.handleChange}/> Senate <br/>
                    <input type="radio" name="position" value="treasury" onChange={this.handleChange}/> Treasury
                </div>
                <Questions position={this.state.position}/>
            </div>
        );
    }
};

function Questions(props) {
    const pos = props.position;
    if (pos === "senate") {
        return (
            <div>
                <h3>Candidate Questions</h3>
                <SenateQuestions />
            </div>
        );
    }
    else if (pos === "treasury") {
        return (
            <div>
                <h3>Candidate Questions</h3>
                <TreasuryQuestions />
            </div>
        );
    }
}

class SenateQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const name = event.target.name.value;
        const responses = [event.target.q1.value, event.target.q2.value, event.target.q3.value, event.target.q4.value];
        const data = {
            name: name,
            responses: responses
        };
        console.log(data);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label for="name">Name </label>
                <input type="text" className="name-text" name="name"/><br/>

                <label for="q1">1) Why are you running for Senate?</label><br/>
                <textarea type="text" className="question-box" id="q1" name="q1" cols="60" rows="5"/><br/>

                <label for="q2">2) Where do you think Senate has room for improvement in the coming year?</label><br/>
                <textarea type="text" className="question-box" id="q2" name="q2" cols="60" rows="5"/><br/>

                <label for="q3">3) What do you think Senate's role is in ensuring students mental wellness, and where is there room for improvement?</label><br/>
                <textarea type="text" className="question-box" id="q3" name="q3" cols="60" rows="5"/><br/>

                <label for="q4">4) How can WUPD's practices be improved to ensure student safety? How would you go about working with WUPD to adjust these practices to better protect students?</label><br/>
                <textarea type="text" className="question-box" id="q4" name="q4" cols="60" rows="5"/><br/>
            
                <div className="button-container">
                    <Link to="/" className="link">
                        <div className="create-button">
                            Cancel
                        </div>
                    </Link>
                    <input className="create-button" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}

class TreasuryQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const name = event.target.name.value;
        const responses = [event.target.q1.value, event.target.q2.value, event.target.q3.value, event.target.q4.value];
        const data = {
            name: name,
            responses: responses
        };
        console.log(data);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label for="name">Name </label>
                <input type="text" className="name-text" name="name"/><br/>
                
                <label for="q1">1) Why are you running for Treasury?</label><br/>
                <textarea type="text" className="question-box" id="q1" name="q1" cols="60" rows="5"/><br/>

                <label for="q2">2) Where do you think Treasury has room for improvement in the coming year?</label><br/>
                <textarea type="text" className="question-box" id="q2" name="q2" cols="60" rows="5"/><br/>

                <label for="q3">3) In your opinion, what does equitable funding mean?</label><br/>
                <textarea type="text" className="question-box" id="q3" name="q3" cols="60" rows="5"/><br/>

                <label for="q4">4) How would you address the communication gap that currently exists between Treasury and student groups?</label><br/>
                <textarea type="text" className="question-box" id="q4" name="q4" cols="60" rows="5"/><br/>
            
                <div className="button-container">
                    <Link to="/" className="link">
                        <div className="create-button">
                            Cancel
                        </div>
                    </Link>
                    <input className="create-button" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}
  
export default Create;