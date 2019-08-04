import React, { useContext } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";
import { USER_QUERY } from "../graphql/Query";
import { USER_ID } from "../context/constants";
import { ACTION_HIDEPROFILE } from "../context/actions";
import { Query } from "react-apollo";

export const Profile = () => {
  const { dispatch } = useContext(StateContext);
  const filter = localStorage.getItem(USER_ID);

  return (
    <Query
      fetchPolicy={"network-only"}
      query={USER_QUERY}
      variables={{ filter }}
    >
      {({ loading, error, data }) => {
        console.log(error);
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        // Handle undefined data.
        if (!data) {
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
                        Woops! Something went wrong
                      </Typography>
                    </div>
                  </Paper>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      dispatch(ACTION_HIDEPROFILE);
                    }}
                  >
                    Ok
                  </Button>
                </main>
              </div>
            </React.Fragment>
          );
        }

        const user = data.feedUser.user;

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
                      Name: {user.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      gutterBottom
                    >
                      Email: {user.email}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      gutterBottom
                    >
                      Links: You created {user.links ? user.links.length : 0}{" "}
                      links.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      gutterBottom
                    >
                      Articles: You created{" "}
                      {user.articles ? user.articles.length : 0} articles.
                    </Typography>
                  </div>
                </Paper>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    dispatch(ACTION_HIDEPROFILE);
                  }}
                >
                  Done
                </Button>
              </main>
            </div>
          </React.Fragment>
        );
      }}
    </Query>
  );
};
