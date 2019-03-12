import React, { useReducer } from 'react';

const initialState = {
  count1: 0,
  count2: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment1':
      return { ...state, count1: state.count1 + 1 };
    case 'decrement1':
      return { ...state, count1: state.count1 - 1 };
    case 'set1':
      return { ...state, count1: action.count };
    case 'increment2':
      return { ...state, count2: state.count2 + 1 };
    case 'decrement2':
      return { ...state, count2: state.count2 - 1 };
    case 'set2':
      return { ...state, count2: action.count };
    default:
      throw new Error('Unexpected action');
  }
};

export const ExampleReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div>
        {state.count1}
        <button onClick={() => dispatch({ type: 'increment1' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement1' })}>-1</button>
        <button onClick={() => dispatch({ type: 'set1', count: 0 })}>reset</button>
      </div>
      <div>
        {state.count2}
        <button onClick={() => dispatch({ type: 'increment2' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement2' })}>-1</button>
        <button onClick={() => dispatch({ type: 'set2', count: 0 })}>reset</button>
      </div>
    </>
  );
};
