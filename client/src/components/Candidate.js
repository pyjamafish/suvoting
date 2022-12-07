const Candidate = ({ cand }) => {
	return (
        <div className="candidate-div">
            <h3 className="candidate-name">
                {cand.name}
            </h3>
        </div>
    );
}