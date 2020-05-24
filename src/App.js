import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import logo from "./assets/logo.svg";
import "./App.css";
import { CircularProgress } from "@material-ui/core";

function App() {
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [op, setOp] = useState("Enter Text to Analyse Sentiment");

  const handleSubmit = () => {
    setPending(true);
    fetch("http://127.0.0.1:5000/get_sentiment", {
      method: 'POST',
      body: `${text}`
      
    }).then((response) => response.text())
      .then((data) => {
        console.log(data)
        setOp(data);
        setPending(false);
      });
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
