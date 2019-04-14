import React, { useContext, useEffect } from "react";
import { StateContext } from '../context/index';
import {Button, Grid, Typography, TextField, Select, MenuItem} from '@material-ui/core';

export const SubmitArticle = () => {
  const {state, dispatch } = useContext(StateContext);

  useEffect(() => {
    const isTitleValid = Validate(state.title);
    if (isTitleValid) {
      dispatch({type: 'setTitleValidation', isTitleValid: true})
    } else {
      dispatch({type: 'setTitleValidation', isTitleValid: false})
    }
  }, [state.title],
  );

  useEffect(() => {
    const isDescriptionValid = Validate(state.description);
    if (isDescriptionValid) {
      dispatch({type: 'setDescriptionValidation', isDescriptionValid: true})
    } else {
      dispatch({type: 'setDescriptionValidation', isDescriptionValid: false})
    }
  }, [state.description],
  );

  useEffect(() => {
    const isAuthorValid = Validate(state.author);
    if (isAuthorValid) {
      dispatch({type: 'setAuthorValidation', isAuthorValid: true})
    } else {
      dispatch({type: 'setAuthorValidation', isAuthorValid: false})
    }
  }, [state.author],
  );

  useEffect(() => {
    const isValid = ValidateAll();
    if (isValid) {
      dispatch({type: 'setValidation', isValid: true})
    } else {
      dispatch({type: 'setValidation', isValid: false})
    }
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
    <div className='article-component-wrapper'>
      <Typography variant="h6" gutterBottom>
        {state.validationMsg}
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            required
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
            multiline={true}
            rows={4}
            rowsMax={40}
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
                id: idGenerator()
              };
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
}
