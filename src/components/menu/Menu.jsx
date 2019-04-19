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
            Blog
          </Typography>
          <IconButton>
            <Search />
          </IconButton>
          <Button variant="outlined" size="small">
            Sign up
          </Button>
        </Toolbar>
        <Toolbar variant="dense" style={styles.toolbarMainSecondary}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              dispatch({ type: "setSubmitArticle", submitArticle: false });
              dispatch({type: 'setEditArticle', editArticle: false})
              dispatch({ type: "setChosenArticle", chosenArticle: "" });
              dispatch({ type: "setSelectedTopic", selectedTopic: "All Topics" });
            }}
          >
            Home
          </Button>
          {!state.submitArticle && !state.chosenArticle && (
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
        </Toolbar>
        {!state.submitArticle && !state.chosenArticle && (
          <Toolbar variant="dense" style={styles.toolbarSecondary}>
            {sections.map(section => (
              <Typography color="inherit" Wrap key={section}>
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
