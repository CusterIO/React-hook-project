import React, { useContext } from "react";
import {
  Typography,
  CssBaseline,
  CardContent,
  Card,
  Paper,
  Grid
} from "@material-ui/core";
import { StateContext } from "../context/index";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { styles } from "../style/Style";

export const LinkList = () => {
  const { state, dispatch } = useContext(StateContext);
  const FEED_QUERY = gql`
    {
      feed {
        links {
          id
          url
          description
        }
      }
    }
  `;

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
