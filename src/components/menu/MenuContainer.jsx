import React, { useContext } from "react";
import {Button, Typography, IconButton, Toolbar, CssBaseline} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import { StateContext } from '../context/index';

export const MenuContainer = () => {
  const {state, dispatch } = useContext(StateContext);
  const styles = {
    layout: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    toolbarMain: {
      borderBottom: '2px solid #000000'
    },
    toolbarTitle: {
      flex: 1
    },
    toolbarSecondary: {
      justifyContent: 'space-between'
    }
  };

  const sections = [
    'React Hooks',
    'Reactjs',
    'Javascript',
    'C#'
  ];

  const featuredPosts = [...state.articles];
  const social = ['GitHub', 'Twitter', 'Facebook'];

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
        <Toolbar variant="dense" style={styles.toolbarSecondary}>
          {sections.map(section => (
            <Typography color="inherit" noWrap key={section}>
              {section}
            </Typography>
          ))}
        </Toolbar>
      </div>
    </React.Fragment>
  );
};
