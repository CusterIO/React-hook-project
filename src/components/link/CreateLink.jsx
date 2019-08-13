import React, { useContext } from 'react';
import { Formik } from 'formik';
// Components
import { StateContext } from '../context/index';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
// GraphQL
import { useMutation } from '@apollo/react-hooks';
import { POST_LINK_MUTATION } from '../graphql/Mutation';
import { FEED_QUERY } from '../graphql/Query';
// Helpers
import { ValidateText } from '../utils/validation';
import { ACTION_RESETLINKFIELD } from '../context/actions';
// CSS
import { styles } from '../style/Style';

export const CreateLink = () => {
  const { state, dispatch } = useContext(StateContext);
  // Constants
  const url = '';
  const description = '';
  const ERROR_MESSAGE = 'Only letters, numbers and characters .,!?)(- allowed';
  let linkErrorMsg;

  const [createLink, { loading: linkLoading, error: linkError }] = useMutation(POST_LINK_MUTATION, {
    variables: { description, url },
    onCompleted: () => {
      // Do not reset fields on error
      if (!linkError) {
        dispatch(ACTION_RESETLINKFIELD);
      }
    },
    update: (cache, { data: { postLink } }) => {
      // Do not update cache on error
      if (linkError) {
        return;
      }
      const data = cache.readQuery({ query: FEED_QUERY });
      data.feedLinks.links.push(postLink);
      cache.writeQuery({
        query: FEED_QUERY,
        data
      });
    }
  });

  // Display current state
  if (linkLoading) return 'Loading...';

  // Display create blog error message
  if (linkError) {
    linkError.graphQLErrors.forEach(({ message }) => {
      linkErrorMsg = message;
    });
  }

  const initialValues = {
    linkPost: {
      url,
      description
    }
  };

  const validate = v => {
    const { linkPost } = v;
    let errors = {};

    const urlError = ValidateText(linkPost.url);
    if (urlError) {
      errors.url = ERROR_MESSAGE;
    }

    const descriptionError = ValidateText(linkPost.description);
    if (descriptionError) {
      errors.description = ERROR_MESSAGE;
    }

    return errors;
  };

  const onSubmit = v => {
    const { linkPost } = v;
    createLink({ variables: linkPost });
  };

  const checkError = e => {
    if (e) {
      return true;
    }
    return false;
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
        <div style={styles.submitArticleContainer}>
          {linkError && (
            <Typography variant="h6" color="error" gutterBottom>
              {linkErrorMsg}
            </Typography>
          )}
          <Typography variant="h6" gutterBottom>
            {state.validationMsg}
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth={true}
                variant={'outlined'}
                label="url"
                name="linkPost.url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.linkPost.url}
                error={checkError(errors.url)}
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors.url}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth={true}
                multiline={true}
                rows={4}
                rowsMax={200}
                variant={'outlined'}
                label="Description"
                name="linkPost.urlDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.linkPost.urlDescription}
                error={checkError(errors.urlDescription)}
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors.urlDescription}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" variant="contained" onClick={handleSubmit}>
                Post link
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Formik>
  );
};
