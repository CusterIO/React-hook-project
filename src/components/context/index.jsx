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
    case "setCreateLink":
      return { ...state, createLink: action.createLink };
    case "setViewLinks":
      return { ...state, viewLinks: action.viewLinks };
    case "resetLinkFields":
      return {
        ...state,
        isValid: false,
        URL: "",
        URLDescription: "",
        createLink: false
      };
    case "setLogin":
      return { ...state, login: action.login };
    case "setEmail":
      return { ...state, email: action.email };
    case "setRepeatEmail":
      return { ...state, repeatEmail: action.repeatEmail };
    case "setPassword":
      return { ...state, password: action.password };
    case "setRepeatPassword":
      return { ...state, repeatPassword: action.repeatPassword };
    case "setName":
      return { ...state, name: action.name };
    case "setNameValidation":
      return { ...state, isNameValid: action.isNameValid };
    case "setEmailValidation":
      return { ...state, isEmailValid: action.isEmailValid };
    case "setPasswordValidation":
      return { ...state, isPasswordValid: action.isPasswordValid };
    case "setSignup":
      return { ...state, signup: action.signup };
    case "resetLoginFields":
      return {
        ...state,
        isValid: false,
        name: "",
        email: "",
        password: "",
        login: false,
        signup: false,
        repeatPassword: "",
        repeatEmail: ""
      };
    case "resetSignupFields":
      return {
        ...state,
        isValid: false,
        isRepeatEmailValid: false,
        isRepeatPasswordValid: false,
        isNameValid: false,
        isEmailValid: false,
        isPasswordValid: false,
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        repeatEmail: ""
      };
    case "setSearchLink":
      return { ...state, searchLink: !state.searchLink };
    case "setFilterLink":
      return { ...state, filterLink: action.filterLink };
    case "setExecuteSearch":
      return { ...state, executeSearch: action.executeSearch };
    case "setToken":
      return { ...state, token: action.token };
    case "setProfile":
      return { ...state, profile: action.profile };
    case "setUser":
      return { ...state, setUser: action.user };
    case "setRepeatEmailValidation":
      return { ...state, isRepeatEmailValid: action.isRepeatEmailValid };
    case "setRepeatPasswordValidation":
      return { ...state, isRepeatPasswordValid: action.isRepeatPasswordValid };
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
  URL: "",
  URLDescription: "",
  isURLValid: false,
  isURLDescriptionValid: false,
  login: false,
  signup: false,
  email: "",
  repeatEmail: "",
  password: "",
  repeatPassword: "",
  name: "",
  isNameValid: false,
  isEmailValid: false,
  isPasswordValid: false,
  createLink: false,
  viewLinks: false,
  searchLink: false,
  filterLink: "",
  executeSearch: false,
  token: "",
  profile: false,
  user: {},
  isRepeatEmailValid: false,
  isRepeatPasswordValid: false
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
