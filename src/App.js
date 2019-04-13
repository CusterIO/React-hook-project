import React from "react";
import "./App.css";
import { Optimization } from "./components/Optimization.jsx";
import { StateProvider } from './components/context/index';

const App = () => {
  return (
    <div className="App">
      <StateProvider>
        <Optimization />
      </StateProvider>
    </div>
  );
};

export default App;
