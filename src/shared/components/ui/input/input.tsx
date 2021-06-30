import './input.css'
import React from "react";
import {InputProps} from "../../../interfaces/input";


export const InputDiv = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {input, label} = props as InputProps;
    return (
        <div className="input">
            <label htmlFor={input.id}> {label}</label>
            <input ref={ref} {...input}/>
        </div>
    );
});

