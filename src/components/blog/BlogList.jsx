import React, { useContext } from "react";
import { StateContext } from "../context/index";
import {
  Typography,
  CssBaseline,
  CardContent,
  Card,
  Paper,
  Grid,
  Button
} from "@material-ui/core";
import { Query } from "react-apollo";
import { styles } from "../style/Style";
import { ARTICLE_QUERY, ARTICLE_SEARCH_QUERY } from "../graphql/Query";

export const BlogList = () => {
  const { state, dispatch } = useContext(StateContext);
  let insertQuery = ARTICLE_QUERY;
  let searchFilter = {};

  if (state.executeSearch) {
    const filter = state.filterLink;
    insertQuery = ARTICLE_SEARCH_QUERY;
    searchFilter = { filter };
  }

  return (
    <Query query={insertQuery} variables={searchFilter}>
      {({ loading, error, data }) => {
        console.log(error);
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        console.log(data);

        let articles = data.feedArticles.articles;

        // Avoid errors caused by undefined.
        if (!articles) {
          articles = [];
        }

        if (state.selectedTopic && state.selectedTopic !== "All Topics") {
          articles = articles.filter(
            article => article.topic === state.selectedTopic
          );
        }

        return (
          <React.Fragment>
            <CssBaseline />
            <div style={styles.layout}>
              <main>
                <Paper style={styles.mainFeaturedlink}>
                  <Grid container spacing={16}>
                    <Grid item xs={12} md={12}>
                      {articles.length > 0 && (
                        <div style={styles.mainFeaturedarticleContent}>
                          <Typography
                            component="h1"
                            variant="title"
                            color="primary"
                            gutterBottom
                          >
                            {articles[0].title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="inherit"
                            gutterBottom
                          >
                            {articles[0].author}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            paragraph
                            color="inherit"
                            gutterBottom
                          >
                            {limitedDescription(articles[0].description)}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="inherit"
                            gutterBottom
                          >
                            {articles[0].topic}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="inherit"
                            gutterBottom
                          >
                            {articles[0].createdAt}
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom>
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              onClick={() => {
                                dispatch({
                                  type: "setChosenArticle",
                                  chosenArticle: articles[0]
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
                {articles.length > 1 && (
                  <Grid container spacing={16}>
                    {articles.slice(1).map((article, index) => (
                      <Grid item key={article.id} xs={12} md={6}>
                        <Card style={styles.card}>
                          <div style={styles.cardDetails}>
                            <CardContent>
                              <Typography
                                component="h2"
                                variant="title"
                                color="primary"
                                gutterBottom
                              >
                                {article.title}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="inherit"
                                gutterBottom
                              >
                                {article.author}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                paragraph
                                color="inherit"
                                gutterBottom
                              >
                                {limitedDescription(article.description)}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="inherit"
                                gutterBottom
                              >
                                {article.topic}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="inherit"
                                gutterBottom
                              >
                                {article.createdAt}
                              </Typography>
                              <Typography variant="subtitle2" gutterBottom>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => {
                                    dispatch({
                                      type: "setChosenArticle",
                                      chosenArticle: article
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
                )}
              </main>
            </div>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

const limitedDescription = description => {
  if (description.length > 50) {
    return description.substring(0, 50);
  }
  return description;
};
