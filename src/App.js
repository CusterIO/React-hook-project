import React, { Component } from "react";
import "./App.css";
import { Collecter } from "./components/HookEm.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Collecter />
        </header>
      </div>
    );
  }
}

export default App;
