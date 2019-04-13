import React, { useContext, useEffect } from "react";
import { StateContext } from '../context/index';
import { SubmitArticle } from './SubmitArticle.jsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export const BlogContainer = () => {
  const {state, dispatch } = useContext(StateContext);

  const article = state.articles.map((article) =>
      <Grid container direction={'row'} key={article.id}>
        <Grid item md={6}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {article.description}
          </Typography>
          <Typography component="h4" variant="h4" color="inherit" gutterBottom>
            {article.author}
          </Typography>
        </Grid>
      </Grid>
  );

  useEffect(() => {
    console.log('article updated');
  }, [state.articles],
  );

  return (
    <div className='blog-component-wrapper'>
      <SubmitArticle />
      {article}
    </div>
  );
};
