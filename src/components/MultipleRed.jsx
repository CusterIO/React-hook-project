import React, { useReducer } from 'react';

const initialState = 0;
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'set': return action.count;
    default: throw new Error('Unexpected action');
  }
};

const initialState2 = 30
const reducerRotate = (state, action) => {
  switch (action.type) {
    case 'increment': return state + 30;
    case 'decrement': return state - 30;
    default: throw new Error('Unexpected action');
  }
};

export const MultipleRed = () => {
  const [count1, dispatch1] = useReducer(reducer, initialState);
  const [count2, dispatch2] = useReducer(reducer, initialState);
  const [deg, dispatchDeg] = useReducer(reducerRotate, initialState2);
  const x = 100;
  const y = 100;
  const styles = { 
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`
  };
  return (
    <>
      <div style={styles}>
        {count1}
        <button onClick={() => dispatch1({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch1({ type: 'decrement' })}>-1</button>
        <button onClick={() => dispatch1({ type: 'set', count: 0 })}>reset</button>
      </div>
      <div>
        {count2}
        <button onClick={() => dispatch2({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch2({ type: 'decrement' })}>-1</button>
        <button onClick={() => dispatch2({ type: 'set', count: 0 })}>reset</button>
      </div>
      <div style={styles}>
        {deg}
        <button onClick={() => dispatchDeg({ type: 'increment' })}>+30</button>
        <button onClick={() => dispatchDeg({ type: 'decrement' })}>-30</button>
      </div>
    </>
  );
};
