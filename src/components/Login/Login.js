import React, { useState, useReducer, useContext } from 'react'; 

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
 if (action.type === "USER_INPUT") {
  return {emailValue: action.val , emailIsValid: action.val.includes("@"), passwordValue: state.passwordValue, passwordIsValid: state.passwordIsValid}
 }
 if (action.type === "USER_VALIDATE") {
  return {emailValue: state.emailValue , emailIsValid: state.emailValue.includes("@"), passwordValue: state.passwordValue, passwordIsValid: state.passwordIsValid}
 }
 if (action.type === "USER_PASS") {
  return {emailValue: state.emailValue , emailIsValid: state.emailIsValid, passwordValue: action.val, passwordIsValid: action.val.trim().length > 6}
 }
 if (action.type === "USER_PASS_VALIDATE") {
  return {emailValue: state.emailValue , emailIsValid: state.emailIsValid, passwordValue: state.passwordValue, passwordIsValid: state.passwordValue.trim().length > 6}
 }
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [state, dispatchState] = useReducer(emailReducer, {
    emailValue: "", 
    emailIsValid: null, 
    passwordValue: "", 
    passwordIsValid: null
  });

  

  const emailChangeHandler = (event) => {
    dispatchState({type: "USER_INPUT", val: event.target.value});
    setFormIsValid(
      state.emailIsValid && state.passwordIsValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchState({type:"USER_PASS", val: event.target.value})
    setFormIsValid(
      state.emailIsValid && state.passwordIsValid
    );
  };

  const validateEmailHandler = () => {
    dispatchState({type: "USER_VALIDATE"})
  };

  const validatePasswordHandler = () => {
    dispatchState({type: "USER_PASS_VALIDATE"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(state.emailValue, state.passwordValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
