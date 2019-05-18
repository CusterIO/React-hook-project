import React, { useContext, useEffect } from "react";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";
import { AUTH_TOKEN, USER_ID } from "../constants";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/Mutation";

export const Login = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    login,
    email,
    password,
    name,
    repeatEmail,
    repeatPassword,
    isNameValid,
    isEmailValid,
    isPasswordValid,
    isRepeatEmailValid,
    isRepeatPasswordValid
  } = state;

  useEffect(() => {
    dispatch({ type: "resetSignupFields" }); // Clear fields on load.
    return () => dispatch({ type: "resetSignupFields" }); // Clear fields on unmount.
  }, []);

  useEffect(() => {
    const isValid = Validate(name);
    if (isValid) {
      dispatch({ type: "setNameValidation", isNameValid: true });
    } else {
      dispatch({ type: "setNameValidation", isNameValid: false });
    }
  }, [name]);

  useEffect(() => {
    const isValid = ValidateEmail(email);
    if (isValid) {
      dispatch({ type: "setEmailValidation", isEmailValid: true });
      dispatch({ type: "setValidationMsg", validationMsg: "" });
    } else {
      dispatch({ type: "setEmailValidation", isEmailValid: false });
      dispatch({
        type: "setValidationMsg",
        validationMsg: "Invalid email adress"
      });
    }
  }, [email]);

  useEffect(() => {
    const isValid = ValidateRepeatEmail();
    if (isValid) {
      dispatch({ type: "setRepeatEmailValidation", isRepeatEmailValid: true });
    } else {
      dispatch({ type: "setRepeatEmailValidation", isRepeatEmailValid: false });
    }
  }, [email, repeatEmail]);

  useEffect(() => {
    const isValid = Validate(password);
    if (isValid) {
      dispatch({ type: "setPasswordValidation", isPasswordValid: true });
    } else {
      dispatch({ type: "setPasswordValidation", isPasswordValid: false });
    }
  }, [password]);

  useEffect(() => {
    const isValid = ValidateRepeatPassword();
    if (isValid) {
      dispatch({ type: "setRepeatPasswordValidation", isRepeatPasswordValid: true });
    } else {
      dispatch({ type: "setRepeatPasswordValidation", isRepeatPasswordValid: false });
    }
  }, [password, repeatPassword]);

  useEffect(() => {
    const isValid = login ? ValidateLogin() : ValidateSignup();
    if (isValid) {
      dispatch({ type: "setValidation", isValid: true });
    } else {
      dispatch({ type: "setValidation", isValid: false });
    }
  }, [isNameValid, isEmailValid, isPasswordValid, isRepeatEmailValid, isRepeatPasswordValid]);

  const Validate = input => {
    if (!input) {
      return false;
    } else if (!input.match(/^[a-zA-Z0-9 .,!?@)(\-\r\n]+$/)) {
      dispatch({
        type: "setValidationMsg",
        validationMsg: "Only letters, numbers and characters .,!?@)(- allowed"
      });
      return false;
    }
    dispatch({ type: "setValidationMsg", validationMsg: "" });
    return true;
  };

  /**
   * This is a modified version of the regex at: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
   * @param {*} email 
   */
  const ValidateEmail = email => {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|one|nes|tech|app|agency|blog|auto|buy|business)\b/;
    return re.test(String(email).toLowerCase());
  };

  const ValidateRepeatEmail = () => {
    if (email === repeatEmail) {
      dispatch({ type: "setValidationMsg", validationMsg: "" });
      return true;
    }
    dispatch({
      type: "setValidationMsg",
      validationMsg: "Email do not match"
    });
    return false;
  };

  const ValidateRepeatPassword = () => {
    if (password === repeatPassword) {
      dispatch({ type: "setValidationMsg", validationMsg: "" });
      return true;
    }
    dispatch({
      type: "setValidationMsg",
      validationMsg: "Password do not match"
    });
    return false;
  };

  const ValidateSignup = () => {
    return !!(isNameValid && isEmailValid && isPasswordValid && isRepeatEmailValid && isRepeatPasswordValid);
  };

  const ValidateLogin = () => {
    return !!(isEmailValid && isPasswordValid);
  };

  /**
   * TODO! The JWT needs to be stored inside an HttpOnly cookie, a special kind of cookie
   * that's only sent in HTTP requests to the server, and it's never accessible
   * (both for reading or writing) from JavaScript running in the browser.
   * @param {*} token
   */
  const saveUserData = (token, user) => {
    dispatch({ type: "setToken", token: token }); // Temporary
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_ID, user.id);
  };

  const confirm = async data => {
    const { token, user } = login ? data.login : data.signup;
    saveUserData(token, user);
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
                dispatch({
                  type: "setRepeatEmail",
                  repeatEmail: e.target.value
                });
              }}
              error={!isRepeatEmailValid}
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
        {!login && (
          <Grid item xs={12}>
            <TextField
              required
              fullWidth={true}
              value={repeatPassword}
              onChange={e => {
                dispatch({
                  type: "setRepeatPassword",
                  repeatPassword: e.target.value
                });
              }}
              error={!isRepeatPasswordValid}
              variant={"outlined"}
              label="Repeat password"
            />
          </Grid>
        )}
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
