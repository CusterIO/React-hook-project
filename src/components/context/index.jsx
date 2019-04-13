import React, { useReducer, createContext } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSlider':
      return { ...state, slider: action.slider };
    default:
      throw new Error('Unexpected action');
  }
};

const initialState = { 
  slider: 0
};

const StateContext = createContext(initialState);

function StateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
