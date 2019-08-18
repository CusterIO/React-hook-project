import React, { useContext } from 'react';
// Components
import { Typography, Paper, Button } from '@material-ui/core';
import { StateContext } from 'components/context/index';
import { Spinner } from 'components/loader/Spinner';
import { timeDifferenceForDate } from 'components/utils/timeDifference';
// GraphQL
import { useMutation } from '@apollo/react-hooks';
import { VOTE_ARTICLE_MUTATION } from 'components/graphql/Mutation';
import { ARTICLE_QUERY } from 'components/graphql/Query';
// Constants
import { ACTION_EDITARTICLE } from 'components/context/actions';
import { AUTH_TOKEN, USER_ID } from 'components/context/constants';
// CSS
import 'components/blog/Blog.css';

export const Blog = () => {
  const { state, dispatch } = useContext(StateContext);
  const article = state.chosenArticle;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const userId = localStorage.getItem(USER_ID);
  // Constants
  let articleId;
  let voteErrorMsg;

  const [voteArticle, { loading: voteLoading, error: voteError }] = useMutation(
    VOTE_ARTICLE_MUTATION,
    {
      variables: { articleId },
      update: (cache, { data: { voteArticle } }) => {
        const data = cache.readQuery({ query: ARTICLE_QUERY });
        const selectedArticle = article.id;

        const votedArticle = data.feedArticles.articles.find(
          article => article.id === selectedArticle
        );
        votedArticle.votes = voteArticle.article.votes;

        cache.writeQuery({ query: ARTICLE_QUERY, data });
      }
    }
  );

  // Display current state
  if (voteLoading) return <Spinner />;

  // Display vote error message
  if (voteError) {
    voteError.graphQLErrors.forEach(({ message }) => {
      voteErrorMsg = message;
    });
  }

  return (
    <React.Fragment>
      <div className="blog-wrapper">
        <main>
          <Paper elevation={10} className="blog-style__paper">
            <div className="blog-wrapper__typography">
              {voteError && (
                <Typography variant="h6" color="error" gutterBottom>
                  {voteErrorMsg}
                </Typography>
              )}
              <Typography component="h1" variant="title" color="primary" gutterBottom>
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
              {authToken && (
                <Typography
                  component="h1"
                  variant="title"
                  color="primary"
                  onClick={voteArticle({
                    variables: { articleId: article.id }
                  })}
                  gutterBottom
                >
                  ▲
                </Typography>
              )}
              <Typography variant="subtitle1" color="inherit" gutterBottom>
                {article.votes.length} votes | by{' '}
                {article.postedBy ? article.postedBy.name : 'Unknown'}{' '}
                {timeDifferenceForDate(article.createdAt)}
              </Typography>
            </div>
          </Paper>
          {article.postedBy.id === userId && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch(ACTION_EDITARTICLE);
              }}
            >
              Edit Article
            </Button>
          )}
        </main>
      </div>
    </React.Fragment>
  );
};
