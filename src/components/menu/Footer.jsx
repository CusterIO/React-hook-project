import React, { useContext } from 'react';
// Components
import { Typography, IconButton, Toolbar, Grid } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import { StateContext } from '../context/index';
// CSS
import './Footer.css';

export const Footer = () => {
  const { state, dispatch } = useContext(StateContext);

  return (
    <React.Fragment>
      <div className="footer-wrapper">
        <Grid item xs={12} md={'auto'}>
          <Toolbar variant="dense" className="footer-toolbar">
            <IconButton color={'primary'}>
              <Share />
            </IconButton>
            <Typography gutterBottom color={'inherit'}>
              Copyright © 2019 · Custer IO
            </Typography>
          </Toolbar>
        </Grid>
      </div>
    </React.Fragment>
  );
};
