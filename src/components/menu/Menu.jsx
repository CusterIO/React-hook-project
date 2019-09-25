import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
// Components
import { Button, Typography, Toolbar, CssBaseline, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { StateContext } from 'components/context/index';
// Constants
import { AUTH_TOKEN, USER_ID, DEFAULT_LANG_FILE } from 'components/context/constants';
import {
  ACTION_SHOWPROFILE,
  ACTION_HIDEPROFILE,
  ACTION_CLOSELOGIN,
  ACTION_OPENLOGIN,
  ACTION_OPENSIGNIN
} from 'components/context/actions';
// CSS
import 'components/menu/Menu.css';

export const Menu = () => {
  const { state, dispatch } = useContext(StateContext);
  const { t } = useTranslation(DEFAULT_LANG_FILE);
  const sections = [...state.topics];

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="menu-wrapper">
        <Toolbar className="menu-toolbar__main">
          <Button size="small">{t('menu.subscribe')}</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className="menu-toolbar__title"
          >
            {!state.login && !state.signup && (state.viewLinks ? 'Links' : 'Blog')}
            {state.login && 'Login'}
            {state.signup && 'Sign up'}
          </Typography>
          {state.searchLink && (
            <TextField
              value={state.filterLink}
              onChange={e => {
                dispatch({
                  type: 'setFilterLink',
                  filterLink: e.target.value
                });
              }}
              variant={'outlined'}
              label="Search links"
              className="menu-toolbar__search"
            />
          )}
          {state.searchLink && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                dispatch({ type: 'setExecuteSearch', executeSearch: true });
              }}
            >
              {t('menu.search')}
            </Button>
          )}
          <Search
            onClick={() => {
              dispatch({ type: 'setSearchLink' });
            }}
          />
          {!state.signup && !state.token && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                dispatch(ACTION_OPENSIGNIN);
              }}
            >
              {t('menu.signup')}
            </Button>
          )}
          {!state.login && !state.token && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                dispatch(ACTION_OPENLOGIN);
              }}
            >
              {t('menu.login')}
            </Button>
          )}
          {state.token && !state.profile && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                dispatch(ACTION_SHOWPROFILE);
              }}
            >
              {t('menu.profile')}
            </Button>
          )}
          {state.token && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                dispatch({ type: 'setToken', token: '' });
                localStorage.removeItem(AUTH_TOKEN);
                localStorage.removeItem(USER_ID);
              }}
            >
              {t('menu.logout')}
            </Button>
          )}
        </Toolbar>
        <Toolbar variant="dense" className="menu-toolbar__second">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              dispatch({ type: 'setSubmitArticle', submitArticle: false });
              dispatch({ type: 'setEditArticle', editArticle: false });
              dispatch({ type: 'setChosenArticle', chosenArticle: '' });
              dispatch({
                type: 'setSelectedTopic',
                selectedTopic: 'All Topics'
              });
              dispatch(ACTION_CLOSELOGIN);
              dispatch({ type: 'setCreateLink', createLink: false });
              dispatch({ type: 'setViewLinks', viewLinks: false });
              dispatch({ type: 'setViewRng', value: false });
              // Reset search. TODO! Add a reset search button?
              dispatch({ type: 'setExecuteSearch', executeSearch: false });
              dispatch({ type: 'setFilterLink', filterLink: '' });
              if (state.searchLink) {
                dispatch({ type: 'setSearchLink' });
              }
              dispatch(ACTION_HIDEPROFILE);
            }}
          >
            {t('menu.home')}
          </Button>
          {!state.profile && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                dispatch({ type: 'setViewLinks', viewLinks: false });
                dispatch({ type: 'setViewRng', value: false });
              }}
            >
              {t('menu.blog')}
            </Button>
          )}
          {!state.profile && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                dispatch({ type: 'setViewRng', value: false });
                dispatch({ type: 'setViewLinks', viewLinks: true });
              }}
            >
              {t('menu.link')}
            </Button>
          )}
          {!state.profile && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                dispatch({ type: 'setViewLinks', viewLinks: false });
                dispatch({ type: 'setViewRng', value: true });
              }}
            >
              {t('menu.rng')}
            </Button>
          )}
          {state.token &&
            !state.submitArticle &&
            !state.chosenArticle &&
            !state.viewLinks &&
            !state.profile && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  dispatch({ type: 'setSubmitArticle', submitArticle: true });
                }}
              >
                {t('menu.newBlog')}
              </Button>
            )}
          {state.token && state.viewLinks && !state.createLink && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch({ type: 'setCreateLink', createLink: true });
              }}
            >
              {t('menu.newLink')}
            </Button>
          )}
        </Toolbar>
        {!state.submitArticle &&
        !state.chosenArticle &&
        !state.profile &&
        !state.createLink &&
        !state.viewLinks && ( // TODO! Create a state for blog instead of listing all other cases it should NOT be.
            <Toolbar variant="dense" className="menu-toolbar__third">
              {sections.map(section => (
                <Typography color="inherit" key={section}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      if (section === 'All Topics') {
                        dispatch({
                          type: 'setSelectedTopic',
                          selectedTopic: 'All Topics'
                        });
                      }
                      if (section === 'React Hooks') {
                        dispatch({
                          type: 'setSelectedTopic',
                          selectedTopic: 'React Hooks'
                        });
                      }
                      if (section === 'Reactjs') {
                        dispatch({
                          type: 'setSelectedTopic',
                          selectedTopic: 'Reactjs'
                        });
                      }
                      if (section === 'GraphQL') {
                        dispatch({
                          type: 'setSelectedTopic',
                          selectedTopic: 'GraphQL'
                        });
                      }
                      if (section === 'Material UI') {
                        dispatch({
                          type: 'setSelectedTopic',
                          selectedTopic: 'Material UI'
                        });
                      }
                    }}
                  >
                    {section}
                  </Button>
                </Typography>
              ))}
            </Toolbar>
          )}
      </div>
    </React.Fragment>
  );
};
