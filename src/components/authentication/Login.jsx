import React, { useContext, useEffect } from "react";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";
import { AUTH_TOKEN } from "../constants";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/Mutation";

export const Login = () => {
  const { state, dispatch } = useContext(StateContext);
  const { login, email, password, name, repeatEmail, isNameValid, isEmailValid, isPasswordValid } = state;

  useEffect(() => {
    const isValid = Validate(name);
    if (isValid) {
      dispatch({ type: "setNameValidation", isNameValid: true });
    } else {
      dispatch({ type: "setNameValidation", isNameValid: false });
    }
  }, [name]);

  useEffect(() => {
    const isValid = Validate(email);
    if (isValid) {
      dispatch({ type: "setEmailValidation", isEmailValid: true });
    } else {
      dispatch({ type: "setEmailValidation", isEmailValid: false });
    }
  }, [email]);

  useEffect(() => {
    const isValid = Validate(password);
    if (isValid) {
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
  }, [isNameValid, isEmailValid, isPasswordValid]);

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
    return !!(isNameValid && isEmailValid && isPasswordValid);
  };

  const ValidateLogin = () => {
    return !!(isEmailValid && isPasswordValid);
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
              error={!isNameValid}
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
            error={!isEmailValid}
            variant={"outlined"}
            label="Email"
          />
        </Grid>
        {!login && (
          <Grid item xs={12}>
            <TextField
              required
              fullWidth={true}
              value={repeatEmail}
              onChange={e => {
                dispatch({ type: "setRepeatEmail", repeatEmail: e.target.value });
              }}
              error={!isEmailValid}
              variant={"outlined"}
              label="Repeat email"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth={true}
            value={password}
            onChange={e => {
              dispatch({ type: "setPassword", password: e.target.value });
            }}
            error={!isPasswordValid}
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
