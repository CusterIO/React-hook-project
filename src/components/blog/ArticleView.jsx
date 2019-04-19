import React, { useContext } from "react";
import { Typography, Paper } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";

export const ArticleView = () => {
  const { state, dispatch } = useContext(StateContext);
  const article = state.chosenArticle;

  return (
    <React.Fragment>
      <div style={styles.layout}>
        <main>
          <Paper elevation={10} style={styles.chosenArticlePaper} min>
            <div style={styles.choseArticleContent}>
              <Typography
                component="h1"
                variant="title"
                color="primary"
                gutterBottom
              >
                {article.title}
              </Typography>
              <Typography variant="subtitle1" color="inherit" gutterBottom>
                {article.author}
              </Typography>
              <Typography variant="subtitle2" paragraph color="inherit" gutterBottom>
                {article.description}
              </Typography>
              <Typography variant="subtitle2" color="inherit" gutterBottom>
                {article.topic}
              </Typography>
              <Typography variant="subtitle2" color="inherit" gutterBottom>
                {article.date}
              </Typography>
            </div>
          </Paper>
        </main>
      </div>
    </React.Fragment>
  );
};
