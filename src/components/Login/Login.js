import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {Value: action.val, IsValid: action.val.includes("@")}
  }
  if (action.type === "USER_VALIDITY") {
    return {Value: state.value, IsValid: state.value.includes("@")};
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {Value: "", IsValid: null});

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(
  //       emailState.IsValid && enteredPassword.trim().length > 6
  //     );
  //   }, 500 );
  //   return () => {
  //     clearTimeout(identifier);
  //   };
    
  // }, [emailState, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value})
    // setEnteredEmail(event.target.value);    
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "USER-VALIDITY"})
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.Value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${ emailState.IsValid === false ? classes.invalid : ""}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.Value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
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
