import React, { useContext, useEffect } from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/MenuContainerStyle";

export const ArticleView = () => {
  const { state, dispatch } = useContext(StateContext);
  const article = state.chosenArticle;

  return (
    <Paper style={styles.mainFeaturedPost}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={12}>
          <div style={styles.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="title"
              color="primary"
              gutterBottom
            >
              {article.title}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
              {article.author}
            </Typography>
            <Typography variant="subtitle2" paragraph gutterBottom>
              {article.description}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary" gutterBottom>
              {article.topic}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary" gutterBottom>
              {article.date}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
