import React, { useContext } from "react";
import {
  Button,
  Typography,
  CssBaseline,
  CardContent,
  Card,
  Paper,
  Grid
} from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";

export const ArticleListView = () => {
  const { state, dispatch } = useContext(StateContext);
  let featuredArticles = [...state.articles].reverse(); // Reverse to display latest article on top.

  if (state.selectedTopic && state.selectedTopic !== "All Topics") {
    featuredArticles = featuredArticles.filter(
      article => article.topic === state.selectedTopic
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div style={styles.layout}>
        <main>
          <Paper style={styles.mainFeaturedPost}>
            <Grid container spacing={16}>
              <Grid item xs={12} md={12}>
                {featuredArticles.length > 0 && (
                  <div style={styles.mainFeaturedPostContent}>
                    <Typography
                      component="h1"
                      variant="title"
                      color="primary"
                      gutterBottom
                    >
                      {featuredArticles[0].title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      gutterBottom
                    >
                      {featuredArticles[0].author}
                    </Typography>
                    <Typography variant="subtitle2" paragraph color="inherit" gutterBottom>
                      {limitedDescription(featuredArticles[0].description)}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="inherit"
                      gutterBottom
                    >
                      {featuredArticles[0].topic}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="inherit"
                      gutterBottom
                    >
                      {featuredArticles[0].date}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => {
                          dispatch({
                            type: "setChosenArticle",
                            chosenArticle: featuredArticles[0]
                          });
                        }}
                      >
                        Continue reading...
                      </Button>
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={16}>
            {featuredArticles.slice(1).map((post, index) => (
              <Grid item key={post.id} xs={12} md={6}>
                <Card style={styles.card}>
                  <div style={styles.cardDetails}>
                    <CardContent>
                      <Typography
                        component="h2"
                        variant="title"
                        color="primary"
                        gutterBottom
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        gutterBottom
                      >
                        {post.author}
                      </Typography>
                      <Typography variant="subtitle2" paragraph color="inherit" gutterBottom>
                        {limitedDescription(post.description)}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="inherit"
                        gutterBottom
                      >
                        {post.topic}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="inherit"
                        gutterBottom
                      >
                        {post.date}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            dispatch({
                              type: "setChosenArticle",
                              chosenArticle: post
                            });

                          }}
                        >
                          Continue reading...
                        </Button>
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </React.Fragment>
  );
};

const limitedDescription = (description) => {
  if (description.length > 50) {
    return description.substring(0, 50);
  }
  return description;
};
