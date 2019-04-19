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
import { styles } from "../style/MenuContainerStyle";

export const Menu = () => {
  const { state, dispatch } = useContext(StateContext);
  const sections = [...state.topics];
  const options = ["Home", "New Article"];

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
          {options.map(option => (
            <Typography color="inherit" noWrap key={option}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  if (option === "Home") {
                    dispatch({ type: "setSubmitArticle", submitArticle: false });
                  }
                  if (option === "New Article") {
                    dispatch({ type: "setSubmitArticle", submitArticle: true });
                  }
                }}
              >
                {option}
              </Button>
            </Typography>
          ))}
        </Toolbar>
        {
        (!state.submitArticle) && <Toolbar variant="dense" style={styles.toolbarSecondary}>
          {sections.map(section => (
            <Typography color="inherit" noWrap key={section}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  if (section === "Show All Topics") {
                    dispatch({
                      type: "setSelectedTopic",
                      selectedTopic: "Show All Topics"
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
        }
      </div>
    </React.Fragment>
  );
};
