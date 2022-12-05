// Contains code for main landing page

import "../styling/Home.css"
import { Link } from "react-router-dom";

const Home = () => {
    return (
    <div id="home-div">
        <img id="su-img" src="https://sae.wustl.edu/assets/images/Sponsor%20Logos%202/Student%20Union.png"/>
        <h1 id="main-header">Welcome to the Student Union Elections Website</h1>
        <div id="button-container">
            <Link to="/vote" className="link">
                <div className="button">
                    Vote
                </div>
            </Link>
            <Link to="/results" className="link">
                <div className="button">
                    Results
                </div>
            </Link>
            <Link to="/create" className="link">
                <div className="button">
                    Candidates
                </div>
            </Link>
        </div>
    </div>
    );
};
  
export default Home;