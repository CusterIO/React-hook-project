import React, { useContext } from "react";
import {
  Button,
  Typography,
  IconButton,
  Toolbar,
  CssBaseline
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";

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
            {state.viewLinks ? "Links" : "Blog"}
          </Typography>
          <IconButton>
            <Search />
          </IconButton>
          {!state.signup && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch({ type: "setSignup", signup: true });
                dispatch({ type: "setLogin", login: false });
              }}
            >
              Sign up
            </Button>
          )}
          {!state.login && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch({ type: "setLogin", login: true });
                dispatch({ type: "setSignup", signup: false });
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
        <Toolbar variant="dense" style={styles.toolbarMainSecondary}>
          <Button
            variant="outlined"
            size="small"
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
            }}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              dispatch({ type: "setViewLinks", viewLinks: false });
            }}
          >
            Blog
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              dispatch({ type: "setViewLinks", viewLinks: true });
            }}
          >
            Links
          </Button>
          {!state.submitArticle && !state.chosenArticle && !state.viewLinks && (
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
          {state.viewLinks && (
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
