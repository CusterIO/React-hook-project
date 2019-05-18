import React, { useContext } from "react";
import {
  Button,
  Typography,
  Toolbar,
  CssBaseline,
  TextField
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";
import { AUTH_TOKEN, USER_ID } from "../constants";

export const Menu = () => {
  const { state, dispatch } = useContext(StateContext);
  const sections = [...state.topics];

  return (
    <React.Fragment>
      <CssBaseline />
      <div style={styles.layout}>
        <Toolbar style={styles.toolbarMain}>
          <Button size="small">Subscribe</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            style={styles.toolbarTitle}
          >
            {!state.login &&
              !state.signup &&
              (state.viewLinks ? "Links" : "Blog")}
            {state.login && "Login"}
            {state.signup && "Sign up"}
          </Typography>
          {state.searchLink && (
            <TextField
              value={state.filterLink}
              onChange={e => {
                dispatch({
                  type: "setFilterLink",
                  filterLink: e.target.value
                });
              }}
              variant={"outlined"}
              label="Search links"
              style={{
                background: "linear-gradient(45deg, #FFF176 30%, #DCEDC8 90%)"
              }}
            />
          )}
          {state.searchLink && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                dispatch({ type: "setExecuteSearch", executeSearch: true });
              }}
            >
              Search
            </Button>
          )}
          <Search
            onClick={() => {
              dispatch({ type: "setSearchLink" });
            }}
          />
          {!state.signup && !state.token && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                dispatch({ type: "setSignup", signup: true });
                dispatch({ type: "setLogin", login: false });
              }}
            >
              Sign up
            </Button>
          )}
          {!state.login && !state.token && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                dispatch({ type: "setLogin", login: true });
                dispatch({ type: "setSignup", signup: false });
              }}
            >
              Login
            </Button>
          )}
          {state.token &&
            !state.profile && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  dispatch({ type: "setProfile", profile: true });
                }}
              >
                Profile
              </Button>
            )}
          {state.token && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                dispatch({ type: "setToken", token: "" });
                localStorage.removeItem(AUTH_TOKEN);
                localStorage.removeItem(USER_ID);
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
        <Toolbar variant="dense" style={styles.toolbarMainSecondary}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              dispatch({ type: "setSubmitArticle", submitArticle: false });
              dispatch({ type: "setEditArticle", editArticle: false });
              dispatch({ type: "setChosenArticle", chosenArticle: "" });
              dispatch({
                type: "setSelectedTopic",
                selectedTopic: "All Topics"
              });
              dispatch({ type: "setSignup", signup: false });
              dispatch({ type: "setLogin", login: false });
              dispatch({ type: "setCreateLink", createLink: false });
              dispatch({ type: "setViewLinks", viewLinks: false });
              // Reset search. TODO! Add a reset search button?
              dispatch({ type: "setExecuteSearch", executeSearch: false });
              dispatch({ type: "setFilterLink", filterLink: "" });
              if (state.searchLink) {
                dispatch({ type: "setSearchLink" });
              }
              dispatch({ type: "setProfile", profile: false });
            }}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              dispatch({ type: "setViewLinks", viewLinks: false });
            }}
          >
            Blog
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              dispatch({ type: "setViewLinks", viewLinks: true });
            }}
          >
            Links
          </Button>
          {state.token &&
            !state.submitArticle &&
            !state.chosenArticle &&
            !state.viewLinks && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  dispatch({ type: "setSubmitArticle", submitArticle: true });
                }}
              >
                New Article
              </Button>
            )}
          {state.token && state.viewLinks && !state.createLink && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch({ type: "setCreateLink", createLink: true });
              }}
            >
              New Link
            </Button>
          )}
        </Toolbar>
        {!state.submitArticle && !state.chosenArticle && (
          <Toolbar variant="dense" style={styles.toolbarSecondary}>
            {sections.map(section => (
              <Typography color="inherit" key={section}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    if (section === "All Topics") {
                      dispatch({
                        type: "setSelectedTopic",
                        selectedTopic: "All Topics"
                      });
                    }
                    if (section === "React Hooks") {
                      dispatch({
                        type: "setSelectedTopic",
                        selectedTopic: "React Hooks"
                      });
                    }
                    if (section === "Reactjs") {
                      dispatch({
                        type: "setSelectedTopic",
                        selectedTopic: "Reactjs"
                      });
                    }
                    if (section === "GraphQL") {
                      dispatch({
                        type: "setSelectedTopic",
                        selectedTopic: "GraphQL"
                      });
                    }
                    if (section === "Material UI") {
                      dispatch({
                        type: "setSelectedTopic",
                        selectedTopic: "Material UI"
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
