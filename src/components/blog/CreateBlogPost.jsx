import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { StateContext } from "../context/index";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem
} from "@material-ui/core";
import { styles } from "../style/Style";
import { Mutation } from "react-apollo";
import { POST_ARTICLE_MUTATION } from "../graphql/Mutation";
import { ARTICLE_QUERY } from "../graphql/Query";
import { ValidateText } from "../utils/validation";
import { ACTION_RESETARTICLEFIELD } from "../context/actions";

export const CreateBlogPost = () => {
  const { state, dispatch } = useContext(StateContext);
  const { editArticle, chosenArticle } = state;
  // Default state
  const TYPE_EMPTYSTRING = "";
  // Local state
  const [title, setTitle] = useState(TYPE_EMPTYSTRING);
  const [description, setDescription] = useState(TYPE_EMPTYSTRING);
  const [author, setAuthor] = useState(TYPE_EMPTYSTRING);
  const [topic, setTopic] = useState(TYPE_EMPTYSTRING);
  // Constants
  const ERROR_MESSAGE = "Only letters, numbers and characters .,!?)(- allowed";

  useEffect(() => {
    if (editArticle && chosenArticle) {
      setTitle(chosenArticle.title);
      setDescription(chosenArticle.description);
      setAuthor(chosenArticle.author);
      setTopic(chosenArticle.topic);
    }
  }, [editArticle, chosenArticle]);

  const executeCreatePost = ({ title, description, author, topic }) => {
    return (
      <Mutation
        mutation={POST_ARTICLE_MUTATION}
        variables={{ title, description, author, topic }}
        onCompleted={() => dispatch(ACTION_RESETARTICLEFIELD)}
        update={(store, { data: { postArticle } }) =>
          updateCacheAfterCreateArticle(store, postArticle)
        }
      >
        {postMutation => postMutation()}
      </Mutation>
    );
  };

  const initialValues = {
    title,
    description,
    author,
    topic
  };

  const validate = v => {
    let errors = {};

    const titleError = ValidateText(v.title);
    if (titleError) {
      errors.title = ERROR_MESSAGE;
    }

    const descriptionError = ValidateText(v.description);
    if (descriptionError) {
      errors.description = ERROR_MESSAGE;
    }

    const authorError = ValidateText(v.author);
    if (authorError) {
      errors.author = ERROR_MESSAGE;
    }

    return errors;
  };

  const onSubmit = v => {
    console.log(v);
    executeCreatePost(v);
  };

  const checkError = e => {
    if (e) {
      return true;
    }
    return false;
  };

  // https://www.apollographql.com/docs/angular/features/cache-updates/
  const updateCacheAfterCreateArticle = (store, postArticle) => {
    const data = store.readQuery({ query: ARTICLE_QUERY });
    data.feedArticles.articles.push(postArticle);
    store.writeQuery({
      query: ARTICLE_QUERY,
      data
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
        <div style={styles.submitArticleContainer}>
          <Typography variant="h6" gutterBottom>
            {state.validationMsg}
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth={true}
                variant={"outlined"}
                label="Title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
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
                variant={"outlined"}
                rows={4}
                rowsMax={200}
                label="Description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={checkError(errors.description)}
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors.description}
              </Typography>
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth={true}
                variant={"outlined"}
                label="Author"
                name="author"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.author}
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
                name="topic"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.topic}
              >
                <MenuItem value={"React Hooks"}>React Hooks</MenuItem>
                <MenuItem value={"Reactjs"}>Reactjs</MenuItem>
                <MenuItem value={"GraphQL"}>GraphQL</MenuItem>
                <MenuItem value={"Material UI"}>Material UI</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Post blog
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Formik>
  );
};
