import React, { useContext } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";
import { Mutation } from "react-apollo";
import { timeDifferenceForDate } from "../utils/timeDifference";
import { AUTH_TOKEN, USER_ID } from "../constants";
import { VOTE_ARTICLE_MUTATION } from "../graphql/Mutation";
import { ARTICLE_QUERY } from "../graphql/Query";

export const Blog = () => {
  const { state, dispatch } = useContext(StateContext);
  const article = state.chosenArticle;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const userId = localStorage.getItem(USER_ID);

  const updateCacheAfterVote = async (store, createVote, articleId) => {
    const data = store.readQuery({ query: ARTICLE_QUERY });

    const votedArticle = data.feedArticles.articles.find(
      article => article.id === articleId
    );
    votedArticle.votes = createVote.article.votes;

    store.writeQuery({ query: ARTICLE_QUERY, data });
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
                <Mutation
                  mutation={VOTE_ARTICLE_MUTATION}
                  variables={{ articleId: article.id }}
                  update={(store, { data: { voteArticle } }) =>
                    updateCacheAfterVote(store, voteArticle, article.id)
                  }
                >
                  {voteMutation => (
                    <Typography
                      component="h1"
                      variant="title"
                      color="primary"
                      onClick={voteMutation}
                      gutterBottom
                    >
                      ▲
                    </Typography>
                  )}
                </Mutation>
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
                dispatch({ type: "setEditArticle", editArticle: true });
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
