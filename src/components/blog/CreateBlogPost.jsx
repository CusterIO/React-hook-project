import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/index";
import { Button, Grid, Typography, TextField, Select, MenuItem } from "@material-ui/core";
import { styles } from "../style/Style";
import { Mutation } from "react-apollo";
import { POST_ARTICLE_MUTATION } from "../graphql/Mutation";
import { ARTICLE_QUERY, USER_QUERY } from "../graphql/Query";

export const CreateBlogPost = () => {
  const { state, dispatch } = useContext(StateContext);
  const { title, description, author, topic } = state;

  useEffect(() => {
    if (state.editArticle && state.chosenArticle) {
      dispatch({type: 'setTitle', title: state.chosenArticle.title})
      dispatch({type: 'setDescription', description: state.chosenArticle.description})
      dispatch({type: 'setAuthor', author: state.chosenArticle.author})
      dispatch({type: 'setTopic', topic: state.chosenArticle.topic})
    }
    // eslint-disable-next-line
  }, [],
  );

  useEffect(() => {
    const isTitleValid = Validate(title);
    if (isTitleValid) {
      dispatch({type: 'setTitleValidation', isTitleValid: true})
    } else {
      dispatch({type: 'setTitleValidation', isTitleValid: false})
    }
    // eslint-disable-next-line
  }, [title],
  );

  useEffect(() => {
    const isDescriptionValid = Validate(description);
    if (isDescriptionValid) {
      dispatch({type: 'setDescriptionValidation', isDescriptionValid: true})
    } else {
      dispatch({type: 'setDescriptionValidation', isDescriptionValid: false})
    }
    // eslint-disable-next-line
  }, [description],
  );

  useEffect(() => {
    const isAuthorValid = Validate(author);
    if (isAuthorValid) {
      dispatch({type: 'setAuthorValidation', isAuthorValid: true})
    } else {
      dispatch({type: 'setAuthorValidation', isAuthorValid: false})
    }
    // eslint-disable-next-line
  }, [author],
  );

  useEffect(() => {
    const isValid = ValidateAll();
    if (isValid) {
      dispatch({type: 'setValidation', isValid: true})
    } else {
      dispatch({type: 'setValidation', isValid: false})
    }
    // eslint-disable-next-line
  }, [state.isAuthorValid, state.isDescriptionValid, state.isTitleValid],
  ); 

  const Validate = (input) => {
    if (!input) {
      return false;
    }
    else if (!input.match(/^[a-zA-Z0-9 .,!?)(\-\r\n]+$/)) {
      dispatch({type: 'setValidationMsg', validationMsg: 'Only letters, numbers and characters .,!?)(- allowed'})
      return false;
    }
    dispatch({type: 'setValidationMsg', validationMsg: ''})
    return true;
  };

  const ValidateAll = () => {
    return !!(state.isAuthorValid && state.isDescriptionValid && state.isTitleValid);
  };

  // https://www.apollographql.com/docs/angular/features/cache-updates/
  const updateCacheAfterCreateArticle = (store, postArticle) => {
    const data = store.readQuery({ query: ARTICLE_QUERY });
    data.feedArticles.articles.push(postArticle);
    store.writeQuery({
      query: ARTICLE_QUERY,
      data
    });

    // Update profile cache
    const data = store.readQuery({ query: USER_QUERY });
    data.feedUser.user.articles.push(postArticle);
    store.writeQuery({
      query: USER_QUERY,
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
            value={title}
            onChange={(e) => {
              dispatch({type: 'setTitle', title: e.target.value})
            }
            }
            error={!state.isTitleValid}
            variant={'outlined'}
            label='Title'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth={true}
            multiline={true}
            rows={4}
            rowsMax={200}
            value={description}
            onChange={(e) => {
              dispatch({type: 'setDescription', description: e.target.value})
            }
            }
            error={!state.isDescriptionValid}
            variant={'outlined'}
            label='Description'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth={true}
            value={author}
            onChange={(e) => {
              dispatch({type: 'setAuthor', author: e.target.value})
            }
            }
            error={!state.isAuthorValid}
            variant={'outlined'}
            label='Author'
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            required
            autoWidth={true}
            value={topic}
            onChange={(e) => {
              dispatch({type: 'setTopic', topic: e.target.value})
            }
            }
          >
            <MenuItem value={'React Hooks'}>React Hooks</MenuItem>
            <MenuItem value={'Reactjs'}>Reactjs</MenuItem>
            <MenuItem value={'GraphQL'}>GraphQL</MenuItem>
            <MenuItem value={'Material UI'}>Material UI</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Mutation
            mutation={POST_ARTICLE_MUTATION}
            variables={{ title, description, author, topic }}
            onCompleted={() => dispatch({type: 'resetArticleFields'})}
            update={(store, { data: { postArticle } }) =>
              updateCacheAfterCreateArticle(store, postArticle)
            }
          >
            {postMutation => (
              <Button
                color="primary"
                variant="contained"
                disabled={!state.isValid}
                onClick={postMutation}
              >
                Post blog
              </Button>
            )}
          </Mutation>
        </Grid>
      </Grid>
    </div>
  );
};
