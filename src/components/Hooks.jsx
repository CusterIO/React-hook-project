import React, { useState, useEffect, useRef } from 'react';
import {SUCCESS, FAILURE, INIT} from './Constants';

export const Example = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
      document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
          +
      </button>
    </div>
  );
}

export const Name = () => {
  const [name, setName] = useState(INIT);
  const prevName = usePrevious(name);
  const [error, setError] = useState(INIT);
  const [message, setMessage] = useState(INIT);

  useEffect(() => {
    document.title = `Welcome ${name}! Your previous name was ${prevName}`;
  }, [name]);

  useEffect(() => {
    document.title = `${error}`;
  }, [error]);

  useEffect(() => {
    document.title = `${message}`;
  }, [message]);

  const onBlurAction = (e) => {
    const input = e.target.value;
    try {
      if (validateName(input)) {
        flashMessage(SUCCESS);
        setName(input);
        resetValue(e);
      }
    } catch (error) {
      flashMessage(FAILURE);
      setError(error.message);
      resetValue(e);
    }
  };

  const flashMessage = (text) => {
    setMessage(text);
  }

  const onFocusAction = (e) => {
    resetError();
    resetMessage();
  }

  const resetError = () => {
    setError(INIT);
  }

  const resetMessage = () => {
    setMessage(INIT);
  }

  const resetValue = (e) => {
    e.target.value = INIT;
  }

  return (
    <div>
      <p>{message}</p>
      <p>Welcome {name}! Your previous name was {prevName}</p>
      <label>
        <input type="text" onBlur={(e) => onBlurAction(e)} 
          onFocus={(e) => onFocusAction(e)}
        />
      </label>
      <p>{error}</p>
    </div>
  );
}

function validateName (input) {
  const name = input.trim(); // Remove whitespaces.

  if (name === '') {
    throw new Error('No empty name');
  }
  else if (name.length < 3) {
    throw new Error('Name must contain atleast 3 characters');
  }
  return true;
}
  
function usePrevious (value) {
  const ref = useRef();
  useEffect(() => {
      ref.current = value;
  });
  return ref.current;
}
