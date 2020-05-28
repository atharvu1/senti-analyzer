import React, { useState } from "react";
import Axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import logo from "./assets/logo.svg";
import "./App.css";
import { CircularProgress } from "@material-ui/core";
// text-analysis-q8z3c4sf9.now.sh
// text-analysis.now.sh
function App() {
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [op, setOp] = useState("Enter Text to Analyse Sentiment");

  const handleSubmit = async () => {
    setPending(true);
    const res = await Axios.post("http://127.0.0.1:5000/get_sentiment", { text }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    console.log(res)
    setOp(res.data);
    setPending(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sentiment-Analyzer!</h1>

        <img src={logo} className="App-logo" alt="logo" />

        <div className="container">
          <TextField
            fullWidth
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            label="Enter Sentiment"
            className="input"
          />

          <br />
          <br />
          <Divider />
          <br />

          {pending ? <CircularProgress /> : <div className="output">{op}</div>}

          <br />
          <br />

          <Button
            disabled={!text.length}
            onClick={handleSubmit}
            variant="outlined"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
