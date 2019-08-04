import React, { useContext } from "react";
import { Formik } from "formik";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import { StateContext } from "../context/index";
import { styles } from "../style/Style";
import { AUTH_TOKEN, USER_ID } from "../context/constants";
import {
  ACTION_CLOSELOGIN,
  ACTION_OPENLOGIN,
  ACTION_OPENSIGNIN
} from "../context/actions";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/Mutation";
import {
  ValidateEmail,
  ValidateCharacters,
  ValidateRepeatEmail,
  ValidateRepeatPassword,
  ValidatePassword
} from "../utils/validation";

export const Login = () => {
  const { state, dispatch } = useContext(StateContext);
  const { login } = state;
  // Form constants
  const name = "";
  const email = "";
  const repeatEmail = "";
  const password = "";
  const repeatPassword = "";

  /**
   * TODO! The JWT needs to be stored inside an HttpOnly cookie, a special kind of cookie
   * that's only sent in HTTP requests to the server, and it's never accessible
   * (both for reading or writing) from JavaScript running in the browser.
   * @param {*} token
   */
  const saveUserData = (token, user) => {
    dispatch({ type: "setToken", value: token }); // Temporary
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_ID, user.id);
  };

  const confirm = async data => {
    const { token, user } = login ? data.login : data.signup;
    saveUserData(token, user);
    dispatch(ACTION_CLOSELOGIN);
  };

  const executeLoginSignup = v => {
    return (
      <Mutation
        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
        variables={
          login
            ? { email: v.email, password: v.password }
            : { name: v.name, email: v.email, password: v.password }
        }
        onCompleted={data => confirm(data)}
      >
        {mutation => mutation()}
      </Mutation>
    );
  };

  const initialValues = {
    name,
    email,
    repeatEmail,
    password,
    repeatPassword
  };

  const validate = v => {
    let errors = {};

    const emailError = ValidateEmail(v.email);
    if (emailError) {
      errors.email = "Invalid email adress";
    }

    // TODO! Create a password validation
    const passwordError = ValidatePassword(v.password);
    if (passwordError) {
      errors.password = "Must contain at least 1 numeric character, 1 special character (?=.[!@#$%^&]), 1 lowercase and 1 uppercase alphabetical character. The string must be eight characters or longer.";
    }

    // Only validate these fields on signup
    if (!login) {
      const nameError = ValidateCharacters(v.name);
      if (nameError) {
        errors.name = "Only letters, numbers and characters .,!?@)(- allowed";
      }

      const repeatEmailError = ValidateRepeatEmail({
        email: v.email,
        repeatEmail: v.repeatEmail
      });
      if (repeatEmailError) {
        errors.repeatEmail = "Email do not match";
      }

      const repeatPasswordError = ValidateRepeatPassword({
        password: v.password,
        repeatPassword: v.repeatPassword
      });
      if (repeatPasswordError) {
        errors.repeatPassword = "Password do not match";
      }
    }

    return errors;
  };

  const onSubmit = v => {
    console.log(v);
    executeLoginSignup(v);
  };

  const checkError = e => {
    if (e) {
      return true;
    }
    return false;
  };

  return (
    <div style={styles.submitArticleContainer}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
          <Grid container spacing={24}>
            {!login && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth={true}
                  variant={"outlined"}
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={checkError(errors.name)}
                />
                <Typography variant="body2" color="error" gutterBottom>
                  {errors.name}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth={true}
                variant={"outlined"}
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={checkError(errors.email)}
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors.email}
              </Typography>
            </Grid>
            {!login && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth={true}
                  variant={"outlined"}
                  label="Repeat email"
                  name="repeatEmail"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatEmail}
                  error={checkError(errors.repeatEmail)}
                />
                <Typography variant="body2" color="error" gutterBottom>
                  {errors.repeatEmail}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth={true}
                variant={"outlined"}
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={checkError(errors.password)}
              />
              <Typography variant="body2" color="error" gutterBottom>
                {errors.password}
              </Typography>
            </Grid>
            {!login && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth={true}
                  variant={"outlined"}
                  label="Repeat password"
                  name="repeatPassword"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatPassword}
                  error={checkError(errors.repeatPassword)}
                />
                <Typography variant="body2" color="error" gutterBottom>
                  {errors.repeatPassword}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                {login ? "login" : "create account"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (login) {
                    dispatch(ACTION_OPENSIGNIN);
                  } else {
                    dispatch(ACTION_OPENLOGIN);
                  }
                }}
              >
                {login ? "Create an account?" : "Login to account?"}
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
};
