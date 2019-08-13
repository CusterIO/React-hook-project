import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { StateContext } from '../context/index';
import { Button, Grid, Typography, TextField, Select, MenuItem } from '@material-ui/core';
import { styles } from '../style/Style';
import { useMutation } from '@apollo/react-hooks';
import { POST_ARTICLE_MUTATION } from '../graphql/Mutation';
import { ARTICLE_QUERY } from '../graphql/Query';
import { ValidateText } from '../utils/validation';
import { ACTION_RESETARTICLEFIELD } from '../context/actions';

export const CreateBlogPost = () => {
  const { state, dispatch } = useContext(StateContext);
  const { editArticle, chosenArticle } = state;
  // Default state
  const TYPE_EMPTYSTRING = '';
  // Local state
  const [title, setTitle] = useState(TYPE_EMPTYSTRING);
  const [description, setDescription] = useState(TYPE_EMPTYSTRING);
  const [author, setAuthor] = useState(TYPE_EMPTYSTRING);
  const [topic, setTopic] = useState(TYPE_EMPTYSTRING);
  // Constants
  const ERROR_MESSAGE = 'Only letters, numbers and characters .,!?)(- allowed';
  let blogErrorMsg;

  const [createBlog, { loading: blogLoading, error: blogError }] = useMutation(
    POST_ARTICLE_MUTATION,
    {
      variables: { title, description, author, topic },
      onCompleted: () => {
        // Do not reset fields on error
        if (!blogError) {
          dispatch(ACTION_RESETARTICLEFIELD);
        }
      },
      update: (cache, { data: { postArticle } }) => {
        // Do not update cache on error
        if (blogError) {
          return;
        }
        const data = cache.readQuery({ query: ARTICLE_QUERY });
        data.feedArticles.articles.push(postArticle);
        cache.writeQuery({
          query: ARTICLE_QUERY,
          data
        });
      }
    }
  );

  useEffect(() => {
    if (editArticle && chosenArticle) {
      setTitle(chosenArticle.title);
      setDescription(chosenArticle.description);
      setAuthor(chosenArticle.author);
      setTopic(chosenArticle.topic);
    }
  }, [editArticle, chosenArticle]);

  // Display current state
  if (blogLoading) return 'Loading...';

  // Display create blog error message
  if (blogError) {
    blogError.graphQLErrors.forEach(({ message }) => {
      blogErrorMsg = message;
    });
  }

  const initialValues = {
    blogPost: {
      title,
      description,
      author,
      topic
    }
  };

  const validate = v => {
    const { blogPost } = v;
    let errors = {};

    const titleError = ValidateText(blogPost.title);
    if (titleError) {
      errors.title = ERROR_MESSAGE;
    }

    const descriptionError = ValidateText(blogPost.description);
    if (descriptionError) {
      errors.description = ERROR_MESSAGE;
    }

    const authorError = ValidateText(blogPost.author);
    if (authorError) {
      errors.author = ERROR_MESSAGE;
    }

    return errors;
  };

  const onSubmit = v => {
    const { blogPost } = v;
    createBlog({ variables: blogPost });
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
          {blogError && (
            <Typography variant="h6" color="error" gutterBottom>
              {blogErrorMsg}
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
                label="Title"
                name="blogPost.title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.blogPost.title}
                error={checkError(errors.title)}
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth={true}
                multiline={true}
                variant={'outlined'}
                rows={4}
                rowsMax={200}
                label="Description"
                name="blogPost.description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.blogPost.description}
                error={checkError(errors.description)}
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth={true}
                variant={'outlined'}
                label="Author"
                name="blogPost.author"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.blogPost.author}
                error={checkError(errors.author)}
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors.author}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Select
                required
                autoWidth={true}
                label="Topic"
                name="blogPost.topic"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.blogPost.topic}
              >
                <MenuItem value={'React Hooks'}>React Hooks</MenuItem>
                <MenuItem value={'Reactjs'}>Reactjs</MenuItem>
                <MenuItem value={'GraphQL'}>GraphQL</MenuItem>
                <MenuItem value={'Material UI'}>Material UI</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" variant="contained" onClick={handleSubmit}>
                Post blog
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Formik>
  );
};
