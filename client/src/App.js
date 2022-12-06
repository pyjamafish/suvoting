import logo from './logo.svg';
import './styling/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Create from "./pages/Create.js";
import Home from "./pages/Home.js";
import Vote from "./pages/Vote.js";
import Results from "./pages/Results.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/results" element={<Results />} />
        <Route exact path="/vote" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
