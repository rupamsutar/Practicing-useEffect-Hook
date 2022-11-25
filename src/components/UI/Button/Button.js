import React,{ useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import classes from './Button.module.css';

const Button = (props) => {

  const ctx = useContext(AuthContext);

  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
