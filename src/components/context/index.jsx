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
    case "setArticle":
      return { ...state, articles: [...state.articles, action.article] };
    case "updateArticles":
      return { ...state, articles: [...action.articles] };
    case "resetArticleFields":
      return {
        ...state,
        isValid: false,
        title: "",
        description: "",
        author: ""
      };
    case "setTopic":
      return { ...state, topic: action.topic };
    case "setSelectedTopic":
      return { ...state, selectedTopic: action.selectedTopic };
    case "setChosenArticle":
      return { ...state, chosenArticle: action.chosenArticle };
    case "setSubmitArticle":
      return { ...state, submitArticle: action.submitArticle };
    case "setEditArticle":
      return { ...state, editArticle: action.editArticle };
    case "setURL":
      return { ...state, URL: action.URL };
    case "setURLDescription":
      return { ...state, URLDescription: action.URLDescription };
    case "setURLValidation":
      return { ...state, isURLValid: action.isURLValid };
    case "setURLDescriptionValidation":
      return { ...state, isURLDescriptionValid: action.isURLDescriptionValid };
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
  isAuthorValid: false,
  articles: [],
  topics: ["All Topics", "React Hooks", "Reactjs", "GraphQL", "Material UI"],
  topic: "React Hooks",
  selectedTopic: "",
  chosenArticle: "",
  submitArticle: false,
  editArticle: false,
  URL: '',
  URLDescription: '',
  isURLValid: false,
  isURLDescriptionValid: false
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
