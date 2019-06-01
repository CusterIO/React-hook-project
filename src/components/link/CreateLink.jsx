import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/index";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import { styles } from "../style/Style";
import { Mutation } from "react-apollo";
import { POST_MUTATION } from "../graphql/Mutation";
import { FEED_QUERY } from "../graphql/Query";

export const CreateLink = () => {
  const { state, dispatch } = useContext(StateContext);
  const description = state.URLDescription;
  const url = state.URL;

  useEffect(() => {
    const isURLValid = Validate(state.URL);
    if (isURLValid) {
      dispatch({ type: "setURLValidation", isURLValid: true });
    } else {
      dispatch({ type: "setURLValidation", isURLValid: false });
    }
    // eslint-disable-next-line
  }, [state.URL]);

  useEffect(() => {
    const isURLDescriptionValid = Validate(state.URLDescription);
    if (isURLDescriptionValid) {
      dispatch({
        type: "setURLDescriptionValidation",
        isURLDescriptionValid: true
      });
    } else {
      dispatch({
        type: "setURLDescriptionValidation",
        isURLDescriptionValid: false
      });
    }
    // eslint-disable-next-line
  }, [state.URLDescription]);

  useEffect(() => {
    const isValid = ValidateAll();
    if (isValid) {
      dispatch({ type: "setValidation", isValid: true });
    } else {
      dispatch({ type: "setValidation", isValid: false });
    }
    // eslint-disable-next-line
  }, [state.isURLDescriptionValid, state.isURLValid]);

  const Validate = input => {
    if (!input) {
      return false;
    } else if (!input.match(/^[a-zA-Z0-9 .,!?@)(\-\r\n]+$/)) {
      dispatch({
        type: "setValidationMsg",
        validationMsg: "Only letters, numbers and characters .,!?)(- allowed"
      });
      return false;
    }
    dispatch({ type: "setValidationMsg", validationMsg: "" });
    return true;
  };

  const ValidateAll = () => {
    return !!(state.isURLValid && state.isURLDescriptionValid);
  };

  // https://www.apollographql.com/docs/angular/features/cache-updates/
  const updateCacheAfterCreateLink = (store, postLink) => {
    const data = store.readQuery({ query: FEED_QUERY });
    data.feedLinks.links.push(postLink); // data.feedLinks.links.unshift(postLink);
    store.writeQuery({
      query: FEED_QUERY,
      data
    });
  };

  return (
    <div style={styles.submitArticleContainer}>
      <Typography variant="h6" gutterBottom>
        {state.validationMsg}
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth={true}
            value={state.URL}
            onChange={e => {
              dispatch({ type: "setURL", URL: e.target.value });
            }}
            error={!state.isURLValid}
            variant={"outlined"}
            label="URL"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth={true}
            multiline={true}
            rows={4}
            rowsMax={200}
            value={state.URLDescription}
            onChange={e => {
              dispatch({
                type: "setURLDescription",
                URLDescription: e.target.value
              });
            }}
            error={!state.isURLDescriptionValid}
            variant={"outlined"}
            label="Description"
          />
        </Grid>
        <Grid item xs={12}>
          <Mutation
            mutation={POST_MUTATION}
            variables={{ description, url }}
            onCompleted={() => dispatch({ type: "resetLinkFields" })}
            update={(store, { data: { postLink } }) =>
              updateCacheAfterCreateLink(store, postLink)
            }
          >
            {postMutation => (
              <Button
                color="primary"
                variant="contained"
                disabled={!state.isValid}
                onClick={postMutation}
              >
                Post link
              </Button>
            )}
          </Mutation>
        </Grid>
      </Grid>
    </div>
  );
};
