import React, { useContext } from 'react';
import { Typography, IconButton, Toolbar, Grid } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import { StateContext } from '../context/index';
import { styles } from '../style/Style';

export const Footer = () => {
  const { state, dispatch } = useContext(StateContext);

  return (
    <React.Fragment>
      <div style={styles.footer}>
        <Grid item xs={12} md={'auto'}>
          <Toolbar variant="dense" style={{ justifyContent: 'center' }}>
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
