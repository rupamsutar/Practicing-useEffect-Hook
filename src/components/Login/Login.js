import React, { useState, useReducer } from 'react'; 

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatchState] = useReducer(emailReducer, {emailValue: "", emailIsValid: null, passwordValue: "", passwordIsValid: null})

  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchState({type: "USER_INPUT", val: event.target.value});
    // setEnteredEmail(event.target.value);

    setFormIsValid(
      state.emailIsValid && state.passwordIsValid
    );
  };

  const passwordChangeHandler = (event) => {

    dispatchState({type:"USER_PASS", val: event.target.value})

    // setEnteredPassword(event.target.value);

    setFormIsValid(
      state.emailIsValid && state.passwordIsValid
    );
  };

  const validateEmailHandler = () => {

    dispatchState({type: "USER_VALIDATE"})
  };

  const validatePasswordHandler = () => {

    dispatchState({type: "USER_PASS_VALIDATE"})
    // setPasswordIsValid(state.passwordIsValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.emailValue, state.passwordValue);
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
