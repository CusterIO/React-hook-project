import React, { useReducer, createContext } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSlider":
      return { ...state, slider: action.slider };
    case "setTitle":
      return { ...state, title: action.title };
    case "setDescription":
      return { ...state, description: action.description };
    case "setAuthor":
      return { ...state, author: action.author };
    case "setValidationMsg":
      return { ...state, validationMsg: action.validationMsg };
    case "setValidation":
      return { ...state, isValid: action.isValid };
    case "setTitleValidation":
      return { ...state, isTitleValid: action.isTitleValid };
    case "setDescriptionValidation":
      return { ...state, isDescriptionValid: action.isDescriptionValid };
    case "setAuthorValidation":
      return { ...state, isAuthorValid: action.isAuthorValid };
    default:
      throw new Error("Unexpected action");
  }
};

const initialState = {
  slider: 0,
  title: "",
  description: "",
  author: "",
  validationMsg: "",
  isValid: false,
  isTitleValid: false,
  isDescriptionValid: false,
  isAuthorValid: false
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
