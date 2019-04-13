import React from "react";
import "./App.css";
import { Collecter } from "./components/HookEm.jsx";
import { StateProvider } from './components/context/index';
import {IntroContainer} from './components/intro/IntroContainer';

const App = () => {
  return (
    <div className="App">
      <StateProvider>
        <header className="App-header">
          <IntroContainer />
          <Collecter />
        </header>
      </StateProvider>
    </div>
  );
};

export default App;
