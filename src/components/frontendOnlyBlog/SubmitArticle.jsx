import React, { useContext, useEffect } from "react";
import { StateContext } from '../context/index';
import {Button, Grid, Typography, TextField, Select, MenuItem} from '@material-ui/core';
import { styles } from "../style/Style";

export const SubmitArticle = () => {
  const {state, dispatch } = useContext(StateContext);

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
    const isTitleValid = Validate(state.title);
    if (isTitleValid) {
      dispatch({type: 'setTitleValidation', isTitleValid: true})
    } else {
      dispatch({type: 'setTitleValidation', isTitleValid: false})
    }
    // eslint-disable-next-line
  }, [state.title],
  );

  useEffect(() => {
    const isDescriptionValid = Validate(state.description);
    if (isDescriptionValid) {
      dispatch({type: 'setDescriptionValidation', isDescriptionValid: true})
    } else {
      dispatch({type: 'setDescriptionValidation', isDescriptionValid: false})
    }
    // eslint-disable-next-line
  }, [state.description],
  );

  useEffect(() => {
    const isAuthorValid = Validate(state.author);
    if (isAuthorValid) {
      dispatch({type: 'setAuthorValidation', isAuthorValid: true})
    } else {
      dispatch({type: 'setAuthorValidation', isAuthorValid: false})
    }
    // eslint-disable-next-line
  }, [state.author],
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
            value={state.title}
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
            value={state.description}
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
            value={state.author}
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
            value={state.topic}
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
          <Button
            color='primary'
            variant='contained'
            disabled={!state.isValid}
            onClick = {() => {
              const article = {
                title: state.title,
                description: state.description,
                author: state.author,
                topic: state.topic,
                id: idGenerator(),
                date: dateGenerator()
              };
              removeArticle(state, dispatch);
              dispatch({type: 'setArticle', article: article})
              dispatch({type: 'resetArticleFields'})
            }
            }
          >
          Post article
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const idGenerator = () => {
  let S4 = () => {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
};

// https://stackoverflow.com/questions/8362952/output-javascript-date-in-yyyy-mm-dd-hhmsec-format
const dateGenerator = () => {
  const m = new Date();
  return m.getUTCFullYear() + "/" +
      ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
      ("0" + m.getUTCDate()).slice(-2) + " " +
      ("0" + m.getUTCHours()).slice(-2) + ":" +
      ("0" + m.getUTCMinutes()).slice(-2) + ":" +
      ("0" + m.getUTCSeconds()).slice(-2) + " GMT";
};

const removeArticle = (state, dispatch) => { // To be handled by database.
  let articles = [...state.articles];
  let index = articles.findIndex(function(article) {
    return article.id === state.chosenArticle.id;
  })
  
  if (index !== -1) {
    articles.splice(index, 1);
  }

  dispatch({type: 'updateArticles', articles: articles}) // Force update all articles.
};
