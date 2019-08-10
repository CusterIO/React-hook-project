import React, { useContext } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";
import { useMutation } from "@apollo/react-hooks";
import { timeDifferenceForDate } from "../utils/timeDifference";
import { AUTH_TOKEN, USER_ID } from "../context/constants";
import { VOTE_ARTICLE_MUTATION } from "../graphql/Mutation";
import { ARTICLE_QUERY } from "../graphql/Query";
import { ACTION_EDITARTICLE } from "../context/actions";

export const Blog = () => {
  const { state, dispatch } = useContext(StateContext);
  const article = state.chosenArticle;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const userId = localStorage.getItem(USER_ID);
  let articleId = "";

  const [
    voteArticle,
    { loading: voteLoading, error: voteError, data: voteData }
  ] = useMutation(VOTE_ARTICLE_MUTATION, {
    variables: { articleId },
    onError: error => {
      console.error(`Vote article error: ${error}`);
    },
    update: (cache, { data: { voteArticle } }) => {
      updateCacheAfterVote(cache, voteArticle, article.id);
    }
  });

  const updateCacheAfterVote = async (cache, createVote, articleId) => {
    const data = cache.readQuery({ query: ARTICLE_QUERY });

    const votedArticle = data.feedArticles.articles.find(
      article => article.id === articleId
    );
    votedArticle.votes = createVote.article.votes;

    cache.writeQuery({ query: ARTICLE_QUERY, data });
  };

  return (
    <React.Fragment>
      <div style={styles.layout}>
        <main>
          <Paper elevation={10} style={styles.chosenArticlePaper}>
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
              <Typography
                variant="subtitle2"
                paragraph
                color="inherit"
                gutterBottom
              >
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
                {article.votes.length} votes | by{" "}
                {article.postedBy ? article.postedBy.name : "Unknown"}{" "}
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
