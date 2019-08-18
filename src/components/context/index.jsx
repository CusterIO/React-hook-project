import React, { useReducer, createContext } from 'react';
import {
  TYPE_SETPROFILE,
  VALUE_FALSE,
  VALUE_TRUE,
  TYPE_CLOSELOGIN,
  TYPE_OPENLOGIN,
  TYPE_OPENSIGNIN,
  VALUE_EMPTYSTRING
} from 'components/context/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSlider':
      return { ...state, slider: action.slider };
    case 'setTitle':
      return { ...state, title: action.title };
    case 'setDescription':
      return { ...state, description: action.description };
    case 'setAuthor':
      return { ...state, author: action.author };
    case 'setArticle':
      return { ...state, articles: [...state.articles, action.article] };
    case 'updateArticles':
      return { ...state, articles: [...action.articles] };
    case 'resetArticleFields':
      return {
        ...state,
        title: VALUE_EMPTYSTRING,
        description: VALUE_EMPTYSTRING,
        author: VALUE_EMPTYSTRING,
        chosenArticle: VALUE_EMPTYSTRING,
        submitArticle: VALUE_FALSE,
        editArticle: VALUE_FALSE
      };
    case 'setTopic':
      return { ...state, topic: action.topic };
    case 'setSelectedTopic':
      return { ...state, selectedTopic: action.selectedTopic };
    case 'setChosenArticle':
      return { ...state, chosenArticle: action.value };
    case 'setSubmitArticle':
      return { ...state, submitArticle: action.submitArticle };
    case 'setEditArticle':
      return { ...state, editArticle: action.value };
    case 'setCreateLink':
      return { ...state, createLink: action.createLink };
    case 'setViewLinks':
      return { ...state, viewLinks: action.viewLinks };
    case 'resetLinkFields':
      return {
        ...state,
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
    case 'setSearchLink':
      return { ...state, searchLink: !state.searchLink };
    case 'setFilterLink':
      return { ...state, filterLink: action.filterLink };
    case 'setExecuteSearch':
      return { ...state, executeSearch: action.executeSearch };
    case 'setToken':
      return { ...state, token: action.value };
    case TYPE_SETPROFILE:
      return { ...state, profile: action.value };
    case 'setUser':
      return { ...state, setUser: action.user };
    default:
      throw new Error('Unexpected action');
  }
};

const initialState = {
  slider: 0,
  title: VALUE_EMPTYSTRING,
  description: VALUE_EMPTYSTRING,
  author: VALUE_EMPTYSTRING,
  articles: [],
  topics: ['All Topics', 'React Hooks', 'Reactjs', 'GraphQL', 'Material UI'],
  topic: 'React Hooks',
  selectedTopic: VALUE_EMPTYSTRING,
  chosenArticle: VALUE_EMPTYSTRING,
  submitArticle: VALUE_FALSE,
  editArticle: VALUE_FALSE,
  login: VALUE_FALSE,
  signup: VALUE_FALSE,
  createLink: VALUE_FALSE,
  viewLinks: VALUE_FALSE,
  searchLink: VALUE_FALSE,
  filterLink: VALUE_EMPTYSTRING,
  executeSearch: VALUE_FALSE,
  token: VALUE_EMPTYSTRING,
  profile: VALUE_FALSE,
  user: {}
};

const StateContext = createContext(initialState);

function StateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>{props.children}</StateContext.Provider>
  );
}

export { StateContext, StateProvider };
