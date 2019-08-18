import React, {Suspense} from 'react';
// Components
import { Container } from 'components/Container.jsx';
import { StateProvider } from 'components/context/index';
import { Spinner } from 'components/loader/Spinner';
// CSS
import './App.css';

const App = () => {
  return (
    <div className="App">
      <StateProvider>
        <Suspense fallback={<Spinner />}>
          <Container />
        </Suspense>
      </StateProvider>
    </div>
  );
};

export default App;
