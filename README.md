# SU Elections Randomizer
## Features
- Candidates can create accounts and fill in their positions
- Users can view candidates->responses, or questions->responses
  - These are displayed in random order for fairness
- Users can cast votes
- Results page shows candidates sorted by votes

## Technical details
- Backend (Fisher): Go + Chi + MongoDB
- Frontend (Harry): JS, React

## Setup instructions
1. Set up your MongoDB database
2. Create a `.env` file with `MONGODB_URI="your_mongodb_uri"`
3. In `client/`, run `npm install`, and then `npm run build` to build the frontend
4. In the root level, run `go run .` to start the server
