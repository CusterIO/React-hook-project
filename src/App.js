import React from "react";
import "./App.css";
import { Container } from "./components/Container.jsx";
import { StateProvider } from './components/context/index';

const App = () => {
  return (
    <div className="App">
      <StateProvider>
        <Container />
      </StateProvider>
    </div>
  );
};

export default App;
