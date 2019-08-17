import React, { useContext } from 'react';
// Components
import { StateContext } from '../context/index';
import { Typography, CssBaseline, CardContent, Card, Paper, Grid, Button } from '@material-ui/core';
import {Spinner} from '../loader/Spinner';
// GraphQL
import { useQuery } from '@apollo/react-hooks';
import { ARTICLE_QUERY, ARTICLE_SEARCH_QUERY } from '../graphql/Query';
// Constants
import { ACTION_OPENARTICLE } from '../context/actions';
// CSS
import './BlogList.css';

export const BlogList = () => {
  const { state, dispatch } = useContext(StateContext);
  let insertQuery = ARTICLE_QUERY;
  let searchFilter = {};
  let bloglistErrorMsg;
  let articles = [];

  if (state.executeSearch) {
    const filter = state.filterLink;
    insertQuery = ARTICLE_SEARCH_QUERY;
    searchFilter = { filter };
  }

  const { loading: bloglistLoading, error: bloglistError, data: bloglistData } = useQuery(
    insertQuery,
    {
      variables: searchFilter
    }
  );

  if (bloglistLoading) return <Spinner />;

  // Display vote error message
  if (bloglistError) {
    bloglistError.graphQLErrors.forEach(({ message }) => {
      bloglistErrorMsg = message;
    });
  }

  if (bloglistData) {
    articles = bloglistData.feedArticles.articles;
  }

  if (state.selectedTopic && state.selectedTopic !== 'All Topics') {
    articles = articles.filter(article => article.topic === state.selectedTopic);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="blogList-wrapper">
        <main>
          <Paper className="blogList-style__paper">
            <Grid container spacing={16}>
              {bloglistError && (
                <Grid item xs={12}>
                  <Typography variant="h6" color="error" gutterBottom>
                    {bloglistErrorMsg}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                {articles.length > 0 && (
                  <div className="blogList-wrapper__typography">
                    <Typography component="h1" variant="title" color="primary" gutterBottom>
                      {articles[0].title}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit" gutterBottom>
                      {articles[0].author}
                    </Typography>
                    <Typography variant="subtitle2" paragraph color="inherit" gutterBottom>
                      {limitedDescription(articles[0].description)}
                    </Typography>
                    <Typography variant="subtitle2" color="inherit" gutterBottom>
                      {articles[0].topic}
                    </Typography>
                    <Typography variant="subtitle2" color="inherit" gutterBottom>
                      {articles[0].createdAt}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => {
                          dispatch(ACTION_OPENARTICLE(articles[0]));
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
                  <Card className="blogList-style__card">
                    <div className="blogList-wrapper__card-typography">
                      <CardContent>
                        <Typography component="h2" variant="title" color="primary" gutterBottom>
                          {article.title}
                        </Typography>
                        <Typography variant="subtitle1" color="inherit" gutterBottom>
                          {article.author}
                        </Typography>
                        <Typography variant="subtitle2" paragraph color="inherit" gutterBottom>
                          {limitedDescription(article.description)}
                        </Typography>
                        <Typography variant="subtitle2" color="inherit" gutterBottom>
                          {article.topic}
                        </Typography>
                        <Typography variant="subtitle2" color="inherit" gutterBottom>
                          {article.createdAt}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              dispatch(ACTION_OPENARTICLE(article));
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
};

const limitedDescription = description => {
  if (description.length > 50) {
    return description.substring(0, 50);
  }
  return description;
};
