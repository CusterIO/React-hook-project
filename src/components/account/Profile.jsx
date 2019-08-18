import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
// Components
import { Typography, Paper, Button } from '@material-ui/core';
import { StateContext } from 'components/context/index';
import {Spinner} from 'components/loader/Spinner';
// GraphQL
import { USER_QUERY } from 'components/graphql/Query';
import { useQuery } from '@apollo/react-hooks';
// Constants
import { USER_ID, DEFAULT_LANG_FILE } from 'components/context/constants';
import { ACTION_HIDEPROFILE } from 'components/context/actions';
// CSS
import 'components/account/Profile.css';

export const Profile = () => {
  const { dispatch } = useContext(StateContext);
  const { t } = useTranslation(DEFAULT_LANG_FILE);
  const filter = localStorage.getItem(USER_ID);
  let profileErrorMsg;

  const { loading: profileLoading, error: profileError, data: profileData } = useQuery(USER_QUERY, {
    variables: { filter },
    fetchPolicy: 'network-only'
  });

  if (profileLoading) return <Spinner />;

  // Display vote error message
  if (profileError) {
    profileError.graphQLErrors.forEach(({ message }) => {
      profileErrorMsg = message;
    });
  }

  const {user} = profileData.feedUser;

  return (
    <div className="profile-wrapper">
      <main>
        <Paper elevation={10} className="profile-style__paper">
          <div className="profile-wrapper__typography">
            {profileError && (
              <Typography variant="h6" color="error" gutterBottom>
                {profileErrorMsg}
              </Typography>
            )}
            <Typography component="h1" variant="title" color="primary" gutterBottom>
              Name: {user.name}
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Links: You created {user.links ? user.links.length : 0} links.
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Articles: You created {user.articles ? user.articles.length : 0} articles.
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
         {t('button.done')}
        </Button>
      </main>
    </div>
  );
};
