import React, { useReducer, createContext } from "react";
import {
  TYPE_SETPROFILE,
  VALUE_FALSE,
  VALUE_TRUE,
  TYPE_CLOSELOGIN,
  TYPE_OPENLOGIN,
  TYPE_OPENSIGNIN
} from "./constants";

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
        isValid: VALUE_FALSE,
        title: "",
        description: "",
        author: "",
        chosenArticle: "",
        submitArticle: VALUE_FALSE,
        editArticle: VALUE_FALSE
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
    case "setCreateLink":
      return { ...state, createLink: action.createLink };
    case "setViewLinks":
      return { ...state, viewLinks: action.viewLinks };
    case "resetLinkFields":
      return {
        ...state,
        isValid: VALUE_FALSE,
        URL: "",
        URLDescription: "",
        createLink: VALUE_FALSE
      };
    case TYPE_OPENLOGIN:
      return {
        ...state,
        login: VALUE_TRUE,
        signup: VALUE_FALSE
      };
    case TYPE_OPENSIGNIN:
      return {
        ...state,
        login: VALUE_FALSE,
        signup: VALUE_TRUE
      };
    case TYPE_CLOSELOGIN:
      return {
        ...state,
        signup: VALUE_FALSE,
        login: VALUE_FALSE
      };
    case "setSearchLink":
      return { ...state, searchLink: !state.searchLink };
    case "setFilterLink":
      return { ...state, filterLink: action.filterLink };
    case "setExecuteSearch":
      return { ...state, executeSearch: action.executeSearch };
    case "setToken":
      return { ...state, token: action.value };
    case TYPE_SETPROFILE:
      return { ...state, profile: action.value };
    case "setUser":
      return { ...state, setUser: action.user };
    default:
      throw new Error("Unexpected action");
  }
};

const initialState = {
  slider: 0,
  title: "",
  description: "",
  author: "",
  isValid: VALUE_FALSE,
  isTitleValid: VALUE_FALSE,
  isDescriptionValid: VALUE_FALSE,
  isAuthorValid: VALUE_FALSE,
  articles: [],
  topics: ["All Topics", "React Hooks", "Reactjs", "GraphQL", "Material UI"],
  topic: "React Hooks",
  selectedTopic: "",
  chosenArticle: "",
  submitArticle: VALUE_FALSE,
  editArticle: VALUE_FALSE,
  URL: "",
  URLDescription: "",
  isURLValid: VALUE_FALSE,
  isURLDescriptionValid: VALUE_FALSE,
  login: VALUE_FALSE,
  signup: VALUE_FALSE,
  createLink: VALUE_FALSE,
  viewLinks: VALUE_FALSE,
  searchLink: VALUE_FALSE,
  filterLink: "",
  executeSearch: VALUE_FALSE,
  token: "",
  profile: VALUE_FALSE,
  user: {}
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
