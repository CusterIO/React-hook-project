import React, { useContext } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";
import { USER_QUERY } from "../graphql/Query";
import { USER_ID } from "../context/constants";
import { ACTION_HIDEPROFILE } from "../context/actions";
import { useQuery } from "@apollo/react-hooks";

export const Profile = () => {
  const { dispatch } = useContext(StateContext);
  const filter = localStorage.getItem(USER_ID);
  let profileErrorMsg;

  const {
    loading: profileLoading,
    error: profileError,
    data: profileData
  } = useQuery(USER_QUERY, {
    variables: { filter },
    fetchPolicy: "network-only"
  });

  if (profileLoading) return "Loading...";

  // Display vote error message
  if (profileError) {
    profileError.graphQLErrors.forEach(({ message }) => {
      profileErrorMsg = message;
    });
  }

  const user = profileData.feedUser.user;

  return (
    <div style={styles.layout}>
      <main>
        <Paper elevation={10} style={styles.chosenArticlePaper}>
          <div style={styles.choseArticleContent}>
            {profileError && (
              <Typography variant="h6" color="error" gutterBottom>
                {profileErrorMsg}
              </Typography>
            )}
            <Typography
              component="h1"
              variant="title"
              color="primary"
              gutterBottom
            >
              Name: {user.name}
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Links: You created {user.links ? user.links.length : 0} links.
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Articles: You created {user.articles ? user.articles.length : 0}{" "}
              articles.
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
  );
};
