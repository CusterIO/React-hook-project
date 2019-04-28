import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { styles } from "../style/Style";

export const Link = (props) => {
  const {link} = props

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
                {link.description}
              </Typography>
              <Typography variant="subtitle1" color="inherit" gutterBottom>
                {link.url}
              </Typography>
            </div>
          </Paper>
        </main>
      </div>
    </React.Fragment>
  );
};
