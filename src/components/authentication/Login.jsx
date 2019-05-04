import React, { useContext, useEffect } from "react";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import { StateContext } from "../context/index";
import gql from "graphql-tag";
import { styles } from "../style/Style";
import { AUTH_TOKEN } from "../constants";
import { Mutation } from "react-apollo";

export const Login = () => {
  const { state, dispatch } = useContext(StateContext);
  const { login, email, password, name } = state;

  const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
      post(email: $email, password: $password) {
        token
        email
        password
      }
    }
  `;
  const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
      $name: String!
      $email: String!
      $password: String!
    ) {
      post(name: $name, email: $email, password: $password) {
        token
        name
        email
        password
      }
    }
  `;

  useEffect(() => {
    const isNameValid = Validate(name);
    if (isNameValid) {
      dispatch({ type: "setNameValidation", isNameValid: true });
    } else {
      dispatch({ type: "setNameValidation", isNameValid: false });
    }
  }, [name]);

  useEffect(() => {
    const isEmailValid = Validate(email);
    if (isEmailValid) {
      dispatch({ type: "setEmailValidation", isEmailValid: true });
    } else {
      dispatch({ type: "setEmailValidation", isEmailValid: false });
    }
  }, [email]);

  useEffect(() => {
    const isPasswordValid = Validate(password);
    if (isPasswordValid) {
      dispatch({ type: "setPasswordValidation", isPasswordValid: true });
    } else {
      dispatch({ type: "setPasswordValidation", isPasswordValid: false });
    }
  }, [password]);

  useEffect(() => {
    const isValid = login ? ValidateLogin() : ValidateSignup();
    if (isValid) {
      dispatch({ type: "setValidation", isValid: true });
    } else {
      dispatch({ type: "setValidation", isValid: false });
    }
  }, [state.isNameValid, state.isEmailValid, state.isPasswordValid]);

  const Validate = input => {
    if (!input) {
      return false;
    } else if (!input.match(/^[a-zA-Z0-9 .,!?)(\-\@\r\n]+$/)) {
      dispatch({
        type: "setValidationMsg",
        validationMsg: "Only letters, numbers and characters .,!?)(- allowed"
      });
      return false;
    }
    dispatch({ type: "setValidationMsg", validationMsg: "" });
    return true;
  };

  const ValidateSignup = () => {
    return !!(state.isNameValid && state.isEmailValid && state.isPasswordValid);
  };

  const ValidateLogin = () => {
    return !!(state.isEmailValid && state.isPasswordValid);
  };

  const saveUserData = token => {
    // TODO! Remove from localstorage.
    localStorage.setItem(AUTH_TOKEN, token);
  };

  const confirm = async data => {
    const { token } = login ? data.login : data.signup;
    saveUserData(token);
    dispatch({ type: "resetLoginFields" });
  };

  return (
    <div style={styles.submitArticleContainer}>
      <Typography variant="h6" gutterBottom>
        {state.validationMsg}
      </Typography>
      <Grid container spacing={24}>
        {!login && (
          <Grid item xs={12}>
            <TextField
              required
              fullWidth={true}
              value={name}
              onChange={e => {
                dispatch({ type: "setName", name: e.target.value });
              }}
              error={!state.isNameValid}
              variant={"outlined"}
              label="Name"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth={true}
            value={email}
            onChange={e => {
              dispatch({ type: "setEmail", email: e.target.value });
            }}
            error={!state.isEmailValid}
            variant={"outlined"}
            label="Email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth={true}
            value={password}
            onChange={e => {
              dispatch({ type: "setPassword", password: e.target.value });
            }}
            error={!state.isPasswordValid}
            variant={"outlined"}
            label="Password"
          />
        </Grid>
        <Grid item xs={12}>
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ name, email, password }}
            onCompleted={data => confirm(data)}
          >
            {mutation => (
              <Button
                color="primary"
                variant="contained"
                disabled={!state.isValid}
                onClick={mutation}
              >
                {login ? "login" : "create account"}
              </Button>
            )}
          </Mutation>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (login) {
                dispatch({ type: "setSignup", signup: true });
                dispatch({ type: "setLogin", login: false });
              } else {
                dispatch({ type: "setLogin", login: true });
                dispatch({ type: "setSignup", signup: false });
              }
            }}
          >
            {login ? "Create an account?" : "Login to account?"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
