import React, {useEffect, useRef} from "react";
import "./Input.css";

const Input = (props) => {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, [])
    const classes = `control ${props.className}`

    return <>

        <div className = {classes}>
            <label htmlFor={props.for}>{props.for}</label>
            <input
                ref={inputRef}
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