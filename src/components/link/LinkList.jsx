import React from "react";
import {
  Typography,
  CssBaseline,
  CardContent,
  Card,
  Paper,
  Grid
} from "@material-ui/core";
import { Query, Mutation } from "react-apollo";
import { styles } from "../style/Style";
import { timeDifferenceForDate } from "../utils/timeDifference";
import { AUTH_TOKEN } from "../constants";
import { VOTE_MUTATION } from "../graphql/Mutation";
import { FEED_QUERY } from "../graphql/Query";

export const LinkList = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  };

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        console.log(error);
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const links = data.feed.links;

        return (
          <React.Fragment>
            <CssBaseline />
            <div style={styles.layout}>
              <main>
                <Paper style={styles.mainFeaturedlink}>
                  <Grid container spacing={16}>
                    <Grid item xs={12} md={12}>
                      {links.length > 0 && (
                        <div style={styles.mainFeaturedlinkContent}>
                          <Typography
                            component="h1"
                            variant="title"
                            color="primary"
                            gutterBottom
                          >
                            {links[0].description}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="inherit"
                            gutterBottom
                          >
                            {links[0].url}
                          </Typography>
                          {authToken && (
                            <Mutation
                              mutation={VOTE_MUTATION}
                              variables={{ linkId: links[0].id }}
                              update={(store, { data: { vote } }) =>
                                updateCacheAfterVote(store, vote, links[0].id)
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
                          <Typography
                            variant="subtitle1"
                            color="inherit"
                            gutterBottom
                          >
                            {links[0].votes.length} votes | by{" "}
                            {links[0].postedBy
                              ? links[0].postedBy.name
                              : "Unknown"}{" "}
                            {timeDifferenceForDate(links[0].createdAt)}
                          </Typography>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
                <Grid container spacing={16}>
                  {links.slice(1).map((link, index) => (
                    <Grid item key={link.id} xs={12} md={6}>
                      <Card style={styles.card}>
                        <div style={styles.cardDetails}>
                          <CardContent>
                            <Typography
                              variant="subtitle1"
                              color="inherit"
                              gutterBottom
                            >
                              {index + 1}.
                            </Typography>
                            <Typography
                              component="h2"
                              variant="title"
                              color="primary"
                              gutterBottom
                            >
                              {link.description}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="inherit"
                              gutterBottom
                            >
                              {link.url}
                            </Typography>
                            {authToken && (
                              <Mutation
                                mutation={VOTE_MUTATION}
                                variables={{ linkId: link.id }}
                                update={(store, { data: { vote } }) =>
                                  updateCacheAfterVote(store, vote, link.id)
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
                            <Typography
                              variant="subtitle1"
                              color="inherit"
                              gutterBottom
                            >
                              {link.votes.length} votes | by{" "}
                              {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
                              {timeDifferenceForDate(link.createdAt)}
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
      }}
    </Query>
  );
};
