import React from "react";
import {Button, Typography, IconButton, Toolbar} from '@material-ui/core';
import {Search} from '@material-ui/icons';

export const MenuContainer = () => {
  const styles = {
    layout: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    toolbarMain: {
      borderBottom: '1px solid #000000'
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

  return (
    <div id="optimization-container">
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
    </div>
  );
};
