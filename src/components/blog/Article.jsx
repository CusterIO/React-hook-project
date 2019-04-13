import React, { useContext, useEffect } from "react";
import { StateContext } from '../context/index';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export const Article = () => {
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
            placeholder='Article title'
            value={state.title}
            onChange={(e) => {
              dispatch({type: 'setTitle', title: e.target.value})
            }
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder='Article description'
            multiline={true}
            rows={4}
            rowsMax={40}
            value={state.description}
            onChange={(e) => {
              dispatch({type: 'setDescription', description: e.target.value})
            }
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            placeholder='Article author'
            value={state.author}
            onChange={(e) => {
              dispatch({type: 'setAuthor', author: e.target.value})
            }
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color='primary'
            variant='contained'
            disabled={!state.isValid}
            onClick = {() => {
              console.log('you clicked me');
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
