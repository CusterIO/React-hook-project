import React, { useContext } from 'react';
import { StateContext } from '../context/index';
// Components
import { Typography, CssBaseline, CardContent, Card, Paper, Grid } from '@material-ui/core';
import { timeDifferenceForDate } from '../utils/timeDifference';
import { Spinner } from '../loader/Spinner';
// GraphQL
import { useQuery, useMutation } from '@apollo/react-hooks';
import { VOTE_MUTATION } from '../graphql/Mutation';
import { FEED_QUERY, FEED_SEARCH_QUERY } from '../graphql/Query';
import { NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../graphql/Subscription';
// Constants
import { AUTH_TOKEN } from '../context/constants';
// CSS
import './LinkList.css';

export const LinkList = () => {
  const { state } = useContext(StateContext);
  const authToken = localStorage.getItem(AUTH_TOKEN);
  let insertQuery = FEED_QUERY;
  let searchFilter = {};
  let linklistErrorMsg;
  let linkId;
  let links = [];

  if (state.executeSearch) {
    const filter = state.filterLink;
    insertQuery = FEED_SEARCH_QUERY;
    searchFilter = { filter };
  }

  const { loading: linklistLoading, error: linklistError, data: linklistData } = useQuery(
    insertQuery,
    {
      variables: searchFilter,
      subscribeToMore: subscribeToMore => {
        subscribeToMore({ document: NEW_VOTES_SUBSCRIPTION });
        subscribeToMore({
          document: NEW_LINKS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }

            const newLink = subscriptionData.data.newLink;
            const exists = prev.feedLinks.links.find(({ id }) => id === newLink.id);
            if (exists) {
              return prev;
            }

            return Object.assign({}, prev, {
              feedLinks: {
                links: [newLink, ...prev.feedLinks.links],
                count: prev.feedLinks.links.length + 1,
                __typename: prev.feedLinks.__typename
              }
            });
          }
        });
      }
    }
  );

  const [createLink, { loading: voteLoading, error: voteError }] = useMutation(VOTE_MUTATION, {
    variables: { linkId },
    update: (cache, { data: { vote } }) => {
      // Do not update cache on error
      if (voteError) {
        return;
      }

      console.log(linkId);

      const data = cache.readQuery({ query: FEED_QUERY });
      const votedLink = data.feedLinks.links.find(link => link.id === linkId);
      votedLink.votes = vote.link.votes;
      cache.writeQuery({ query: FEED_QUERY, data });
    }
  });

  if (linklistLoading) return <Spinner />;

  // Display vote error message
  if (linklistError) {
    linklistError.graphQLErrors.forEach(({ message }) => {
      linklistErrorMsg = message;
    });
  }

  if (voteLoading) return <Spinner />;

  if (linklistData) {
    links = linklistData.feedLinks.links;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="linkList-wrapper">
        <main>
          <Paper className="linkList-style__paper">
            <Grid container spacing={16}>
              {linklistError && (
                <Grid item xs={12}>
                  <Typography variant="h6" color="error" gutterBottom>
                    {linklistErrorMsg}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                {links.length > 0 && (
                  <div className="linkList-wrapper__typography">
                    <Typography component="h1" variant="title" color="primary" gutterBottom>
                      {links[0].description}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit" gutterBottom>
                      {links[0].url}
                    </Typography>
                    {authToken && (
                      <Typography
                        component="h1"
                        variant="title"
                        color="primary"
                        onClick={createLink({
                          variables: { linkId: links[0].id }
                        })}
                        gutterBottom
                      >
                        ▲
                      </Typography>
                    )}
                    <Typography variant="subtitle1" color="inherit" gutterBottom>
                      {links[0].votes.length} votes | by{' '}
                      {links[0].postedBy ? links[0].postedBy.name : 'Unknown'}{' '}
                      {timeDifferenceForDate(links[0].createdAt)}
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Paper>
          {links.length > 1 && (
            <Grid container spacing={16}>
              {links.slice(1).map((link, index) => (
                <Grid item key={link.id} xs={12} md={6}>
                  <Card className="linkList-style__card">
                    <div className="linkList-wrapper__card-typography">
                      <CardContent>
                        <Typography variant="subtitle1" color="inherit" gutterBottom>
                          {index + 1}.
                        </Typography>
                        <Typography component="h2" variant="title" color="primary" gutterBottom>
                          {link.description}
                        </Typography>
                        <Typography variant="subtitle1" color="inherit" gutterBottom>
                          {link.url}
                        </Typography>
                        {authToken && (
                          <Typography
                            component="h1"
                            variant="title"
                            color="primary"
                            onClick={createLink({
                              variables: { linkId: link.id }
                            })}
                            gutterBottom
                          >
                            ▲
                          </Typography>
                        )}
                        <Typography variant="subtitle1" color="inherit" gutterBottom>
                          {link.votes ? link.votes.length : 0} votes | by{' '}
                          {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                          {timeDifferenceForDate(link.createdAt)}
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
