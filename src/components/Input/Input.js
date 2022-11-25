import React from "react";
import "./Input.css";

const Input = (props) => {

    const classes = `control ${props.className}`

    return <>

        <div className = {classes}>
            <label htmlFor={props.for}>{props.for}</label>
            <input
                type={props.for}
                id={props.for}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            >
            </input>
        </div>
    
    
    </>
};

export default Input